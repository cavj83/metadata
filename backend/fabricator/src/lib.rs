#![no_std]
use gstd::{
    async_main, collections::HashMap, msg, prelude::*, prog::ProgramGenerator, ActorId, CodeId,
};
use io::*;

#[cfg(feature = "binary-vendor")]
include!(concat!(env!("OUT_DIR"), "/wasm_binary.rs"));

static mut FABRICATOR: Option<StateFabricator> = None;


#[derive(Debug, Default)]
pub struct StateFabricator {
    pub number: Id,
    pub code_id: CodeId,
    pub fabricator_admin_account: Vec<ActorId>,
    pub gas_for_program: u64,
    pub id_to_address: HashMap<Id, ActorId>,
    pub registry: HashMap<ActorId, Vec<(Id, Record)>>,
}

impl StateFabricator {
    pub async fn create_program(
        &mut self,
        init_config: InitNft,
    ) -> Result<FabricatorEvent, FabricatorError> {
        
        let create_program_future =
            ProgramGenerator::create_program_with_gas_for_reply::<InitNft>(
                self.code_id,
                InitNft {
                    collection: init_config.collection,
                    config: init_config.config.clone()
                },
                self.gas_for_program,
                0,
                0,
            )
            .map_err(|e| FabricatorError::ProgramInitializationFailedWithContext(e.to_string()))?;

        let (address, _) = create_program_future
            .await
            .map_err(|e| FabricatorError::ProgramInitializationFailedWithContext(e.to_string()))?;

        self.number = self.number.saturating_add(1);

        self.id_to_address
            .entry(self.number)
            .or_insert(address);

        let programs_for_actor = self.registry.entry(msg::source()).or_default();

        Ok(FabricatorEvent::ProgramCreated {
            id: self.number,
            address: address,
        })
    }

    pub fn update_gas_for_program(
        &mut self,
        new_gas_amount: u64,
    ) -> Result<FabricatorEvent, FabricatorError> {
        if self.fabricator_admin_account.contains(&msg::source()) {
            self.gas_for_program = new_gas_amount;
            Ok(FabricatorEvent::GasUpdatedSuccessfully {
                updated_by: msg::source(),
                new_gas_amount,
            })
        } else {
            return Err(FabricatorError::Unauthorized);
        }
    }

    pub fn update_code_id(&mut self, new_code_id: CodeId) -> Result<FabricatorEvent, FabricatorError> {
        if self.fabricator_admin_account.contains(&msg::source()) {
            self.code_id = new_code_id;
            Ok(FabricatorEvent::CodeIdUpdatedSuccessfully {
                updated_by: msg::source(),
                new_code_id,
            })
        } else {
            return Err(FabricatorError::Unauthorized);
        }
    }

    pub fn add_admin_to_fabricator(
        &mut self,
        admin_actor_id: ActorId,
    ) -> Result<FabricatorEvent, FabricatorError> {
        if self.fabricator_admin_account.contains(&msg::source()) {
            self.fabricator_admin_account.push(admin_actor_id);

            Ok(FabricatorEvent::AdminAdded {
                updated_by: msg::source(),
                admin_actor_id,
            })
        } else {
            return Err(FabricatorError::Unauthorized);
        }
    }

    pub fn remove_registry(&mut self, program_for_id: Id) -> Result<FabricatorEvent, FabricatorError> {
        let source = msg::source();
        if self.fabricator_admin_account.contains(&source) {
            if self.id_to_address.remove(&program_for_id).is_none() {
                return Err(FabricatorError::IdNotFoundInAddress);
            }

            let mut is_removed = false;

            for (_actor_id, info) in self.registry.iter_mut() {
                if let Some(pos) = info.iter().position(|(id, _)| *id == program_for_id) {
                    info.remove(pos);
                    is_removed = true;
                    break;
                }
            }

            if !is_removed {
                return Err(FabricatorError::IdNotFound);
            }

            Ok(FabricatorEvent::RegistryRemoved  {
                removed_by: source,
                program_for_id,
            })
        } else {
            return Err(FabricatorError::Unauthorized);
        }
    }
}

/*CodeId needs to be modified so it receives an NFT CodeId instead of FT
See: https://wiki.gear-tech.io/docs/examples/Standards/gnft-721/

*/
#[no_mangle]
extern "C" fn init() {
    let init_config_fabricator: InitConfigFabricator =
        msg::load().expect("Unable to decode CodeId of the program");

    let fabricator = StateFabricator {
        number: 0,
        code_id: init_config_fabricator.code_id,
        fabricator_admin_account: init_config_fabricator.fabricator_admin_account,
        gas_for_program: init_config_fabricator.gas_for_program,
        ..Default::default()
    };
    unsafe { FABRICATOR = Some(fabricator) };
}

#[async_main]
async fn main() {
    let action: FabricatorAction = msg::load().expect("Could not load Action");

    let fabricator_state = unsafe {
        FABRICATOR
            .as_mut()
            .expect("Unexpected error in Fabricator_state")
    };

    let result = match action {
        FabricatorAction::CreateProgram { init_config } => {
            fabricator_state.create_program(init_config).await
        }
        FabricatorAction::AddAdmin { admin_actor_id } => {
            fabricator_state.add_admin_to_fabricator(admin_actor_id)
        }
        FabricatorAction::UpdateGasProgram(new_gas_amount) => {
            fabricator_state.update_gas_for_program(new_gas_amount)
        }
        FabricatorAction::CodeIdUpdate { new_code_id } => {
            fabricator_state.update_code_id(new_code_id)
        }
        FabricatorAction::RemoveRegistry  { id } => fabricator_state.remove_registry(id),
    };

    msg::reply(result, 0)
        .expect("Failed to encode or reply with `Result<FabricatorEvent, FabricatorError>`");
}

#[no_mangle]
extern "C" fn state() {
    let fabricator_state = unsafe {
        FABRICATOR
            .take()
            .expect("Unexpected error in taking state")
    };
}
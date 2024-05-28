#![no_std]

use gmeta::{In, InOut, Metadata};
use gstd::{prelude::*, ActorId, CodeId};

pub type Id = u64;

#[derive(Encode, Decode, TypeInfo, Debug)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum FabricatorAction {
    CreateProgram { init_config: InitNft },
    CodeIdUpdate { new_code_id: CodeId },
    UpdateGasProgram(u64),
    AddAdmin { admin_actor_id: ActorId },
    RemoveRegistry { id: Id },
}

#[derive(Default, Debug, Encode, Decode, TypeInfo)]
pub struct Collection {
    pub name: String,
    pub description: String,
}

#[derive(Encode, Decode, TypeInfo, Clone, Debug)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct Record {
    pub field: String,
   
}

#[derive(Encode, Decode, TypeInfo, Debug)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum FabricatorEvent {
    ProgramCreated {
        id: Id,
        address: ActorId,
    },
    GasUpdatedSuccessfully {
        updated_by: ActorId,
        new_gas_amount: u64,
    },
    CodeIdUpdatedSuccessfully {
        updated_by: ActorId,
        new_code_id: CodeId,
    },
    AdminAdded {
        updated_by: ActorId,
        admin_actor_id: ActorId,
    },
    RegistryRemoved {
        removed_by: ActorId,
        program_for_id: Id,
    },
}

#[derive(Debug, Clone, Encode, Decode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub enum FabricatorError {
    ProgramInitializationFailed,
    ProgramInitializationFailedWithContext(String),
    Unauthorized,
    UnexpectedFTEvent,
    MessageSendError,
    NotFound,
    IdNotFoundInAddress,
    IdNotFound
}


#[derive(Debug, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitNft {
    pub collection: Collection,
    pub config: Config,
}

#[derive(Default, Debug, Encode, Decode, TypeInfo, Clone)]
pub struct Config {
    pub max_mint_count: Option<u128>,
}

#[derive(Debug, Decode, Encode, TypeInfo)]
#[codec(crate = gstd::codec)]
#[scale_info(crate = gstd::scale_info)]
pub struct InitConfigFabricator {
    pub code_id: CodeId,
    pub fabricator_admin_account: Vec<ActorId>,
    pub gas_for_program: u64,
}

pub struct ProgramMetadata;

impl Metadata for ProgramMetadata {
    type Init = In<InitConfigFabricator>;
    type Handle = InOut<FabricatorAction, Result<FabricatorEvent, FabricatorError>>;
    type Others = ();
    type Reply = ();
    type Signal = ();
    type State = ();
}
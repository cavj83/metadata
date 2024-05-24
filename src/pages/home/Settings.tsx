import { Card, Center, HStack,Heading, VStack } from "@chakra-ui/react";
import { Avatar } from '@chakra-ui/react'
import {
    ChakraProvider,
    CSSReset,
    Box,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure,
    //Heading,
  } from '@chakra-ui/react';
function Settings() {
    const {
        isOpen, onOpen,
        onClose
    } = useDisclosure();
  return (
    <Card>
        <Center>
        <HStack>
            <VStack>
                <Heading>Conferences</Heading>
            </VStack>
            <Heading>Settings</Heading>
            <ChakraProvider>
            <CSSReset />
            <Box p={5}>
                <Button onClick={onOpen}>
                    User Avatar
                </Button>
                <Modal isOpen={isOpen}
                    onClose={onClose} size="lg">
                    <ModalOverlay />
                    <ModalContent borderRadius="md">
                        <ModalHeader>
                            <Heading as="h1" color="green.500">
                                Select Avatar
                            </Heading>
                            <Heading as="h3" fontSize="xl" mt={2} color="gray.500">
                            </Heading>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {['01', '02', '03','04','05','06','07','08'].map((opc) => (
                                <Avatar name={opc} key={opc} src={"./src/img/Avatares/"+opc+".png"} />
                            ))}
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue"
                                mr={3} onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
          </ChakraProvider>
                        

            {['01', '02', '03','04','05','06','07','08'].map((opc) => (
                <Avatar name={opc} key={opc} src={"./src/img/Avatares/"+opc+".png"} />
            ))}

        </HStack>
        </Center>
    </Card>
    
  );
}

export { Settings };
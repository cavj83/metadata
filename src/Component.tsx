import React, { useState } from 'react';
import { useAccount, useApi } from "@gear-js/react-hooks";
import { ApiLoader } from "@/components";
import { Header } from "@/components/layout";
import { useWalletSync } from "@/features/wallet/hooks";
import { Home } from "./pages/home";
import { Info } from "./pages/home/info";
import { Conferences } from "./pages/home/Conferences";
import { Settings } from "./pages/home/Settings";
import { Inbox } from "./pages/home/Inbox";
import { Notifications } from "./pages/home/Notifications";

import {
  Card, CardHeader, CardBody, CardFooter, Stack, Heading, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Box, Flex, Button,Icon
} from '@chakra-ui/react';

import {
  ChakraProvider,
  CSSReset,
  //Box,
  //Button,
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

import { Comments } from './pages/home/Comments';
//import { info } from 'console';

export function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  const [showComponent, setShowComponent] = useState(false);
  const [index, setIndex] = useState("Info");
  const handleClick = ({opc = "Dashboard"}) => {
    setIndex(opc);
    console.log(opc);
    setShowComponent(true);
  }
  function MyComponent() {
    switch (index) {
      case "Dashboard": return <Info />;
      case "Conferences": return <Conferences />;break;
      case "Settings": return <Settings />;break;
      case "Certifications": return isAppReady ? <Home /> : <ApiLoader />;
      case "Inbox": return <Inbox />; break;
      case "Notifications": return <Notifications/>; break;
      case "Comments": return <Comments />; break;
      default:
        return <Info />;
    }
  }
  const {
    isOpen, onOpen,
    onClose
} = useDisclosure();
  return (
    <>

          <ChakraProvider>
            <CSSReset />
            <Box p={5}>
                <Button onClick={onOpen}>
                    Open GeeksforGeeks
                    Courses Modal
                </Button>
                <Modal isOpen={isOpen}
                    onClose={onClose} size="lg">
                    <ModalOverlay />
                    <ModalContent borderRadius="md">
                        <ModalHeader>
                            <Heading as="h1" color="green.500">
                                GeeksforGeeks
                            </Heading>
                            <Heading as="h3" fontSize="xl"
                                mt={2} color="gray.500">
                                Chakra UI Overlay Modal
                            </Heading>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <p>
                                Explore a variety of courses
                                on GeeksforGeeks to enhance your
                                skills in JavaScript, React, and
                                many more technologies.
                            </p>
                            <ul>
                                <li>JavaScript Fundamentals</li>
                                <li>React Essentials</li>
                                <li>Data Structures and Algorithms</li>
                            </ul>
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
      <Card key="Home" size="sm" bg="#8C2CFF">
        <CardHeader bg="#111120">
          <Header isAccountVisible={isAccountReady} />
        </CardHeader>
        <CardBody bg='#8C2CFF'>
          <Flex>
            <Box p='4' bg='#8C2CFF'>
              <Accordion defaultIndex={[0]} allowMultiple rounded='lg'>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        <Heading size="lg">Main</Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Stack spacing='2'>
                      {['Dashboard', 'Conferences', 'Certifications', 'Settings'].map((opc) => (
                        <Button backgroundColor="#8C2CFF" onClick={() => handleClick({opc})}><Heading size="md">{opc}</Heading></Button>
                      ))}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as='span' flex='1' textAlign='left'>
                        <Heading size="lg">Networks</Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    <Stack spacing='2'>
                      {['Inbox', 'Notifications', 'Comments'].map((opc) => (
                        <Button backgroundColor="#8C2CFF" onClick={() => handleClick({opc})}><Heading size="md">{opc}</Heading></Button>
                      ))}
                    </Stack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
            <Box flex='1' >
              <MyComponent />
            </Box>
          </Flex>
        </CardBody>
        <CardFooter bg='blue.300'>
          <Heading size="lg">Stay Conneted</Heading>
        </CardFooter>
      </Card>
    </>
  );
}

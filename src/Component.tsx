import React, { useState } from 'react';
import { useAccount, useApi } from "@gear-js/react-hooks";
import { ApiLoader } from "@/components";
import { Header } from "@/components/layout";
import { useWalletSync } from "@/features/wallet/hooks";
import { Home } from "./pages/home";
import { Info } from "./pages/home/info";
import {
  Card, CardHeader, CardBody, CardFooter, Stack, Heading, Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Box, Flex, Button
} from '@chakra-ui/react';
import { info } from 'console';

export function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  const [showComponent, setShowComponent] = useState(false);
  const [index, setIndex] = useState("Info");
  const handleClick = ({opc = "Dashboard"}) => {
    setIndex(opc);
    setShowComponent(true);
  }
  function MyComponent() {
    switch (index) {
      case "Dashboard": return <Info />;
      case "Certificatios": return isAppReady ? <Home /> : <ApiLoader />;
      default:
        return <Info />;
    }
  }
  return (
    <>
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
                      {['Dashboard', 'Conferencias', 'Certificatios', 'Settings'].map((opc) => (
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
          {<img id="imglogo" alt="bg" className="img-fluid img-thumbnail" src="./src\img\Slogan\Eslogan2.png" />}
        </CardFooter>
      </Card>
    </>
  );
}

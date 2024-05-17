import "@gear-js/vara-ui/dist/style.css";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { ApiLoader } from "@/components";
import { Header } from "@/components/layout";
import { withProviders } from "@/app/hocs";
import { useWalletSync } from "@/features/wallet/hooks";
import { Home } from "./pages/home";
import { NavBar } from "./pages/home/navbar";
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text,Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon, Box, Grid, GridItem,Flex,Spacer,Button } from '@chakra-ui/react'
  

function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  return (
    <>
    <Card key="Home" size="sm" bg="#8C2CFF">
        <CardHeader bg="#111120">
          <Header isAccountVisible={isAccountReady}/>
        </CardHeader>
        <CardBody bg='#8C2CFF'>
          <Flex>
            <Box p='4' bg='#8C2CFF'>
              <Accordion defaultIndex={[0]} allowMultiple>
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
                        {['Dashboard', 'Conferencias', 'Certificatios','Settings'].map((opc) => (
                            <Button backgroundColor="#8C2CFF" ><Heading size="md">{opc}</Heading></Button>
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
                            <Button backgroundColor="#8C2CFF" ><Heading size="md">{opc}</Heading></Button>
                        ))}
                      </Stack>
                    </AccordionPanel>
                  </AccordionItem>
              </Accordion>
            </Box>
            <Box flex='1' bg='green.400'>
              {isAppReady ? <Home /> : <ApiLoader />}
            </Box>
          </Flex>
        </CardBody>
        <CardFooter bg='blue.300'>
          <Heading size="lg">Stay Conneted</Heading>
          {<img id="imglogo"  className="img-fluid img-thumbnail" src="./src\img\Slogan\Eslogan2.png"/>}
        </CardFooter>
    </Card>
    </>
  );
}

export const App = withProviders(Component);

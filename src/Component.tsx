import React, { useState } from 'react';
import { useAccount, useApi } from '@gear-js/react-hooks';
import { ApiLoader } from '@/components';
import { useWalletSync } from '@/features/wallet/hooks';
import { Home } from './pages/home';
import { Welcome } from './pages/home/welcome';
import { Conferences } from './pages/home/Conferences';
import { Settings } from './pages/home/Settings';
import { Inbox } from './pages/home/Inbox';
import { Notifications } from './pages/home/Notifications';
import { Comments } from './pages/home/Comments';

import {
  Card,
  CardBody,
  Stack,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Button,
  Text,
} from '@chakra-ui/react';

export function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();
  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  const [showComponent, setShowComponent] = useState(false);
  const [index, setIndex] = useState('Info');

  const handleClick = ({ opc = 'Dashboard' }) => {
    setIndex(opc);
    console.log(opc);
    setShowComponent(true);
  };

  function MyComponent() {
    switch (index) {
      case 'Dashboard':
        return <Welcome />;
      case 'Conferences':
        return <Conferences />;
      case 'Settings':
        return <Settings />;
      case 'Certifications':
        return isAppReady? <Home /> : <ApiLoader />;
      case 'Inbox':
        return <Inbox />;
      case 'Notifications':
        return <Notifications />;
      case 'Comments':
        return <Comments />;
      default:
        return <Welcome />;
    }
  }

  return (
    <Card key="Home" size="sm" bg="#8C2CFF">
      <CardBody bg="#8C2CFF">
        <Flex>
          <Box p="4" bg="#8C2CFF">
            <Accordion defaultIndex={[0]} allowMultiple rounded="lg">
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Heading size="lg">Main</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Stack spacing="2">
                    {['Dashboard', 'Conferences', 'Certifications', 'Settings'].map((opc) => (
                      <Button
                        backgroundColor="#8C2CFF"
                        key={opc}
                        onClick={() => handleClick({ opc })}
                      >
                        <Heading size="md">{opc}</Heading>
                      </Button>
                    ))}
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
              <AccordionItem>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Heading size="lg">Networks</Heading>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <Stack spacing="2">
                    {['Inbox', 'Notifications', 'Comments'].map((opc) => (
                      <Button
                        backgroundColor="#8C2CFF"
                        key={opc}
                        onClick={() => handleClick({ opc })}
                      >
                        <Heading size="md">{opc}</Heading>
                      </Button>
                    ))}
                  </Stack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
          <Box flex="1">
            <MyComponent />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
}
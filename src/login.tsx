import React, { useState } from 'react';
import { useAccount, useApi } from "@gear-js/react-hooks";
import { useWalletSync } from "@/features/wallet/hooks";
import { Header } from "@/components/layout";

import { Component } from "./Component";
import { Info } from "./pages/home/info";

import {
    Card, CardHeader, CardBody, CardFooter, Stack, Heading, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon, Box, Flex, Button,Icon
  } from '@chakra-ui/react';
  

export function Login(){
    const { isAccountReady } = useAccount();
    const { account, accounts } = useAccount();
    
    useWalletSync();

    return (
        <>   
          <Card key="Home" size="sm" bg="#8C2CFF">
            <CardHeader bg="#111120">
              <Header isAccountVisible={isAccountReady} />
            </CardHeader>
            <CardBody bg='#8C2CFF'>
                {
                    account? <Component /> : <Info />
                }
            </CardBody>
        <CardFooter bg='blue.300'>
          <Heading size="lg">Stay Conneted</Heading>
        </CardFooter>
      </Card>
    </>
  );
    //return isAppReady ? <Home /> : <ApiLoader />;
}
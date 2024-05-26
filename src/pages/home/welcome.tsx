import React, { useState } from 'react';
import { useAccount, useApi } from "@gear-js/react-hooks";
import { useWalletSync } from "@/features/wallet/hooks";
import { Header } from "@/components/layout";

import {
    Card, CardHeader, CardBody, CardFooter, Stack, Heading, Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon, Box, Flex, Button,Icon, Text
  } from '@chakra-ui/react';
  

export function Welcome(){
    const { isAccountReady } = useAccount();
    const { account, accounts } = useAccount();
    
    useWalletSync();
    return (
        <>   
        
        <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box
        maxWidth="md"
        px={4}
        py={8}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h1" size="xl" color="gray.800">
        <Heading size="lg">Welcome {account!.meta.name}</Heading>
        </Heading>
        <Text fontSize="lg" color="gray.600">
        {account!.meta.source}
        </Text>
      </Box>
    </Box>
        </>
  );
}
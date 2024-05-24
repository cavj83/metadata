import { Card, Center, HStack,Heading, VStack } from "@chakra-ui/react";

function Settings() {
  return (
    <Card>
        <Center>
        <HStack>
            <VStack>
                <Heading>Conferences</Heading>
            </VStack>
            <Heading>Settings</Heading>
        </HStack>
        </Center>
    </Card>
    
  );
}

export { Settings };
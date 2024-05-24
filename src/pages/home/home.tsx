import { Center, HStack, VStack } from "@chakra-ui/react";
import { ReadState } from "./ReadState";


function Home() {
  return (
    <Center>
      <HStack>
        <ReadState />
      </HStack>
    </Center>
  );
}

export { Home };


import React from "react";
import { Card, Center, Heading, VStack } from "@chakra-ui/react";
//import { AllNFTCollection } from "./MyNFT";
function Info() {
  return (
    <Card>
      <Center>
        <VStack>
            <Heading>Facilitates the creation, monetisation, and tokenisation of educational and auditory content from a single platform.</Heading>
            {<img id="imglogo" alt="bg" className="img-fluid img-thumbnail" src="./src\img\Slogan\Eslogan2.png" />}
        </VStack>
      </Center>
    </Card>
  );
}

export { Info };
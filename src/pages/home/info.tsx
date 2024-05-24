
import React from "react";
import { Card, CardHeader, CardBody, CardFooter, Center, Heading, VStack } from "@chakra-ui/react";
import { Car } from "lucide-react";
//import { AllNFTCollection } from "./MyNFT";
function Info() {
  return (
    <Card>
      <Center>
        <Card>
          <CardHeader>
            <Heading>Facilitates the creation, monetisation, and tokenisation of educational and auditory content from a single platform.</Heading>
          </CardHeader>
          <CardBody>
            {<img id="imglogo" alt="bg" className="img-fluid img-thumbnail" src="./src\img\Slogan\Eslogan2.png" />}
          </CardBody>
          <CardFooter>
            <Card bg="#9d00ff">
              <CardHeader>
                {<img id="imglogo" alt="bg" className="img-fluid img-thumbnail" src="./src\img\Caracteristicas\Icon02.png" />}
              </CardHeader>
              <CardBody>
                <Heading>Creation of personalized learning environments</Heading>
                <text>
                  If allows users to create unique spaces to educate their communities in a personalized way.
                </text>
              </CardBody>
            </Card>
            <Card bg='#ea49ee'>
              <CardHeader>
                {<img id="imglogo" alt="bg" className="img-fluid img-thumbnail" src="./src\img\Caracteristicas\Icon01.png" />}
              </CardHeader>
              <CardBody>
                <Heading>Integrated Tokenization</Heading>
                <text>
                  Id offers integrated functionality to tokenize both educational content (workshops or marterclasses) and audio content (podcasts and debates). providing monetisation opportunities.
                </text>
              </CardBody>
            </Card>
            <Card bg='#FF0058'>
              <CardHeader>
                {<img id="imglogo" alt="bg" className="img-fluid img-thumbnail" src="./src\img\Caracteristicas\Icon03.png" />}
              </CardHeader>
              <CardBody>
                <Heading>Descentralized Monetization System</Heading>
                <text>
                  Facilitate the monetisation of content, allowing users to obtain a greater economic return on their educational content and creation efforts.
                </text>
              </CardBody>
            </Card>
          </CardFooter>
        </Card>
        <VStack>
            
        </VStack>
      </Center>
    </Card>
  );
}

export { Info };
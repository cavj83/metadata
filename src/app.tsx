import "@gear-js/vara-ui/dist/style.css";
import { useAccount, useApi } from "@gear-js/react-hooks";
import { ApiLoader } from "@/components";
import { Header } from "@/components/layout";
import { withProviders } from "@/app/hocs";
import { useWalletSync } from "@/features/wallet/hooks";
import { Home } from "./pages/home";
import { NavBar } from "./pages/home/navbar";
import { Card, CardHeader, CardBody, CardFooter, Stack, Heading, Text } from '@chakra-ui/react'
function Component() {
  const { isApiReady } = useApi();
  const { isAccountReady } = useAccount();

  useWalletSync();

  const isAppReady = isApiReady && isAccountReady;

  return (
    <>
      <Card key="Home" size="sm">
        <CardHeader>
          <Header isAccountVisible={isAccountReady}/>
        </CardHeader>
        <CardBody>
            {isAppReady ? <Home /> : <ApiLoader />}
        </CardBody>
        <CardFooter>
          <Heading size="lg">Stay Conneted</Heading>
          {<img id="imglogo"  className="img-fluid img-thumbnail" src="./src\img\Slogan\Eslogan2.png"/>}
        </CardFooter>
      </Card>
    </>
  );
}

export const App = withProviders(Component);

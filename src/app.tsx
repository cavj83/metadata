import "@gear-js/vara-ui/dist/style.css";
import { withProviders } from "@/app/hocs";
import { Text,Grid, GridItem,Spacer } from '@chakra-ui/react'
import { Component } from "./Component";
  

export const App = withProviders(Component);

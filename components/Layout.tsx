import React from "react";
import {
  Body,
  Button,
  Container,
  Header,
  Icon,
  Left,
  Title
} from "native-base";
import { SettingDrawer } from "./SettingDrawer";
import {useGlobalDrawer} from "../hooks/useGlobalDrawer";

export const Layout = ({ children }) => {
  const { open } = useGlobalDrawer();
  return (
    <Container>
      <SettingDrawer>
        <Header>
          <Left>
            <Button transparent onPress={open}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>airtoxinbotbotnotbot</Title>
          </Body>
        </Header>
        {children}
      </SettingDrawer>
    </Container>
  );
};

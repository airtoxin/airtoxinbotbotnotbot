import React from "react";
import { Body, Container, Header, Title } from "native-base";
import { SettingDrawer } from "./SettingDrawer";

export const Layout = ({ children }) => {
  return (
    <Container>
      <SettingDrawer>
        <Header>
          <Body>
            <Title>airtoxinbotbotnotbot</Title>
          </Body>
        </Header>
        {children}
      </SettingDrawer>
    </Container>
  );
};

import React, { useEffect, useRef } from "react";
import {
  Container,
  Content,
  Header,
  Left,
  ListItem,
  Right,
  Body,
  Switch,
  Text,
  Button,
  Icon,
  Drawer
} from "native-base";
import { useGlobalDrawer } from "../hooks/useGlobalDrawer";

export const SettingDrawer = ({ children }) => {
  const { setDrawer, close } = useGlobalDrawer();

  return (
    <Drawer ref={setDrawer} content={<DrawerContent />} onClose={close}>
      {children}
    </Drawer>
  );
};

const DrawerContent = () => {
  return (
    <Container>
      <Header />
      <Content>
        <ListItem icon button>
          <Body>
            <Button transparent>
              <Text>モデルを再取得</Text>
            </Button>
          </Body>
        </ListItem>
      </Content>
    </Container>
  );
};

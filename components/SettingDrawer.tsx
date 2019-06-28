import React from "react";
import {
  Body,
  Button,
  Container,
  Content,
  Drawer,
  Header,
  ListItem,
  Text
} from "native-base";
import { useGlobalDrawer } from "../hooks/useGlobalDrawer";

export const SettingDrawer: React.FunctionComponent = ({ children }) => {
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

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
import { useMarkovModel } from "../hooks/useMarkovModel";

export const SettingDrawer: React.FunctionComponent = ({ children }) => {
  const { setDrawer, close } = useGlobalDrawer();

  return (
    <Drawer ref={setDrawer} content={<DrawerContent />} onClose={close}>
      {children}
    </Drawer>
  );
};

const DrawerContent = () => {
  const { fetchAndCacheModelData } = useMarkovModel();

  return (
    <Container>
      <Header />
      <Content>
        <ListItem icon button>
          <Body>
            <Button full transparent danger onPress={fetchAndCacheModelData}>
              <Text>モデルを再取得</Text>
            </Button>
          </Body>
        </ListItem>
      </Content>
    </Container>
  );
};

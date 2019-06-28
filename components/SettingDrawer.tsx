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

export const SettingDrawer = ({ children }) => {
  const drawer = useRef(null);
  useEffect(() => {
    setInterval(() => {
      drawer.current._root.open();
    }, 2 * 1000);
  }, []);
  return (
    <Drawer
      ref={drawer}
      content={<DrawerContent />}
      onClose={() => drawer.current._root.close()}
    >
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
          <Left>
            <Button>
              <Icon name="cloud-download" />
            </Button>
          </Left>
          <Body>
            <Text>モデルを再取得</Text>
          </Body>
        </ListItem>
      </Content>
    </Container>
  );
};

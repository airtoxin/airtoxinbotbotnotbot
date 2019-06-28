import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Alert,
  Clipboard,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  Body,
  Container,
  Content,
  Drawer,
  Header,
  List,
  ListItem,
  Spinner,
  Title
} from "native-base";
import { useMarkovModel } from "./useMarkovModel";
import markov from "hx-markov-chain";
import { SettingDrawer } from "./SettingDrawer";

export default () => {
  const postTweet = useCallback((tweet: string) => {
    Linking.openURL(`twitter://post?message=${tweet}`).catch(console.log);
  }, []);
  const [messages, setMessages] = useState<string[]>([]);

  const { isReady, model } = useMarkovModel();
  const [refreshing, setRefreshing] = useState(false);

  const generateMessages = useCallback(
    (model: any) => {
      setRefreshing(true);
      setTimeout(() => {
        if (isReady && model) {
          const gen = Array.from(Array(10)).map(() =>
            markov.run(model).join("")
          );
          setMessages(gen);
          setRefreshing(false);
        }
      }, 10);
    },
    [setMessages, isReady]
  );

  useEffect(() => {
    generateMessages(model);
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Spinner />
      </View>
    );
  } else {
    return (
      <Container>
        <SettingDrawer>
          <Header>
            <Body>
              <Title>airtoxinbotbotnotbot</Title>
            </Body>
          </Header>
          <Content
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={() => generateMessages(model)}
              />
            }
          >
            <List>
              {messages.map(message => (
                <ListItem
                  key={message}
                  onPress={() => postTweet(message)}
                  onLongPress={() =>
                    Alert.alert("内容をコピーしました", "", [
                      {
                        text: "OK",
                        onPress: () => Clipboard.setString(message)
                      }
                    ])
                  }
                >
                  <Text style={styles.item}>{message}</Text>
                </ListItem>
              ))}
            </List>
          </Content>
        </SettingDrawer>
      </Container>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    fontSize: 16
  }
});

import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Clipboard,
  Linking,
  StyleSheet,
  Text,
  View
} from "react-native";
import {
  Body,
  Container,
  Content,
  Fab,
  Header,
  Icon,
  List,
  ListItem,
  Title
} from "native-base";
import { useMarkovModel } from "./useMarkovModel";
import markov from "hx-markov-chain";

export default () => {
  const postTweet = useCallback((tweet: string) => {
    Linking.openURL(`twitter://post?message=${tweet}`).catch(console.log);
  }, []);
  const [messages, setMessages] = useState<string[]>([]);

  const { isReady, model } = useMarkovModel();

  const generateMessages = useCallback(
    (model: any) => {
      if (isReady && model) {
        const gen = Array.from(Array(10)).map(() => markov.run(model).join(""));
        setMessages(gen);
      }
    },
    [setMessages, isReady]
  );

  useEffect(() => {
    generateMessages(model);
  }, [isReady]);

  if (!isReady) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <Container>
        <Header>
          <Body>
            <Title>airtoxinbotbotnotbot</Title>
          </Body>
        </Header>
        <Content>
          <List>
            {messages.map(message => (
              <ListItem
                key={message}
                onPress={() => postTweet(message)}
                onLongPress={() =>
                  Alert.alert("内容をコピーしました", "", [
                    { text: "OK", onPress: () => Clipboard.setString(message) }
                  ])
                }
              >
                <Text style={styles.item}>{message}</Text>
              </ListItem>
            ))}
          </List>
        </Content>
        <Fab position="bottomRight" onPress={() => generateMessages(model)}>
          <Icon name="refresh" />
        </Fab>
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

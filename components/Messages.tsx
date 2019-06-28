import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Clipboard,
  Linking,
  RefreshControl,
  StyleSheet,
  Text
} from "react-native";
import { Content, List, ListItem } from "native-base";
import { useMarkovModel } from "../hooks/useMarkovModel";
import markov from "hx-markov-chain";

const postTweet = (tweet: string) => {
  Linking.openURL(`twitter://post?message=${tweet}`).catch(console.log);
};

export const Messages = () => {
  const { model } = useMarkovModel();
  const [messages, setMessages] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const generateMessages = useCallback(
    (m: any) => {
      setRefreshing(true);
      setTimeout(() => {
        if (m) {
          const gen = Array.from(Array(10)).map(() => markov.run(m).join(""));
          setMessages(gen);
          setRefreshing(false);
        } else {
          setRefreshing(false);
        }
      }, 10);
    },
    [setMessages]
  );

  useEffect(() => {
    generateMessages(model);
  }, []);

  return (
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
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 16
  }
});

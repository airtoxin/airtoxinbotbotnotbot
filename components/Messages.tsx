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

const postTweet = (tweet: string) => {
  Linking.openURL(`twitter://post?message=${tweet}`).catch(console.log);
};

export const Messages: React.FunctionComponent = () => {
  const { generate } = useMarkovModel();
  const [messages, setMessages] = useState<string[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const generateMessages = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setMessages(generate(10));
      setRefreshing(false);
    }, 10);
  }, [setMessages]);

  useEffect(() => {
    setMessages(generate(10));
  }, []);

  return (
    <Content
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={generateMessages} />
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

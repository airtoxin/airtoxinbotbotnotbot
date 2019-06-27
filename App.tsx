import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity
} from "react-native";
import { Fab, Icon } from "native-base";
import distribution from "./data/distribution.json";
import { sentences } from "markovian-nlp";

export default () => {
  const postTweet = useCallback((tweet: string) => {
    Linking.openURL(`twitter://post?message=${tweet}`).catch(console.log);
  }, []);
  const [messages, setMessages] = useState<string[]>([]);
  const generateMessages = useCallback(() => {
    const gen = sentences({
      distribution,
      count: 10
    }).map(doc => doc.replace(/ /g, ""));
    setMessages(gen);
  }, [setMessages]);

  useEffect(generateMessages, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={message => (
          <TouchableOpacity onPress={() => postTweet(message.item)}>
            <Text style={styles.item}>{message.item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item}
      />
      <Fab
        position="bottomRight"
        onPress={generateMessages}
      >
        <Icon name="refresh"/>
      </Fab>
    </View>
  );
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
    fontSize: 24,
    margin: 8
  }
});

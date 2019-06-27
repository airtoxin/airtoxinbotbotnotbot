import React from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
  Linking
} from "react-native";
import tweets from "./data/tweet_texts.json";

export default () => {
  const postTweet = (tweet: string) => {
    Linking.openURL(`twitter://post?message=${tweet}`).catch(console.log);
  };

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <FlatList
        data={tweets as string[]}
        renderItem={tweet => (
          <Button onPress={() => postTweet(tweet.item)} title={tweet.item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

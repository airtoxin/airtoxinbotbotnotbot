import type { FunctionComponent } from "react";
import { useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
} from "react-native";
import { ListItem } from "react-native-elements";
import { useRecoilState } from "recoil";

import { useMarkovModel } from "../../hooks/useMarkovModel";
import {
  MessagesState,
  useRefreshControl,
  useShareActionCallbacks,
} from "./hooks";

export const HomeScreen: FunctionComponent = () => {
  const { isLoading, prepareModelData, generate } = useMarkovModel();
  const [messages, setMessages] = useRecoilState(MessagesState);

  const refreshControl = useRefreshControl();
  const { handleCallbackShareToTwitter, handleCallbackCopyToClipboard } =
    useShareActionCallbacks();

  useEffect(() => {
    void prepareModelData().then(() => setMessages(generate(10)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.loader} />
      ) : (
        <ScrollView refreshControl={refreshControl}>
          {messages.map((message) => (
            <ListItem
              key={message}
              bottomDivider
              hasTVPreferredFocus={false}
              tvParallaxProperties={false}
              onPress={handleCallbackShareToTwitter(message)}
              onLongPress={handleCallbackCopyToClipboard(message)}
            >
              <ListItem.Content>
                <ListItem.Title>{message}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginTop: 20,
  },
});

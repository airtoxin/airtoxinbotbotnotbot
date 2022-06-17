import { setStringAsync } from "expo-clipboard";
import { useCallback, useState } from "react";
import { Alert, Linking, RefreshControl } from "react-native";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import { useMarkovModel } from "../../hooks/useMarkovModel";

export const MessagesState = atom<string[]>({
  key: "MessagesState",
  default: [],
});

export const useRefreshControl = () => {
  const { generate } = useMarkovModel();
  const [refreshing, setRefreshing] = useState(false);
  const setMessages = useSetRecoilState(MessagesState);
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setMessages(generate(10));
      setRefreshing(false);
    }, 0);
  }, [generate, setMessages]);

  return <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />;
};

export const useShareActionCallbacks = () => {
  const handleCallbackShareToTwitter = useCallback(
    (tweet: string) => () => {
      void Linking.openURL(`twitter://post?message=${tweet}`);
    },
    []
  );
  const handleCallbackCopyToClipboard = useCallback(
    (message: string) => () => {
      Alert.alert("内容をコピーしました", "", [
        {
          text: "OK",
          onPress: () => setStringAsync(message),
        },
      ]);
    },
    []
  );

  return {
    handleCallbackShareToTwitter,
    handleCallbackCopyToClipboard,
  };
};

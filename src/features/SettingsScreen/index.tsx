import type { FunctionComponent } from "react";
import { useCallback, useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { useRecoilState } from "recoil";

import {
  ModelDownloadUrlState,
  useMarkovModel,
} from "../../hooks/useMarkovModel";

export const SettingsScreen: FunctionComponent = () => {
  const [downloadUrl, setDownloadUrl] = useRecoilState(ModelDownloadUrlState);
  const [text, setText] = useState(downloadUrl);
  const { prepareModelData } = useMarkovModel();
  const handlePressSave = useCallback(() => {
    setDownloadUrl(text);
    prepareModelData(true);
  }, [prepareModelData, setDownloadUrl, text]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Model Download URL</Text>
      <TextInput style={styles.input} onChangeText={setText} value={text} />
      <Button title="モデルの再取得" onPress={handlePressSave} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 12,
  },
  input: {
    borderWidth: 1,
    height: 40,
    marginBottom: 6,
    padding: 10,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
  },
});

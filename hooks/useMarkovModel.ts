import { useCallback, useRef } from "react";
import * as FileSystem from "expo-file-system";
import { useGlobalState } from "./useGlobalState";
import markov from "hx-markov-chain";
import { MODEL_FILE_NAME, MODEL_FILE_URL } from "react-native-dotenv";

export const useMarkovModel = () => {
  const [model, setModel] = useGlobalState("model");

  const fetchAndCacheModelData = useCallback(async () => {
    const filePath = (await FileSystem.downloadAsync(
      MODEL_FILE_URL,
      FileSystem.documentDirectory + MODEL_FILE_NAME
    )).uri;
    try {
      setModel(null);

      const modelString = await FileSystem.readAsStringAsync(filePath);
      await FileSystem.writeAsStringAsync(
        FileSystem.cacheDirectory + MODEL_FILE_NAME,
        modelString
      );
      setModel(JSON.parse(modelString));
    } catch (e) {
      console.error(e);
      void FileSystem.deleteAsync(filePath);
    }
  }, []);

  const prepareModelData = useCallback(async () => {
    const { exists } = await FileSystem.getInfoAsync(
      FileSystem.cacheDirectory + MODEL_FILE_NAME
    );
    const filePath = exists
      ? FileSystem.cacheDirectory + MODEL_FILE_NAME
      : (await FileSystem.downloadAsync(
        MODEL_FILE_URL,
        FileSystem.documentDirectory + MODEL_FILE_NAME
      )).uri;
    try {
      const modelString = await FileSystem.readAsStringAsync(filePath);
      if (!exists) {
        await FileSystem.writeAsStringAsync(
          FileSystem.cacheDirectory + MODEL_FILE_NAME,
          modelString
        );
      }
      setModel(JSON.parse(modelString));
    } catch (e) {
      console.error(e);
      void FileSystem.deleteAsync(filePath).then(() => FileSystem.getInfoAsync(
        FileSystem.cacheDirectory + MODEL_FILE_NAME
      )).then(console.log);
    }
  }, []);

  const generate = useCallback(
    (size: number) => {
      if (model) {
        return Array.from(Array(size)).map(() => markov.run(model).join(""));
      } else {
        return [];
      }
    },
    [model]
  );

  return {
    prepareModelData,
    fetchAndCacheModelData,
    generate
  };
};

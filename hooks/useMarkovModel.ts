import { useCallback, useRef } from "react";
import * as FileSystem from "expo-file-system";
import { useGlobalState } from "./useGlobalState";
import markov from "hx-markov-chain";

const MODEL_FILE_NAME = "markov_model.json";
const MODEL_DATA_URL =
  "https://www.dropbox.com/s/u82dh1co2ahnw53/markov_model.json?dl=1";
// const MODEL_DATA_URL =
//   "https://www.dropbox.com/s/ejvjdtp0x8nxyqi/markov_model_light.json?dl=1";

export const useMarkovModel = () => {
  const [model, setModel] = useGlobalState("model");

  const fetchAndCacheModelData = useCallback(async () => {
    try {
      setModel(null);
      const filePath = (await FileSystem.downloadAsync(
        MODEL_DATA_URL,
        FileSystem.documentDirectory + MODEL_FILE_NAME
      )).uri;

      const modelString = await FileSystem.readAsStringAsync(filePath);
      await FileSystem.writeAsStringAsync(
        FileSystem.cacheDirectory + MODEL_FILE_NAME,
        modelString
      );
      setModel(JSON.parse(modelString));
    } catch (e) {
      console.error(e);
      void FileSystem.deleteAsync(FileSystem.cacheDirectory + MODEL_FILE_NAME);
    }
  }, []);

  const prepareModelData = useCallback(async () => {
    try {
      const { exists } = await FileSystem.getInfoAsync(
        FileSystem.cacheDirectory + MODEL_FILE_NAME
      );
      const filePath = exists
        ? FileSystem.cacheDirectory + MODEL_FILE_NAME
        : (await FileSystem.downloadAsync(
            MODEL_DATA_URL,
            FileSystem.documentDirectory + MODEL_FILE_NAME
          )).uri;

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
      void FileSystem.deleteAsync(FileSystem.cacheDirectory + MODEL_FILE_NAME);
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

import { useCallback, useRef } from "react";
import * as FileSystem from "expo-file-system";
import { useGlobalState } from "./useGlobalState";
import markov from "hx-markov-chain";

const MODEL_FILE_NAME = "markov_model.json";

export const useMarkovModel = () => {
  const [model, setModel] = useGlobalState("model");

  const prepareModel = useCallback(async () => {
    try {
      const { exists } = await FileSystem.getInfoAsync(
        FileSystem.cacheDirectory + MODEL_FILE_NAME
      );
      const filePath = exists
        ? FileSystem.cacheDirectory + MODEL_FILE_NAME
        : (await FileSystem.downloadAsync(
            "https://www.dropbox.com/s/8fgm73s8xrxlmdt/markov_model.json?dl=1",
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
    prepareModel,
    generate
  };
};

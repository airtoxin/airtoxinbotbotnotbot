import { useCallback, useRef } from "react";
import * as FileSystem from "expo-file-system";

const MODEL_FILE_NAME = "markov_model.json";

let globalModel = null;

export const useMarkovModel = () => {
  const prepareModel = useCallback(async (onReady: () => any) => {
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
      globalModel = JSON.parse(modelString);
      onReady();
    } catch (e) {
      console.error(e);
    }
  }, []);

  return {
    prepareModel,
    model: globalModel
  };
};

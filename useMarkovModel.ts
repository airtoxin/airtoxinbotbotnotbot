import { useEffect, useRef, useState } from "react";
import { Asset } from "expo";
import * as FileSystem from "expo-file-system";

const MODEL_FILE_NAME = "markov_model.json";

export const useMarkovModel = () => {
  const modelRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
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
          await FileSystem.writeAsStringAsync(FileSystem.cacheDirectory + MODEL_FILE_NAME, modelString);
        }
        modelRef.current = JSON.parse(modelString);
        setIsReady(true);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  return {
    isReady,
    model: modelRef.current
  };
};

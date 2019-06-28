import { useEffect, useRef, useState } from "react";
import * as FileSystem from "expo-file-system";

const MODEL_FILE_NAME = "markov_model.json";

export const useMarkovModel = () => {
  const modelRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    (async () => {
      const { exists } = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + MODEL_FILE_NAME);
      const filePath = exists ?
        FileSystem.cacheDirectory + MODEL_FILE_NAME :
        (await FileSystem.downloadAsync(
          "https://www.dropbox.com/s/8fgm73s8xrxlmdt/markov_model.json?dl=1",
          FileSystem.documentDirectory + MODEL_FILE_NAME
        )).uri;

      modelRef.current = JSON.parse(await FileSystem.readAsStringAsync(filePath));
      setIsReady(true);
    })();
  }, []);

  return {
    isReady,
    model: modelRef.current
  };
};

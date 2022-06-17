import * as FileSystem from "expo-file-system";
import type { MarkovModel } from "hx-markov-chain";
import markov from "hx-markov-chain";
import type { MutableRefObject } from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { atom, useRecoilValue } from "recoil";

export const ModelContext = createContext<MutableRefObject<MarkovModel | null>>(
  {
    current: null,
  }
);

const filename = "markov_model.json";

export const ModelDownloadUrlState = atom<string>({
  key: "ModelDownloadUrlState",
  default:
    "https://drive.google.com/u/0/uc?id=1spCX7lEohLXiGOx2sBBLSnkQcGfrI1pA&export=download",
});

export const useMarkovModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const modelDownloadUrl = useRecoilValue(ModelDownloadUrlState);
  const modelRef = useContext(ModelContext);

  const prepareModelData = useCallback(
    async (force = false) => {
      setIsLoading(true);
      const { exists } = await FileSystem.getInfoAsync(
        FileSystem.documentDirectory + filename
      );
      const filePath =
        exists && !force
          ? FileSystem.documentDirectory + filename
          : (
              await FileSystem.downloadAsync(
                modelDownloadUrl,
                FileSystem.documentDirectory + filename
              )
            ).uri;

      try {
        const modelString = await FileSystem.readAsStringAsync(filePath);
        modelRef.current = JSON.parse(modelString) as MarkovModel;
      } catch (e) {
        console.error(e);
        void FileSystem.deleteAsync(filePath);
      } finally {
        setIsLoading(false);
      }
    },
    [modelDownloadUrl, modelRef]
  );

  const generate = useCallback(
    (size: number) => {
      const model = modelRef.current;
      if (model != null) {
        return Array.from(Array(size)).map(() => markov.run(model).join(""));
      } else {
        return [];
      }
    },
    [modelRef]
  );

  return {
    isLoading,
    prepareModelData,
    generate,
  };
};

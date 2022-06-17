import "react-native-gesture-handler";

import { registerRootComponent } from "expo";
import type { MarkovModel } from "hx-markov-chain";
import React, { useRef } from "react";
import { RecoilRoot } from "recoil";

import { Application } from "./features/Application";
import { ModelContext } from "./hooks/useMarkovModel";

const App = () => {
  const modelRef = useRef<MarkovModel | null>(null);
  modelRef.current = null;
  return (
    <ModelContext.Provider value={modelRef}>
      <RecoilRoot>
        <Application />
      </RecoilRoot>
    </ModelContext.Provider>
  );
};

registerRootComponent(App);

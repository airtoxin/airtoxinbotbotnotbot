import React, { useEffect, useState } from "react";
import { useMarkovModel } from "./hooks/useMarkovModel";
import { Layout } from "./components/Layout";
import { Loading } from "./components/Loading";
import { Messages } from "./components/Messages";
import { GlobalDrawerStateProvider } from "./hooks/useGlobalDrawer";

export default () => {
  const [isReady, setIsReady] = useState(false);
  const { prepareModel } = useMarkovModel();
  useEffect(() => {
    void prepareModel(() => setIsReady(true));
  }, []);

  return (
    <GlobalDrawerStateProvider>
      <Layout>{isReady ? <Messages /> : <Loading />}</Layout>
    </GlobalDrawerStateProvider>
  );
};

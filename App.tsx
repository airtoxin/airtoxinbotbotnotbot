import React, { useEffect, useState } from "react";
import { useMarkovModel } from "./hooks/useMarkovModel";
import { Layout } from "./components/Layout";
import { Loading } from "./components/Loading";
import { Messages } from "./components/Messages";
import { GlobalStateProvider, useGlobalState } from "./hooks/useGlobalState";

export default () => {
  return (
    <GlobalStateProvider>
      <Layout>
        <Content />
      </Layout>
    </GlobalStateProvider>
  );
};

const Content: React.FunctionComponent = () => {
  const [model] = useGlobalState("model");
  const { prepareModel } = useMarkovModel();

  useEffect(() => {
    void prepareModel();
  }, []);

  return model ? <Messages /> : <Loading />;
};

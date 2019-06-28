import { createGlobalState } from "react-hooks-global-state";
const { GlobalStateProvider, useGlobalState } = createGlobalState({
  drawer: null as any,
});

export const GlobalDrawerStateProvider = GlobalStateProvider;

export const useGlobalDrawer = () => {
  const [drawer, setDrawer] = useGlobalState("drawer");

  const open = () => {
    if (drawer) {
      drawer._root.open();
    }
  };
  const close = () => {
    if (drawer) {
      drawer._root.close();
    }
  };

  return {
    open,
    close,
    setDrawer
  }
};

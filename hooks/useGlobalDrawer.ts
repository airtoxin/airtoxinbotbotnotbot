import { useGlobalState } from "./useGlobalState";

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
  };
};

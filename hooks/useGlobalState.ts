import { createGlobalState } from "react-hooks-global-state";
import { initialState } from "../state";

export const { GlobalStateProvider, useGlobalState } = createGlobalState(
  initialState
);

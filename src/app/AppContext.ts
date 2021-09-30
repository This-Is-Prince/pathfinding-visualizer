import React, { createContext } from "react";
import { ActionType } from "./reducer";
import { AppStateType } from "./state";

interface AppContextType {
  AppState: AppStateType;
  dispatch: React.Dispatch<ActionType>;
}

const AppContext = createContext({} as AppContextType);

export default AppContext;

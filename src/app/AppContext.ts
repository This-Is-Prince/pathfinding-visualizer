import { createContext } from "react";
import { AppStateType } from "./state";

const AppContext = createContext({} as AppStateType);

export default AppContext;

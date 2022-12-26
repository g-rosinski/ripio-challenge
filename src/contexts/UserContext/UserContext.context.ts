import { createContext } from "react";
import { initialUserContextState } from "./UserContext.state";
import { UserContextState } from "./UserContext.types";

export const UserContext = createContext<UserContextState>(initialUserContextState)
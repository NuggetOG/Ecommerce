import { createContext } from "react";

export const currentUserContext = createContext({ currentUser: null, setCurrentUser: () => {} });

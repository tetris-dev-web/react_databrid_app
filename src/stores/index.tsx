import { createContext } from "react";
import { TodoStore } from "./TodoStore";
import { UserStore } from "./UserStore";

export const rootStoreContext = createContext({
  todoStore: new TodoStore(),
  userStore: new UserStore()
});

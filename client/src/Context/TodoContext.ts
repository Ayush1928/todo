"use client"
import { createContext } from "react";

interface ITodoContext {
  shouldRefetch: boolean
  setShouldRefetch: (value: boolean) => void
}

const initialTodoContext: ITodoContext = {
  shouldRefetch: true,
  setShouldRefetch: () => { },
};
const TodoContext = createContext<ITodoContext>(initialTodoContext);

export default TodoContext;
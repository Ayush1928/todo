"use client"
import { ReactNode, useEffect, useState } from "react";
import TodoContext from "./TodoContext"
import { usePathname } from "next/navigation";

interface ITodoRefetchProps {
  children: ReactNode;
}

const TodoRefetch: React.FunctionComponent<ITodoRefetchProps> = ({children}) => {
    const [shouldRefetch, setShouldRefetch] = useState<boolean>(true);
    const pathname = usePathname()
    useEffect(()=>{
      setShouldRefetch(true)
    },[pathname])
    return (
      <TodoContext.Provider
        value={{
          shouldRefetch,
          setShouldRefetch,
        }}
      >
        {children}
      </TodoContext.Provider>
    );
  };
  
export default TodoRefetch;
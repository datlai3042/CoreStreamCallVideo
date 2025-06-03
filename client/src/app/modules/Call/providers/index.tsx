"use client";
import { createContext } from "react";

type TCallContext = {};

export const CallContext = createContext<TCallContext>({});

const CallProvier = ({ children }: { children: React.ReactNode }) => {
  
  
  return (
    <CallContext.Provider value={{}}>
      {children}
    </CallContext.Provider>
  );
};

export default CallProvier;

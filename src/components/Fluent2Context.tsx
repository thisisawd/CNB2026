import { createContext, useContext } from 'react';

interface Fluent2ContextValue {
  enabled: boolean;
}

const Fluent2Context = createContext<Fluent2ContextValue>({ enabled: false });

export function Fluent2Provider({ enabled, children }: { enabled: boolean; children: React.ReactNode }) {
  return (
    <Fluent2Context.Provider value={{ enabled }}>
      {children}
    </Fluent2Context.Provider>
  );
}

export function useFluent2() {
  return useContext(Fluent2Context);
}

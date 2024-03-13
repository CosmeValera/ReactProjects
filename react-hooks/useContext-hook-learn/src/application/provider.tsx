import { createContext, useState, useContext, ReactNode } from "react";

export default function Provider (props: { children: ReactNode }) {
    const [state, setState] = useState({});
    return (
        <div>
            <AppContext.Provider value={[state, setState]}>
                {props.children}
            </AppContext.Provider>
        </div>
    )
}

type MyContextType = [Record<string, unknown>, unknown];

export const AppContext = createContext<MyContextType | undefined>(undefined);
export const useMyContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error("useMyContext must be used within an AppContext.Provider");
    }
    return context;
}


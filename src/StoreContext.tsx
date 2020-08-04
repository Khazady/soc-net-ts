import React from "react";
import {Store} from "redux";

export type ProviderType = {
    store: Store
    children: React.ReactNode
}

export const StoreContext = React.createContext({}as Store)

export const Provider = (props: ProviderType) => {
    return <StoreContext.Provider value={props.store}>
        {props.children}
    </StoreContext.Provider>
}

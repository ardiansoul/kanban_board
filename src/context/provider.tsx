import { createContext, Dispatch, Reducer, useReducer } from "react"
import { Action, initialState, reducer, State } from "./reducer"
import React from "react"

interface Props {

}

export const AppContext = createContext<{ state: State | undefined, dispatch: Dispatch<Action> }>({ state: undefined, dispatch: () => null })

const AppProvider: React.FC<Props> = (props) => {
    const { children } = props
    const [state, dispatch] = useReducer<Reducer<State, Action>>(reducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider
import { createContext, useReducer, useEffect } from "react";
import Reducer from './reducer'

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: false,
}

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) =>{
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        let isMounted = true;
        if (isMounted){
            localStorage.setItem("user", JSON.stringify(state.user));
        }
        return () => {
            isMounted=false;
        }
    }, [state.user]);

    return <Context.Provider value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
    }}>
        {children}
    </Context.Provider>
}
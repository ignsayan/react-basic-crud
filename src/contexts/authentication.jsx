import { createContext, useState } from "react";
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthState = (props) => {

    const initialState = Cookies.get('access_token') ? true : false;
    const [isAuthenticated, setIsAuthenticated] = useState(initialState);

    const dispatch = () => {
        setIsAuthenticated((toggle) => !toggle)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, dispatch }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthState };

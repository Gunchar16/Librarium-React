import {useState} from 'react';
import {createContext} from 'react';

export const userContext = createContext({
    user: JSON.parse(localStorage.getItem('user')),
    setUser: () => {

    }
});

export const UserContextProvider = (props) => {
    const [state, setState] = useState(JSON.parse(localStorage.getItem('user')));
    const [accessToken, setAccessToken] = useState(JSON.parse(localStorage.getItem('userAccessToken')));

    const setUser = async (user, token) => {
        setState(user);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('userAccessToken', JSON.stringify(token));
    };

    const resetUser = () => {
        setState(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userAccessToken');
        setAccessToken(null);
    };

    return (
        <userContext.Provider value={{
            user: state,
            setUser: setUser,
            accessToken: accessToken,
            setAccessToken: setAccessToken,
            resetUser: resetUser,
        }}>
            {props?.children}
        </userContext.Provider>
    );
}
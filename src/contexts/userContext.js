import { createContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext();

export function UserContextProvider({children})
{
    const [userToken, setUserToken] = useState(null)
    let data = null;
    if (userToken) {
        data = jwtDecode(userToken)
    }
    return (
        <UserContext.Provider value={{data,userToken, setUserToken}}>
            {children}
        </UserContext.Provider>
    )
}

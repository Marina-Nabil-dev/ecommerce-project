import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserContextProvider({children})
{
    const [userToken, setUserToken] = useState(null)
    return (
        <UserContext.Provider value={{userToken, setUserToken}}>
            {children}
        </UserContext.Provider>
    )
}

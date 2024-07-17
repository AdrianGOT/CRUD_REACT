import { createContext, useState } from "react";
import { UserWithId } from '../interfaces/users';

interface UserEditProvider { 
    userToEdit: UserWithId,
    setUserToEdit: (user:UserWithId) => void
}

const initialValue = {
    id: "",
    name: "",
    email: "",
    github: ""
}



export const UserContext = createContext<UserEditProvider>({
    userToEdit: initialValue,
    setUserToEdit: (user: UserWithId) => {}
});



export function UserProvider({children}: React.PropsWithChildren){
    const [userToEdit, setUserToEdit] = useState<UserWithId>(initialValue) ;

    return(
        <UserContext.Provider value={{
            userToEdit,
            setUserToEdit
        }}>
            {children}
        </UserContext.Provider>
    )
} 
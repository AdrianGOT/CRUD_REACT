import { useContext } from "react"
import { UserContext } from "../context/userToEdit";

export const useEditInput = () => {

    const { userToEdit,setUserToEdit } = useContext(UserContext);
        
    return {
        userToEdit,
        setUserToEdit
    }
}
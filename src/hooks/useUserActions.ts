import { User, UserId, UserWithId } from "../interfaces/users";
import { addNewUser, deleteUserById, editUser } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const removeUser = (id: UserId)=> {
      dispatch(deleteUserById(id))
    }
  
    const editUserRegisterd = (user: UserWithId)=> {
        dispatch(editUser(user))
        
    }

    const addUser = (user: User) => {
      dispatch(addNewUser(user))
    }

    return {
        editUserRegisterd,
        removeUser,
        addUser
    }
}

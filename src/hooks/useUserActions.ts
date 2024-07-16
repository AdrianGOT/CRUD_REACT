import { UserId } from "../interfaces/users";
import { deleteUserById } from "../store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
    const dispatch = useAppDispatch();

    const removeUser = (id: UserId)=> {
      dispatch(deleteUserById(id))
    }
  
    const editUser = (id: UserId)=> {
        
    }

    return {
        removeUser,
        editUser
    }
}

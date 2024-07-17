import { configureStore } from "@reduxjs/toolkit";
import  userReducer, { removeNewUser, rollBackUser, removeEditFromUser } from './users/slice';
import { toast } from "sonner";
import { UserWithId } from '../interfaces/users';


const persistanceMiddleware = (store) => (next)=> (action)=> {
    next(action)
    localStorage.setItem('__reduce__state__', JSON.stringify(store.getState()))
}

const syncDataMiddleware = store => next => action => {
    const previusState = store.getState();
    const { type , payload } = action;
    console.log(type , payload, previusState);
    
    
    // Hacemos el llamado para que se ejecute el reducer del estado
    next(action);

    // Vemos que acción se ejecutó para accionar su respectivo rollback
    if(type === 'users/deleteUserById'){
        const userToRemove = previusState.users.find((user:UserWithId) => user.id === payload);
                
        toast.success('The user have been remove successfully!');

        setTimeout(()=> {            
            if(userToRemove) store.dispatch(rollBackUser(userToRemove));
            toast.error(`There is an error while deleting the user with id ${userToRemove.id}`)
        }, 4000)
        
    }else if(type === 'users/addNewUser'){
        const random = Math.random() * 10;
        const { email } = payload; 
        const userToAdd = previusState.users.find((user: UserWithId) => user.email === email);

        if(random > 5){
            toast.success(`The user ${userToAdd.name} have been added successfully!`);
        }else {
            toast.error('An error has occurred while creating a new user');
            store.dispatch(removeNewUser(userToAdd))
        }

    }else if(type === 'user/editUser'){
        const random = Math.random() * 10;
        const { email } = payload; 
        const userToAdd = previusState.users.find((user: UserWithId) => user.email === email);
        
        if(random > 5){
            toast.success(`The user ${userToAdd.name} have been edited successfully!`);
        }else {
            toast.error('An error has occurred while editing a new user');
            store.dispatch(removeEditFromUser(userToAdd))
        }
        
    }
}

export const store = configureStore({
    reducer: {
        users: userReducer,

    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(persistanceMiddleware)
            .concat(syncDataMiddleware)
})
 
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
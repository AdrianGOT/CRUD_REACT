import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListOfUserWithId, User, UserId, UserWithId } from "../../interfaces/users";
import { usersMock } from "../../mocks/users";

const initialState: ListOfUserWithId = (()=>{
    const persistenceData = localStorage.getItem('__reduce__state__');
    if(persistenceData) return JSON.parse(persistenceData).users;
    return usersMock; 
})()

export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUserById: (state, action:PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => id !== user.id)
        },
        addNewUser: (state, action:PayloadAction<User>) => {
            
            const newUser: UserWithId = {
                ...action.payload,
                id: crypto.randomUUID()
            }
        
            return [newUser,...state];
        },
        removeNewUser: (state, action:PayloadAction<User>)=> {
            const { email } = action.payload;
            const isUserAlreadyRegisterd = state.some(user => user.email === email )
            if(isUserAlreadyRegisterd) return state.filter(user => user.email !== email)
        },
        rollBackUser: (state, action:PayloadAction<UserWithId>) => {
            const isUserAlreadyRegistered = state.some(user => user.id === action.payload.id);
            if(!isUserAlreadyRegistered) return [...state, {...action.payload}]
        },
        editUser: (state, action:PayloadAction<UserWithId>) => {
            const userEdited = action.payload;
            const index = state.findIndex(user => user.id === userEdited.id);
            state[index] = userEdited;
        },
        removeEditFromUser: (state, action:PayloadAction<UserWithId>)=> {
            const userBeforeEditing = action.payload
            const userIndex = state.findIndex((user) => user.id === userBeforeEditing.id);
            state[userIndex] = userBeforeEditing;
        }

    },
})

export default userSlice.reducer;
export const { 
    removeEditFromUser,
    deleteUserById, 
    removeNewUser,
    rollBackUser,
    addNewUser, 
    editUser,
} = userSlice.actions;
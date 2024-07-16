import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListOfUserWithId, UserId } from "../../interfaces/users";
import { usersMock } from "../../mocks/users";

const initialState: ListOfUserWithId = usersMock



export const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        deleteUserById: (state, action:PayloadAction<UserId>) => {
            const id = action.payload;
            return state.filter((user) => id !== user.id)

        }
    },
})

export default userSlice.reducer;
export const { deleteUserById } = userSlice.actions;
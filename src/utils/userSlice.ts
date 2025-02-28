import { createSlice } from "@reduxjs/toolkit";

 export interface UserState {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string; // Optional if it's not always available
}

const initialState: UserState | null = null;

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    removeUser: (state, action) => {
      return null;
    },
  },
});

export const {addUser, removeUser} = userSlice.actions
export default userSlice.reducer
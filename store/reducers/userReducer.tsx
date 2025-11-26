import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface authState {
    userDetails: [] | any
    loading: boolean
}
  
// Define the initial state using that type
const initialState: authState = {
    userDetails: null,
    loading: false
}

// Create an async thunk for loading initial state
export const loadStoredUser = createAsyncThunk(
    'auth/loadStoredUser',
    async () => {
        const storedUser = await AsyncStorage.getItem('userDetails') ?? null
        if (!storedUser) return null;
        try {
            return JSON.parse(storedUser);
        } catch (e) {
            console.error('JSON parse error in userReducer.tsx (storedUser):', e, storedUser);
            await AsyncStorage.removeItem('userDetails');
            return null;
        }
    }
)

export const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        loginReducer: (state, action) => {
            state.userDetails = action.payload
            AsyncStorage.setItem('userDetails', JSON.stringify(action.payload))
        },
        logoutReducer: (state, action) => {
            state.userDetails = null
            AsyncStorage.removeItem('userDetails')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadStoredUser.pending, (state) => {
                state.loading = true
            })
            .addCase(loadStoredUser.fulfilled, (state, action) => {
                state.userDetails = action.payload
                state.loading = false
            })
            .addCase(loadStoredUser.rejected, (state) => {
                state.loading = false
            })
    }
})

// Action creators are generated for each case reducer function
export const { loginReducer, logoutReducer } = authReducer.actions

export default authReducer.reducer
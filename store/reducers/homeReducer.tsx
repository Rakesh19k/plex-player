import AsyncStorage from '@react-native-async-storage/async-storage'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface authState {
    movieList: [] | any
    topBoxList: [] | any
    topRatedList: [] | any
    movieDetail: {} | any
    upComing: [] | any
    favourites: [] | any
    loading: boolean
  }
  
  // Define the initial state using that type
  const initialState: authState = {
    movieList: [],
    topBoxList: [],
    topRatedList: [],
    movieDetail: {},
    upComing:[],
    favourites: [],
    loading: true
  }

  // Create an async thunk for loading initial state
export const loadStoredUser = createAsyncThunk(
  'home/loadStoredUser',
  async () => {
    const storedUser = await AsyncStorage.getItem('favourites') ?? null
    if (!storedUser) return null;
    try {
      return JSON.parse(storedUser);
    } catch (e) {
      console.error('JSON parse error in homeReducer.tsx (storedUser):', e, storedUser);
      return null;
    }
  }
);

  export const homeReducer = createSlice({
    name: 'homeReducer',
    initialState,
    reducers: {
      movieReducer: (state, action) => {
        state.movieList = action.payload
        state.loading = false
      },
      topBosListReducer: (state, action) => {
        state.topBoxList = action.payload
        state.loading = false
      },
      topRatedListReducer: (state, action) => {
        state.topRatedList = action.payload
        state.loading = false
      },
      movieDetailReducer: (state, action) => {
        state.movieDetail = action.payload
      },
      upComingMovieReducer: (state, action) => {
        state.upComing = action.payload
      },
      setFavourites: (state, action) => {
        const updateState = [...state.favourites, action.payload];
        AsyncStorage.setItem('favourites', JSON.stringify(updateState));
        state.favourites = updateState
      },
      setLocalFav: (state, action) => {
        state.favourites = action.payload
      },
      
    },
    extraReducers: (builder) => {
      builder
          .addCase(loadStoredUser.pending, (state) => {
              state.loading = true
          })
          .addCase(loadStoredUser.fulfilled, (state, action) => {
              state.favourites = action.payload
              state.loading = false
          })
          .addCase(loadStoredUser.rejected, (state) => {
              state.loading = false
          })
  },
})

// Action creators are generated for each case reducer function
export const { movieReducer, topBosListReducer, topRatedListReducer, movieDetailReducer, upComingMovieReducer, setFavourites, setLocalFav } = homeReducer.actions

export default homeReducer.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import request from '../../../utils/request'

const initialState = {
  data: [],
  isLoading: true,
  hasNextPage: true
}

export const getPosts = createAsyncThunk('api/motel', async () => {
    const motels = await request({
      url: '/motel',
      method:'GET'
    })
    return motels
})
export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    appendPosts: (state, action) => {
      state.data.push(...action.payload.data)
      // state.isLoading = false,
      // state.hasNextPage = action.payload.hasNextPage 
    },
    clearPosts: (state) => {
        return initialState
    }
  },
  extraReducers: {
    [getPosts.pending]: (state) => {
      state.isLoading = true
    },
    [getPosts.rejected]: (state, action) => {
      state.isLoading = false
    },
    [getPosts.fulfilled]: (state, action) => {
      state.isLoading = false
      state.data.push(...action.payload)
    }
  }
})

// Action creators are generated for each case reducer function
export const { appendPosts, clearPosts } = postsSlice.actions

export default postsSlice.reducer
import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
      value: {
          array: [],
          username: '',
          reviews: []
      },
    },
    reducers: {
      setRoute: (state, array) => {
        state.value.array = array.payload
      },

      resetRoute: (state) => {
        state.value.array = []
      },

      setCurrentUsername: (state, username) => {
        state.value.username = username.payload;
      },

      setReviews: (state, reviews) => {
          state.value.reviews = reviews.payload
      }
    },
  })

  export const { setRoute, resetRoute, setCurrentUsername, setReviews } = orderSlice.actions

  export default orderSlice.reducer

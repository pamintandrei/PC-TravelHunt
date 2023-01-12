import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
      value: {
          array: [],
          username: ''
      },
    },
    reducers: {
      generateRoute: (state) => {
        state.value.array = [...Array(7).keys()]
      },

      resetRoute: (state) => {
        state.value.array = []
      },

      setCurrentUsername: (state, username) => {
        state.value.username = username;
      },
    },
  })

  export const { generateRoute, resetRoute, setCurrentUsername } = orderSlice.actions

  export default orderSlice.reducer

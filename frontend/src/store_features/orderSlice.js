import { createSlice } from '@reduxjs/toolkit'

export const orderSlice = createSlice({
    name: 'order',
    initialState: {
      value: [],
    },
    reducers: {
      generateRoute: (state) => {
        state.value = [...Array(7).keys()]
      },

      resetRoute: (state) => {
        state.value = []
      }
    },
  })

  export const { generateRoute, resetRoute } = orderSlice.actions

  export default orderSlice.reducer

import { configureStore } from '@reduxjs/toolkit'
import orderSlice from '../store_features/orderSlice'

export default configureStore({
  reducer: {
    order: orderSlice
  },
})
// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import category from 'src/store/apps/category'
import admins from 'src/store/apps/admins'

export const store = configureStore({
    reducer: {
        category,
        admins
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

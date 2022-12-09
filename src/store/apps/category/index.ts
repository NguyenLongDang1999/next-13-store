// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import { API } from 'src/utils/enums'
import { request } from 'src/utils/request'
import { FillFormData } from 'src/utils/funcs'

// ** Types
import { CategoryInputType } from 'src/types/apps/categoryTypes'

// ** POST: Create
export const create = createAsyncThunk('appCategory/create', async (data: CategoryInputType) => {
    FillFormData(data)

    return await request.post(API.CATEGORY, data)
})

export const appCategorySlice = createSlice({
    name: 'appCategory',
    initialState: {
        categoryList: null
    },
    reducers: {
        // removeSelectedChat: state => {
        //     state.selectedChat = null
        // }
    },
    extraReducers: builder => {
        // builder.addCase(fetchList.fulfilled, (state, action) => {
        //     state.categoryList = action.payload
        // })
        // builder.addCase(fetchChatsContacts.fulfilled, (state, action) => {
        //     state.contacts = action.payload.contacts
        //     state.chats = action.payload.chatsContacts
        // })
        // builder.addCase(selectChat.fulfilled, (state, action) => {
        //     state.selectedChat = action.payload
        // })
    }
})

export const {} = appCategorySlice.actions

export default appCategorySlice.reducer

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import { API, PAGE } from 'src/utils/enums'
import { request } from 'src/utils/request'
import { FillFormData } from 'src/utils/funcs'

// ** Types
import { CategoryInputType } from 'src/types/apps/categoryTypes'

interface DataParams {
    page: number
    pageSize: number
}

interface Redux {
    dispatch: Dispatch<any>
}

const Pagination: DataParams = {
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
}

// ** Get: Category
export const fetchData = createAsyncThunk('appCategory/fetchData', async (params: DataParams) => {
    const response = await request.get(API.CATEGORY, { params })

    return response
})

// ** POST: Create
export const create = createAsyncThunk('appCategory/create', async (data: CategoryInputType, { dispatch }: Redux) => {
    FillFormData(data)
    await request.post(API.CATEGORY, data)

    return dispatch(fetchData(Pagination))
})

export const appCategorySlice = createSlice({
    name: 'appCategory',
    initialState: {
        categoryList: null,
        categoryTotal: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            const { data: category } = action.payload

            state.categoryList = category.data
            state.categoryTotal = category.aggregations?._count
        })
    }
})

export const {} = appCategorySlice.actions

export default appCategorySlice.reducer

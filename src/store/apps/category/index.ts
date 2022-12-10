// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import { API, PAGE } from 'src/utils/enums'
import { request } from 'src/utils/request'
import { FillFormData } from 'src/utils/funcs'

// ** Types
import { CategoryInputType, CategorySearchType } from 'src/types/apps/categoryTypes'

interface DataParams {
    page: number
    pageSize: number
    search?: CategorySearchType
}

interface CategoryOption {
    id: string
    name: string
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

// ** Get: Category Select/Option
export const fetchCategoryData = createAsyncThunk('appCategory/fetchCategoryData', async () => {
    const response = await request.get(API.CATEGORY + '/fetch-category')

    return response
})

// ** POST: Create
export const create = createAsyncThunk('appCategory/create', async (data: CategoryInputType, { dispatch }: Redux) => {
    FillFormData(data)
    const response = await request.post(API.CATEGORY, data)
    dispatch(fetchData(Pagination))
    dispatch(fetchCategoryData())

    return response
})

// ** PATCH: Update :id
export const update = createAsyncThunk('appCategory/update', async (data: CategoryInputType, { dispatch }: Redux) => {
    FillFormData(data)
    const response = await request.patch(API.CATEGORY + '/' + data.id, data)
    dispatch(fetchData(Pagination))

    return response
})

export const appCategorySlice = createSlice({
    name: 'appCategory',
    initialState: {
        categoryList: null,
        categoryTotal: null,
        categoryData: [] as CategoryOption[]
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            const { data: category } = action.payload

            state.categoryList = category.data
            state.categoryTotal = category.aggregations?._count
        })
        builder.addCase(fetchCategoryData.fulfilled, (state, action) => {
            const { data: category } = action.payload
            state.categoryData = category
        })
    }
})

export const {} = appCategorySlice.actions

export default appCategorySlice.reducer

// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Utils Imports
import { API, PAGE } from 'src/utils/enums'
import { request } from 'src/utils/request'
import { FillFormData } from 'src/utils/funcs'

// ** Types
import { AdminInputType, AdminSearchType } from 'src/types/apps/AdminTypes'

interface DataParams {
    page: number
    pageSize: number
    search?: AdminSearchType
}

interface Redux {
    dispatch: Dispatch<any>
}

const Pagination: DataParams = {
    page: PAGE.CURRENT,
    pageSize: PAGE.SIZE
}

// ** Get: Admins
export const fetchData = createAsyncThunk('appAdmin/fetchData', async (params: DataParams) => {
    const response = await request.get(API.ADMINS, { params })

    return response
})

// ** POST: Create
export const create = createAsyncThunk('appAdmin/create', async (data: AdminInputType, { dispatch }: Redux) => {
    FillFormData(data)
    delete data.confirm_password

    const response = await request.post(API.ADMINS, data)
    dispatch(fetchData(Pagination))

    return response
})

// ** PATCH: Update :id
export const update = createAsyncThunk('appAdmin/update', async (data: AdminInputType, { dispatch }: Redux) => {
    FillFormData(data)
    const response = await request.patch(API.ADMINS + '/' + data.id, data)
    dispatch(fetchData(Pagination))

    return response
})

export const appAdminSlice = createSlice({
    name: 'appAdmin',
    initialState: {
        adminList: null,
        adminTotal: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchData.fulfilled, (state, action) => {
            const { data: admins } = action.payload

            state.adminList = admins.data
            state.adminTotal = admins.aggregations?._count
        })
    }
})

export const {} = appAdminSlice.actions

export default appAdminSlice.reducer

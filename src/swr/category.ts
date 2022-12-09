// ** SWR Imports
import { useFetchData } from 'src/utils/fetch'

// ** Utils Import
import { API } from 'src/utils/enums'
import { PAGINATION } from 'src/utils/interfaces'

export const useCategory = ({ page, pageSize }: PAGINATION) => {
    const { data, error } = useFetchData(`${API.CATEGORY}?page=${page}&pageSize=${pageSize}`)

    return {
        category: data,
        isLoading: !error && !data,
        isError: error
    }
}

// ** SWR Imports
import useSWR from 'swr'

// ** Utils Imports
import { request } from 'src/utils/request'

const fetcher = (url: string) => request.get(url).then(res => res.data)

export const useFetchData = (path: string) => useSWR(path, fetcher)

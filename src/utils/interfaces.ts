import { ThemeColor } from 'src/@core/layouts/types'

export interface StatusType {
    [key: number]: {
        title: string
        icon: string
        color: ThemeColor
    }
}

export interface PopularType {
    [key: number]: {
        title: string
        icon: string
        color: ThemeColor
    }
}

import { POPULAR, STATUS } from './enums'
import { PopularType, StatusType } from './interfaces'

export const OptionStatus: StatusType = {
    [STATUS.ACTIVE]: {
        title: 'Hoạt Động',
        icon: 'mdi:check',
        color: 'primary'
    },
    [STATUS.INACTIVE]: {
        title: 'Không Hoạt Động',
        icon: 'mdi:close',
        color: 'error'
    }
}

export const OptionPopular: PopularType = {
    [POPULAR.ACTIVE]: {
        title: 'Phổ Biến',
        icon: 'mdi:check',
        color: 'primary'
    },
    [POPULAR.INACTIVE]: {
        title: 'Không Phổ Biến',
        icon: 'mdi:close',
        color: 'error'
    }
}

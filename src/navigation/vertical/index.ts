// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const PATH_ADMIN = '/cms-portal-admin'

const navigation = (): VerticalNavItemsType => {
    return [
        {
            title: 'Thống Kê',
            icon: 'mdi:home-outline',
            path: PATH_ADMIN + '/dashboards/crm'
        },
        {
            sectionTitle: 'ProductManagement.Name'
        },
        {
            title: 'ProductManagement.Category.Name',
            icon: 'mdi:shape-outline',
            path: PATH_ADMIN + '/category'
        }
    ]
}

export default navigation

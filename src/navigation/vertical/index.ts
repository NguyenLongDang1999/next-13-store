// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): VerticalNavItemsType => {
    return [
        {
            title: 'Dashboards',
            icon: 'mdi:home-outline',
            badgeContent: 'new',
            badgeColor: 'error',
            children: [
                {
                    title: 'CRM',
                    path: '/dashboards/crm'
                },
                {
                    title: 'Analytics',
                    path: '/dashboards/analytics'
                },
                {
                    title: 'eCommerce',
                    path: '/dashboards/ecommerce'
                }
            ]
        },
        {
            sectionTitle: 'Apps & Pages'
        },
        {
            title: 'Email',
            icon: 'mdi:email-outline',
            path: '/apps/email'
        }
    ]
}

export default navigation

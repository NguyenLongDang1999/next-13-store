// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'

// ** Demo Components Imports
import TableFilter from 'src/views/category/TableFilter'

const Category = () => {
    const { t } = useTranslation()

    return (
        <Grid container spacing={6}>
            <PageHeader
                title={
                    <Typography variant='h6' className='text-uppercase'>
                        {t('ProductManagement.Category.Management')}
                    </Typography>
                }
            />

            <Grid item xs={12}>
                <TableFilter />
            </Grid>
        </Grid>
    )
}

export default Category

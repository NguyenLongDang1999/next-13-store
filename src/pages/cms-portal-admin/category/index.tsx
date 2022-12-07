// ** MUI Imports
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'

// ** Custom Components Imports
import PageHeader from 'src/@core/components/page-header'
import Translations from 'src/layouts/components/Translations'

// ** Demo Components Imports
import TableFilter from 'src/views/category/TableFilter'

const Category = () => {
    return (
        <Grid
            container
            spacing={6}
        >
            <PageHeader
                title={
                    <Typography
                        variant='h6'
                        className='text-uppercase'
                    >
                        <Translations text='Category.Management' />
                    </Typography>
                }
            />

            <Grid
                item
                xs={12}
            >
                <TableFilter />
            </Grid>
        </Grid>
    )
}

export default Category

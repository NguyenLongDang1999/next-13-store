// ** React Imports
import { SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'

// ** Custom Components Imports
import Translations from 'src/layouts/components/Translations'

// ** Types Imports
import { AdminSearchType } from 'src/types/apps/AdminTypes'

interface Props {
    setSearch: (val?: AdminSearchType) => void
}

const SearchFilter = (props: Props) => {
    // ** Props
    const { setSearch } = props

    // ** State
    const [form, setForm] = useState<AdminSearchType>()

    // ** Hooks
    const handleSearch = (e: SyntheticEvent) => {
        e.preventDefault()
        setSearch(form)
    }

    const handleReset = (e: SyntheticEvent) => {
        e.preventDefault()
        setForm(undefined)
        setSearch()
    }

    return (
        <>
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    variant='h6'
                    sx={{ mb: 3, lineHeight: '2rem', textTransform: 'uppercase' }}
                >
                    <Translations text='Search' />
                </Typography>
            </Box>

            <form
                noValidate
                autoComplete='off'
                onSubmit={handleSearch}
                onReset={handleReset}
            >
                <Grid
                    container
                    spacing={6}
                >
                    <Grid
                        item
                        sm={4}
                        xs={12}
                    >
                        <InputLabel
                            htmlFor='name'
                            className='text-label'
                        >
                            <Translations text='Users.Name' />
                        </InputLabel>

                        <TextField
                            fullWidth
                            id='name'
                            size='small'
                            value={form?.name || ''}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                        />
                    </Grid>

                    <Grid
                        item
                        sm={4}
                        xs={12}
                    >
                        <InputLabel
                            htmlFor='email'
                            className='text-label'
                        >
                            <Translations text='Users.Email' />
                        </InputLabel>

                        <TextField
                            fullWidth
                            id='email'
                            size='small'
                            value={form?.email || ''}
                            onChange={(event) => setForm({ ...form, email: event.target.value })}
                        />
                    </Grid>

                    <Grid
                        item
                        sm={4}
                        xs={12}
                    >
                        <InputLabel
                            htmlFor='phone'
                            className='text-label'
                        >
                            <Translations text='Users.Phone' />
                        </InputLabel>

                        <TextField
                            fullWidth
                            id='phone'
                            size='small'
                            value={form?.phone || ''}
                            onChange={(event) => setForm({ ...form, phone: event.target.value })}
                        />
                    </Grid>
                </Grid>

                <Box sx={{ mt: 6, textAlign: 'center' }}>
                    <Button
                        variant='contained'
                        sx={{ mr: 2 }}
                        size='small'
                        type='submit'
                    >
                        <Translations text='Btn.Search' />
                    </Button>

                    <Button
                        variant='outlined'
                        size='small'
                        color='secondary'
                        type='reset'
                    >
                        <Translations text='Btn.Reset' />
                    </Button>
                </Box>
            </form>
        </>
    )
}

export default SearchFilter

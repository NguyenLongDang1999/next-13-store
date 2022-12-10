// ** React Imports
import { useCallback, useEffect, SyntheticEvent, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'

// ** Custom Components Imports
import Translations from 'src/layouts/components/Translations'

// ** Utils Imports
import { OptionPopular, OptionStatus } from 'src/utils/funcs'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { CategorySearchType } from 'src/types/apps/categoryTypes'

// ** Actions Imports
import { fetchCategoryData } from 'src/store/apps/category'

interface Props {
    setSearch: (val?: CategorySearchType) => void
}

const SearchFilter = (props: Props) => {
    // ** Props
    const { setSearch } = props

    // ** State
    const [form, setForm] = useState<CategorySearchType>()

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.category)

    const fetchCategory = useCallback(() => {
        dispatch(fetchCategoryData())
    }, [dispatch])

    useEffect(() => {
        fetchCategory()
    }, [fetchCategory])

    const handleSearch = (e: SyntheticEvent) => {
        e.preventDefault()
        setSearch(form)
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
            >
                <Grid
                    container
                    spacing={6}
                >
                    <Grid
                        item
                        sm={6}
                        xs={12}
                    >
                        <InputLabel
                            htmlFor='name'
                            className='text-label'
                        >
                            <Translations text='Category.Title' />
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
                        sm={6}
                        xs={12}
                    >
                        <InputLabel
                            htmlFor='parent_id'
                            className='text-label'
                        >
                            <Translations text='Category.Name' />
                        </InputLabel>

                        <Select
                            fullWidth
                            size='small'
                            value={form?.parent_id || ''}
                            labelId='parent_id'
                            id='parent_id'
                            onChange={event => setForm({ ...form, parent_id: event.target.value })}
                        >
                            {store.categoryData.map(_s => (
                                <MenuItem
                                    key={_s.id}
                                    value={_s.id}
                                >
                                    {_s.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid
                        item
                        sm={6}
                        xs={12}
                    >
                        <InputLabel
                            htmlFor='status'
                            className='text-label'
                        >
                            <Translations text='Status' />
                        </InputLabel>

                        <Select
                            fullWidth
                            value={form?.status || ''}
                            labelId='status'
                            id='status'
                            size='small'
                            onChange={event => setForm({ ...form, status: Number(event.target.value) })}
                        >
                            {Object.keys(OptionStatus).map(key => (
                                <MenuItem
                                    key={key}
                                    value={Number(key)}
                                >
                                    {OptionStatus[Number(key)].title}
                                </MenuItem>
                            ))}
                        </Select>
                    </Grid>

                    <Grid
                        item
                        sm={6}
                        xs={12}
                    >
                        <InputLabel
                            htmlFor='popular'
                            className='text-label'
                        >
                            <Translations text='Popular' />
                        </InputLabel>

                        <Select
                            fullWidth
                            value={form?.popular || ''}
                            labelId='popular'
                            id='popular'
                            size='small'
                            onChange={event => setForm({ ...form, popular: Number(event.target.value) })}
                        >
                            {Object.keys(OptionPopular).map(key => (
                                <MenuItem
                                    key={key}
                                    value={Number(key)}
                                >
                                    {OptionPopular[Number(key)].title}
                                </MenuItem>
                            ))}
                        </Select>
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

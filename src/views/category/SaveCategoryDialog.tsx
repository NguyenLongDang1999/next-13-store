// ** React Imports
import { KeyboardEvent, useCallback, useEffect } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import { FormControl, FormHelperText } from '@mui/material'

// ** Custom Components Imports
import Translations from 'src/layouts/components/Translations'

// ** Third Party Imports
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Utils Imports
import { OptionPopular, OptionStatus, StrSlugify } from 'src/utils/funcs'
import { request } from 'src/utils/request'
import { API } from 'src/utils/enums'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Types Imports
import { AppDispatch, RootState } from 'src/store'
import { CategoryInputType } from 'src/types/apps/categoryTypes'

// ** Actions Imports
import { create, update } from 'src/store/apps/category'

type Props = {
    id?: string
    setId: (val: string) => void
    show: boolean
    setShow: (val: boolean) => void
}

const defaultValues = {
    id: '',
    name: '',
    slug: '',
    description: '',
    image_uri: '',
    parent_id: '',
    status: Number(''),
    popular: Number(''),
    meta_title: '',
    meta_keyword: '',
    meta_description: ''
}

const schema = yup.object().shape({
    name: yup
        .string()
        .nullable(true)
        .min(3, obj => <Translations
            text='Category.Title'
            message='Validate.Min'
            strLength={obj.min}
        />)
        .max(30, obj => <Translations
            text='Category.Title'
            message='Validate.Max'
            strLength={obj.max}
        />)
        .required(() => <Translations
            text='Category.Title'
            message='Validate.Required'
        />),
    description: yup
        .string()
        .nullable(true)
        .max(160, obj => <Translations
            text='Description'
            message='Validate.Max'
            strLength={obj.max}
        />),
    meta_title: yup
        .string()
        .nullable(true)
        .max(60, obj => <Translations
            text='Meta.Title'
            message='Validate.Max'
            strLength={obj.max}
        />),
    meta_keyword: yup
        .string()
        .nullable(true)
        .max(60, obj => <Translations
            text='Meta.Keyword'
            message='Validate.Max'
            strLength={obj.max}
        />),
    meta_description: yup
        .string()
        .nullable(true)
        .max(160, obj => <Translations
            text='Meta.Description'
            message='Validate.Max'
            strLength={obj.max}
        />)
})

const SaveCategoryDialog = (props: Props) => {
    // ** Props
    const { show, setShow, id, setId } = props

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
    const store = useSelector((state: RootState) => state.category)

    const {
        reset,
        control,
        setValue,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const handleClose = () => {
        setShow(false)
        setId('')
        reset(defaultValues)
    }

    const onSubmit = (data: CategoryInputType) => {
        id ? dispatch(update({ ...data })) : dispatch(create({ ...data }))
        toast.success(<Translations text="Message.Success" />)
        handleClose()
    }

    const slugify = (event: KeyboardEvent<HTMLInputElement>) => setValue('slug', StrSlugify((event.target as HTMLInputElement).value))

    const fetchDataDetail = useCallback(async (id?: string) => {
        if (show && id) {
            const res = await request.get(API.CATEGORY + '/' + id)
            reset(res.data)
        }
    }, [show, reset])

    useEffect(() => {
        fetchDataDetail(id)
    }, [fetchDataDetail, id])

    return (
        <>
            <Dialog
                fullWidth
                open={show}
                maxWidth='md'
                scroll='body'
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogContent sx={{ pb: 6, px: { xs: 8, sm: 15 }, pt: { xs: 8, sm: 12.5 }, position: 'relative' }}>
                        <IconButton
                            size='small'
                            onClick={handleClose}
                            sx={{ position: 'absolute', right: '1rem', top: '1rem' }}
                        >
                            <Icon icon='mdi:close' />
                        </IconButton>

                        <Box sx={{ mb: 8, textAlign: 'center' }}>
                            <Typography
                                variant='h6'
                                sx={{ mb: 3, lineHeight: '2rem', textTransform: 'uppercase' }}
                            >
                                <Translations text={id ? 'Category.Edit' : 'Category.Create'} />
                            </Typography>
                        </Box>

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

                                <FormControl fullWidth>
                                    <Controller
                                        name='name'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value || ''}
                                                id='name'
                                                onChange={onChange}
                                                onKeyUp={slugify}
                                                error={Boolean(errors.name)}
                                                aria-describedby='validation-schema-name'
                                            />
                                        )}
                                    />
                                    {errors.name && (
                                        <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            id='validation-schema-name'
                                        >
                                            {errors.name.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
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

                                <FormControl fullWidth>
                                    <Controller
                                        name='parent_id'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                value={value || ''}
                                                onChange={onChange}
                                                labelId='parent_id'
                                                id='parent_id'
                                                error={Boolean(errors.parent_id)}
                                                aria-describedby='validation-schema-parent_id'
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
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                            >
                                <InputLabel
                                    htmlFor='description'
                                    className='text-label'
                                >
                                    <Translations text='Description' />
                                </InputLabel>

                                <FormControl fullWidth>
                                    <Controller
                                        name='description'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value || ''}
                                                id='description'
                                                onChange={onChange}
                                                error={Boolean(errors.description)}
                                                aria-describedby='validation-schema-description'
                                            />
                                        )}
                                    />
                                    {errors.description && (
                                        <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            id='validation-schema-description'
                                        >
                                            {errors.description.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
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

                                <FormControl fullWidth>
                                    <Controller
                                        name='status'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                value={value || ''}
                                                onChange={onChange}
                                                labelId='status'
                                                id='status'
                                                error={Boolean(errors.status)}
                                                aria-describedby='validation-schema-status'
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
                                        )}
                                    />
                                </FormControl>
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

                                <FormControl fullWidth>
                                    <Controller
                                        name='popular'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <Select
                                                value={value || ''}
                                                onChange={onChange}
                                                labelId='popular'
                                                id='popular'
                                                error={Boolean(errors.popular)}
                                                aria-describedby='validation-schema-popular'
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
                                        )}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                            >
                                <InputLabel
                                    htmlFor='meta_title'
                                    className='text-label'
                                >
                                    <Translations text='Meta.Title' />
                                </InputLabel>

                                <FormControl fullWidth>
                                    <Controller
                                        name='meta_title'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value || ''}
                                                onChange={onChange}
                                                id='meta_title'
                                                multiline
                                                rows={3}
                                                error={Boolean(errors.meta_title)}
                                                aria-describedby='validation-schema-meta_title'
                                            />
                                        )}
                                    />
                                    {errors.meta_title && (
                                        <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            id='validation-schema-meta_title'
                                        >
                                            {errors.meta_title.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                            >
                                <InputLabel
                                    htmlFor='meta_keyword'
                                    className='text-label'
                                >
                                    <Translations text='Meta.Keyword' />
                                </InputLabel>

                                <FormControl fullWidth>
                                    <Controller
                                        name='meta_keyword'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value || ''}
                                                onChange={onChange}
                                                id='meta_keyword'
                                                multiline
                                                rows={3}
                                                error={Boolean(errors.meta_keyword)}
                                                aria-describedby='validation-schema-meta_keyword'
                                            />
                                        )}
                                    />
                                    {errors.meta_keyword && (
                                        <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            id='validation-schema-meta_keyword'
                                        >
                                            {errors.meta_keyword.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                            >
                                <InputLabel
                                    htmlFor='meta_description'
                                    className='text-label'
                                >
                                    <Translations text='Meta.Description' />
                                </InputLabel>

                                <FormControl fullWidth>
                                    <Controller
                                        name='meta_description'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value || ''}
                                                onChange={onChange}
                                                id='meta_description'
                                                multiline
                                                rows={3}
                                                error={Boolean(errors.meta_description)}
                                                aria-describedby='validation-schema-meta_description'
                                            />
                                        )}
                                    />
                                    {errors.meta_description && (
                                        <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            id='validation-schema-meta_description'
                                        >
                                            {errors.meta_description.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>
                        </Grid>
                    </DialogContent>

                    <DialogActions sx={{ pb: { xs: 8, sm: 12.5 }, justifyContent: 'center' }}>
                        <Button
                            variant='contained'
                            sx={{ mr: 2 }}
                            type='submit'
                        >
                            <Translations text='Btn.Save' />
                        </Button>

                        <Button
                            variant='outlined'
                            color='secondary'
                            onClick={handleClose}
                        >
                            <Translations text='Btn.Cancel' />
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default SaveCategoryDialog

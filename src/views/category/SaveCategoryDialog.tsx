// ** React Imports
import { KeyboardEvent } from 'react'

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

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Types Imports
import { AppDispatch } from 'src/store'

// ** Actions Imports
import { create } from 'src/store/apps/category'

type Props = {
    show: boolean
    setShow: (val: boolean) => void
}
interface FormData {
    name: string
    slug: string
    description?: string
    image_uri?: string
    parent_id?: string
    status?: number
    popular?: number
    meta_title?: string
    meta_keyword?: string
    meta_description?: string
}

const defaultValues = {
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
        .max(160, obj => <Translations
            text='Description'
            message='Validate.Max'
            strLength={obj.max}
        />),
    meta_title: yup
        .string()
        .max(60, obj => <Translations
            text='Meta.Title'
            message='Validate.Max'
            strLength={obj.max}
        />),
    meta_keyword: yup
        .string()
        .max(60, obj => <Translations
            text='Meta.Keyword'
            message='Validate.Max'
            strLength={obj.max}
        />),
    meta_description: yup
        .string()
        .max(160, obj => <Translations
            text='Meta.Description'
            message='Validate.Max'
            strLength={obj.max}
        />)
})

const SaveCategoryDialog = (props: Props) => {
    // ** Props
    const { show, setShow } = props

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()
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
        reset(defaultValues)
    }

    const onSubmit = (data: FormData) => {
        dispatch(create({ ...data }))
        toast.success(<Translations text="Message.Success" />)
        handleClose()
    }

    const slugify = (event: KeyboardEvent<HTMLInputElement>) => setValue('slug', StrSlugify((event.target as HTMLInputElement).value))

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
                                <Translations text='Category.Create' />
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
                                                value={value}
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

                                <Select
                                    fullWidth
                                    labelId='parent_id'
                                    id='parent_id'
                                >
                                    <MenuItem value='Status'>Status</MenuItem>
                                    <MenuItem value='Active'>Active</MenuItem>
                                    <MenuItem value='Inactive'>Inactive</MenuItem>
                                    <MenuItem value='Suspended'>Suspended</MenuItem>
                                </Select>
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
                                                value={value}
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

                                <Select
                                    fullWidth
                                    labelId='status'
                                    id='status'
                                >
                                    {Object.keys(OptionStatus).map(key => (
                                        <MenuItem
                                            key={key}
                                            value={key}
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
                                    labelId='popular'
                                    id='popular'
                                >
                                    {Object.keys(OptionPopular).map(key => (
                                        <MenuItem
                                            key={key}
                                            value={key}
                                        >
                                            {OptionPopular[Number(key)].title}
                                        </MenuItem>
                                    ))}
                                </Select>
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
                                                value={value}
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
                                                value={value}
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
                                                value={value}
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

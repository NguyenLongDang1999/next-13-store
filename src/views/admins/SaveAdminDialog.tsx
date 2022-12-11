// ** React Imports
import { MouseEvent, useCallback, useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Dialog from '@mui/material/Dialog'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputAdornment from '@mui/material/InputAdornment'
import OutlinedInput from '@mui/material/OutlinedInput'

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
import { request } from 'src/utils/request'
import { API, ROLE } from 'src/utils/enums'

// ** Store Imports
import { useDispatch } from 'react-redux'

// ** Types Imports
import { AppDispatch } from 'src/store'
import { AdminInputType } from 'src/types/apps/AdminTypes'

// ** Actions Imports
import { create, update } from 'src/store/apps/admins'

type Props = {
    id?: string
    setId: (val: string) => void
    show: boolean
    setShow: (val: boolean) => void
}

interface State {
    password: string
    showPassword: boolean
}

const defaultValues = {
    id: '',
    name: '',
    phone: '',
    email: '',
    password: '',
    confirm_password: '',
    role: ROLE.ADMINS,

}

const schema = yup.object().shape({
    name: yup
        .string()
        .nullable(true)
        .min(3, obj => <Translations
            text='Users.Name'
            message='Validate.Min'
            strLength={obj.min}
        />)
        .max(50, obj => <Translations
            text='Users.Name'
            message='Validate.Max'
            strLength={obj.max}
        />)
        .required(() => <Translations
            text='Users.Name'
            message='Validate.Required'
        />),
    email: yup
        .string()
        .nullable(true)
        .min(3, obj => <Translations
            text='Users.Email'
            message='Validate.Min'
            strLength={obj.min}
        />)
        .max(50, obj => <Translations
            text='Users.Email'
            message='Validate.Max'
            strLength={obj.max}
        />)
        .required(() => <Translations
            text='Users.Email'
            message='Validate.Required'
        />),
    phone: yup
        .string()
        .nullable(true)
        .min(3, obj => <Translations
            text='Users.Phone'
            message='Validate.Min'
            strLength={obj.min}
        />)
        .max(50, obj => <Translations
            text='Users.Phone'
            message='Validate.Max'
            strLength={obj.max}
        />)
        .required(() => <Translations
            text='Users.Phone'
            message='Validate.Required'
        />),
    password: yup
        .string()
        .nullable(true)
        .min(6, obj => <Translations
            text='Users.Password'
            message='Validate.Min'
            strLength={obj.min}
        />)
        .max(20, obj => <Translations
            text='Users.Password'
            message='Validate.Max'
            strLength={obj.max}
        />)
        .required(() => <Translations
            text='Users.Password'
            message='Validate.Required'
        />),
    confirm_password: yup
        .string()
        .nullable(true)
        .min(6, obj => <Translations
            text='Users.ConfirmPassword'
            message='Validate.Min'
            strLength={obj.min}
        />)
        .max(20, obj => <Translations
            text='Users.ConfirmPassword'
            message='Validate.Max'
            strLength={obj.max}
        />)
        .required(() => <Translations
            text='Users.ConfirmPassword'
            message='Validate.Required'
        />)
        .oneOf([yup.ref('password')], () => <Translations
            text='Users.ConfirmPassword'
            message='Validate.Match'
        />)
})

const SaveCategoryDialog = (props: Props) => {
    // ** Props
    const { show, setShow, id, setId } = props

    // ** State
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false
    })

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const {
        reset,
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema)
    })

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }

    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
    }

    const handleClose = () => {
        setShow(false)
        setId('')
        reset(defaultValues)
    }

    const onSubmit = (data: AdminInputType) => {
        id ? dispatch(update({ ...data })) : dispatch(create({ ...data }))
        toast.success(<Translations text="Message.Success" />)
        handleClose()
    }

    const fetchDataDetail = useCallback(async (id?: string) => {
        if (show && id) {
            const res = await request.get(API.ADMINS + '/' + id)
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
                scroll='paper'
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
                                <Translations text={id ? 'Admins.Edit' : 'Admins.Create'} />
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
                                    <Translations text='Users.Name' />
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
                                    htmlFor='phone'
                                    className='text-label'
                                >
                                    <Translations text='Users.Phone' />
                                </InputLabel>

                                <FormControl fullWidth>
                                    <Controller
                                        name='phone'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value || ''}
                                                id='phone'
                                                onChange={onChange}
                                                error={Boolean(errors.phone)}
                                                aria-describedby='validation-schema-phone'
                                            />
                                        )}
                                    />
                                    {errors.phone && (
                                        <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            id='validation-schema-phone'
                                        >
                                            {errors.phone.message}
                                        </FormHelperText>
                                    )}
                                </FormControl>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                            >
                                <InputLabel
                                    htmlFor='email'
                                    className='text-label'
                                >
                                    <Translations text='Users.Email' />
                                </InputLabel>

                                <FormControl fullWidth>
                                    <Controller
                                        name='email'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value || ''}
                                                id='email'
                                                onChange={onChange}
                                                error={Boolean(errors.email)}
                                                aria-describedby='validation-schema-email'
                                            />
                                        )}
                                    />
                                    {errors.email && (
                                        <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            id='validation-schema-email'
                                        >
                                            {errors.email.message}
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
                                    htmlFor='password'
                                    className='text-label'
                                >
                                    <Translations text='Users.Password' />
                                </InputLabel>

                                <FormControl fullWidth>
                                    <Controller
                                        name='password'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <OutlinedInput
                                                value={value || ''}
                                                id='password'
                                                onChange={onChange}
                                                error={Boolean(errors.password)}
                                                type={values.showPassword ? 'text' : 'password'}
                                                aria-describedby='validation-schema-password'
                                                endAdornment={
                                                    <InputAdornment position='end'>
                                                        <IconButton
                                                            edge='end'
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            aria-label='toggle password visibility'
                                                        >
                                                            <Icon icon={values.showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'} />
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        )}
                                    />
                                    {errors.password && (
                                        <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            id='validation-schema-password'
                                        >
                                            {errors.password.message}
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
                                    htmlFor='confirm_password'
                                    className='text-label'
                                >
                                    <Translations text='Users.ConfirmPassword' />
                                </InputLabel>

                                <FormControl fullWidth>
                                    <Controller
                                        name='confirm_password'
                                        control={control}
                                        render={({ field: { value, onChange } }) => (
                                            <TextField
                                                value={value || ''}
                                                id='confirm_password'
                                                onChange={onChange}
                                                error={Boolean(errors.confirm_password)}
                                                aria-describedby='validation-schema-confirm_password'
                                                type='password'
                                            />
                                        )}
                                    />
                                    {errors.confirm_password && (
                                        <FormHelperText
                                            sx={{ color: 'error.main' }}
                                            id='validation-schema-confirm_password'
                                        >
                                            {errors.confirm_password.message}
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

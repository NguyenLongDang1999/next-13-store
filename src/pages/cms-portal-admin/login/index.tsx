// ** React Imports
import { MouseEvent, ReactNode, useState } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
import { styled } from '@mui/material/styles'
import MuiCard, { CardProps } from '@mui/material/Card'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'
import Translations from 'src/layouts/components/Translations'

// ** Third Party Imports
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

interface State {
    password: string
    showPassword: boolean
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
    [theme.breakpoints.up('sm')]: { width: 450 }
}))

const defaultValues = {
    email: '',
    password: ''
}

const schema = yup.object().shape({
    email: yup
        .string()
        .nullable(true)
        .email(() => <Translations
            text='Auth.Email'
            message='Validate.Email'
        />)
        .min(3, obj => <Translations
            text='Auth.Email'
            message='Validate.Min'
            strLength={obj.min}
        />)
        .max(50, obj => <Translations
            text='Auth.Email'
            message='Validate.Max'
            strLength={obj.max}
        />)
        .required(() => <Translations
            text='Auth.Email'
            message='Validate.Required'
        />),
    password: yup
        .string()
        .nullable(true)
        .min(6, obj => <Translations
            text='Auth.Password'
            message='Validate.Min'
            strLength={obj.min}
        />)
        .max(20, obj => <Translations
            text='Auth.Password'
            message='Validate.Max'
            strLength={obj.max}
        />)
        .required(() => <Translations
            text='Auth.Password'
            message='Validate.Required'
        />)
})

const Login = () => {
    // ** State
    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false
    })

    // ** Hook
    const {
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

    const onSubmit = () => {
        console.log('?')
    }

    return (
        <Box className='content-center'>
            <Card sx={{ zIndex: 1 }}>
                <CardContent>
                    <Box sx={{ mb: 6 }}>
                        <Typography
                            variant='h5'
                            sx={{ mb: 1.5, fontWeight: 600, letterSpacing: '0.18px', textAlign: 'center' }}
                        >
                            <Translations text='Auth.Title' />
                        </Typography>
                    </Box>

                    <form
                        noValidate
                        autoComplete='off'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Grid
                            container
                            spacing={6}
                        >
                            <Grid
                                item
                                xs={12}
                            >
                                <InputLabel
                                    htmlFor='email'
                                    className='text-label'
                                >
                                    <Translations text='Auth.Email' />
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
                                xs={12}
                            >
                                <InputLabel
                                    htmlFor='password'
                                    className='text-label'
                                >
                                    <Translations text='Auth.Password' />
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
                        </Grid>

                        <Button
                            fullWidth
                            size='large'
                            type='submit'
                            variant='contained'
                            sx={{ mt: 4 }}
                        >
                            <Translations text='Auth.Login' />
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </Box >
    )
}

Login.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

export default Login

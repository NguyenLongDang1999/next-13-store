// ** React Imports
import { KeyboardEvent, useCallback, useEffect, ElementType, ChangeEvent, useState } from 'react'

// ** MUI Imports
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Select from '@mui/material/Select'
import Dialog from '@mui/material/Dialog'
import Button, { ButtonProps } from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'

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

const ImgStyled = styled('img')(({ theme }) => ({
    width: 120,
    height: 120,
    marginRight: theme.spacing(5),
    borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)<ButtonProps & { component?: ElementType; htmlFor?: string }>(({ theme }) => ({
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        textAlign: 'center'
    }
}))

const UploadImageCategory = (props: Props) => {
    // ** State
    const [imgSrc, setImgSrc] = useState<string>('/images/avatars/1.png')
    const [inputValue, setInputValue] = useState<string>('')

    // ** Props
    const { show, setShow, id, setId } = props

    // ** Hooks
    const dispatch = useDispatch<AppDispatch>()

    const handleInputImageChange = (file: ChangeEvent) => {
        const reader = new FileReader()
        const { files } = file.target as HTMLInputElement

        if (files && files.length !== 0) {
            reader.onload = () => setImgSrc(reader.result as string)
            reader.readAsDataURL(files[0])

            if (reader.result !== null) {
                setInputValue(reader.result as string)
            }
        }
    }

    const handleClose = () => {
        setShow(false)
        setId('')
    }

    const onSubmit = (data: CategoryInputType) => {
        id ? dispatch(update({ ...data })) : dispatch(create({ ...data }))
        toast.success(<Translations text="Message.Success" />)
        handleClose()
    }

    return (
        <>
            <Dialog
                fullWidth
                open={show}
                maxWidth='md'
                scroll='paper'
                onClose={handleClose}
            >
                <form onSubmit={() => onSubmit}>
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
                                sm={12}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                    <ImgStyled
                                        src={imgSrc}
                                        alt='Category Image'
                                    />

                                    <div>
                                        <ButtonStyled
                                            component='label'
                                            variant='contained'
                                            htmlFor='account-settings-upload-image'
                                        >
                                            <Translations text='Upload.Btn' />

                                            <input
                                                hidden
                                                type='file'
                                                value={inputValue}
                                                accept='image/png, image/jpeg'
                                                onChange={handleInputImageChange}
                                                id='account-settings-upload-image'
                                            />
                                        </ButtonStyled>
                                    </div>
                                </Box>
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

export default UploadImageCategory

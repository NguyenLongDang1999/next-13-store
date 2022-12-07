// ** Third Party Import
import { useTranslation } from 'react-i18next'

interface Props {
    text: string
    message?: string
    strLength?: number
}

const Translations = ({ text, message, strLength }: Props) => {
    // ** Hook
    const { t } = useTranslation()

    return <>{`${t(text)} ${t(message ?? '', { strLength })}`}</>
}

export default Translations

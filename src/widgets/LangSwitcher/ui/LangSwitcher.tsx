import {FC} from 'react'

import styles from './LangSwitcher.module.scss'
import {classNames} from "shared/lib/helpers/classNames/classNames";
import {useTranslation} from "react-i18next";
import {Button} from "shared/ui/Button/Button";


interface LangSwitcherProps {
    className?: string
}

export const LangSwitcher: FC<LangSwitcherProps> = ({className}) => {
    const {t, i18n} = useTranslation()
    const toggleLang = async () => {
        await i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru')
    }
    return (
            <Button
                className={classNames(styles.LangSwitcher, {}, [className])}
                onClick={toggleLang}
            >
                {t('Язык')}
            </Button>
    )
}


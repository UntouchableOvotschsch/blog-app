import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { infinityToggle } from '@/shared/lib/helpers/infinityToggle/infinityToggle';
import { Button, ThemeButton } from '@/shared/ui/Button';

interface LangSwitcherProps {
    className?: string
    short?: boolean
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const toggleLang = async () => {
        await i18n.changeLanguage(infinityToggle(['en', 'ru'], i18n.language));
    };
    return (
        <Button
            className={classNames('', {}, [className])}
            onClick={toggleLang}
            theme={ThemeButton.CLEAR}
        >
            {short ? t('Короткий язык') : t('Язык')}
        </Button>
    );
});

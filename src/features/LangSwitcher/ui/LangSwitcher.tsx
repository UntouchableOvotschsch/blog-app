import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { infinityToggle } from '@/shared/lib/helpers/infinityToggle/infinityToggle';
import { Button as ButtonDeprecated, ThemeButton } from '@/shared/ui/deprecated/Button';
import { Button } from '@/shared/ui/Button';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

interface LangSwitcherProps {
    className?: string;
    short?: boolean;
}

export const LangSwitcher = memo(({ className, short }: LangSwitcherProps) => {
    const { t, i18n } = useTranslation();
    const toggleLang = async () => {
        await i18n.changeLanguage(infinityToggle(['en', 'ru'], i18n.language));
    };
    return (
        <ToggleFeatureComponent
            /* eslint-disable-next-line i18next/no-literal-string */
            name='isAppRedesigned'
            on={
                <Button className={classNames('', {}, [className])} onClick={toggleLang} theme='clear'>
                    {short ? t('Короткий язык') : t('Язык')}
                </Button>
            }
            off={
                <ButtonDeprecated
                    className={classNames('', {}, [className])}
                    onClick={toggleLang}
                    theme={ThemeButton.CLEAR}>
                    {short ? t('Короткий язык') : t('Язык')}
                </ButtonDeprecated>
            }
        />
    );
});

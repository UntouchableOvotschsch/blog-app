import { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { Button } from '@/shared/ui/Button/Button';
import Text, { TextSize, ThemeText } from '@/shared/ui/Text/Text';
import styles from './PageError.module.scss';

interface PageErrorProps {
    className?: string
}

const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
};

export const PageError = memo(({ className }: PageErrorProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.PageError, {}, [className])}>
            <Text title={t('Произошла непредвиденная ошибка')} theme={ThemeText.ERROR} />
            <Button onClick={reloadPage}>
                <Text text={t('Обновить страницу')} size={TextSize.L} />
            </Button>
        </div>
    );
});

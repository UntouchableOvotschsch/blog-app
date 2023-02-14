import { FC } from 'react';

import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import styles from './PageError.module.scss';

interface PageErrorProps {
    className?: string
}

const reloadPage = () => {
    // eslint-disable-next-line no-restricted-globals
    location.reload();
};

export const PageError: FC<PageErrorProps> = ({ className }) => {
    const { t } = useTranslation();

    return (
        <div className={classNames(styles.PageError, {}, [className])}>
            <p>{t('Произошла непредвиденная ошибка')}</p>
            <Button onClick={reloadPage}>
                {t('Обновить страницу')}
            </Button>
        </div>
    );
};

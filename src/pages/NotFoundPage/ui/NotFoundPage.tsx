import { FC } from 'react';

import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { PageWrapper } from '@/widgets/PageWrapper';
import styles from './NotFoundPage.module.scss';

interface NotFoundPageProps {
    className?: string
}

export const NotFoundPage: FC<NotFoundPageProps> = ({ className }) => {
    const { t } = useTranslation();
    return (
        <PageWrapper>
            <div className={classNames(styles.NotFoundPage, {}, [className])}>
                {t('Страница не найдена')}
            </div>
        </PageWrapper>
    );
};

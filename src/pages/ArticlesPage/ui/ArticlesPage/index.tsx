import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo } from 'react';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.ArticlesPage, {}, [className])}>
            <p>{t('ArticlePage')}</p>
        </div>
    );
});

export default ArticlesPage;

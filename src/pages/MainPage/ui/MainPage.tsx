import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { PageWrapper } from '@/widgets/PageWrapper';

const MainPage: FC = () => {
    const { t } = useTranslation('main');
    return (
        <PageWrapper>
            {t('Главная страница')}
            <BugButton />
        </PageWrapper>
    );
};

export default MainPage;

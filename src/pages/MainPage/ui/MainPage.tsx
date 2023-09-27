import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import PageWrapper from '@/shared/ui/PageWrapper';

const MainPage: FC = () => {
    const { t } = useTranslation('main');

    return (
        <PageWrapper>
            {t('Главная страница')}
        </PageWrapper>
    );
};

export default MainPage;

import { FC } from 'react';

import { useTranslation } from 'react-i18next';

import PageWrapper from '@/shared/ui/deprecated/PageWrapper';

const AboutPage: FC = () => {
    const { t } = useTranslation('about');

    return <PageWrapper data-testid='AboutPage'>{t('О сайте')}</PageWrapper>;
};

export default AboutPage;

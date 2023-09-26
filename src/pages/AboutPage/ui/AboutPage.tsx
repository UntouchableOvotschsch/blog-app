import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import PageWrapper from '@/shared/ui/PageWrapper';

const AboutPage: FC = () => {
    const { t } = useTranslation('about');

    return (
        <PageWrapper>
            {t('О сайте')}
        </PageWrapper>
    );
};

export default AboutPage;

import { useTranslation } from 'react-i18next';
import { PageWrapper } from '@/widgets/PageWrapper';
import Text from '@/shared/ui/Text/Text';

const ForbiddenPage = () => {
    const { t } = useTranslation('forbiddenPage');
    return (
        <PageWrapper>
            <Text title={t('У вас нет доступа к этой странице')} />
        </PageWrapper>
    );
};

export default ForbiddenPage;

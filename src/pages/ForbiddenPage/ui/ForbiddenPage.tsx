import { useTranslation } from 'react-i18next';

import PageWrapper from '@/shared/ui/PageWrapper';
import Text from '@/shared/ui/Text';

const ForbiddenPage = () => {
    const { t } = useTranslation('forbiddenPage');
    return (
        <PageWrapper data-testid='ForbiddenPage'>
            <Text title={t('У вас нет доступа к этой странице')} />
        </PageWrapper>
    );
};

export default ForbiddenPage;

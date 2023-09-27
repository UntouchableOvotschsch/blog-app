import { useTranslation } from 'react-i18next';

import PageWrapper from '@/shared/ui/PageWrapper';
import Text from '@/shared/ui/Text';

const AdminPage = () => {
    const { t } = useTranslation('adminPage');
    return (
        <PageWrapper>
            <Text title={t('Админка')} />
        </PageWrapper>
    );
};

export default AdminPage;

import { useTranslation } from 'react-i18next';

import PageWrapper from '@/shared/ui/deprecated/PageWrapper';
import Text from '@/shared/ui/deprecated/Text';

const AdminPage = () => {
    const { t } = useTranslation('adminPage');
    return (
        <PageWrapper data-testid='AdminPage'>
            <Text title={t('Админка')} />
        </PageWrapper>
    );
};

export default AdminPage;

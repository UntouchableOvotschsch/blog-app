import { FC, useEffect, useState } from 'react';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';

// Тестовый компонент для ErrorBoundary
export const BugButton: FC = () => {
    const [error, setError] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (error) {
            throw new Error();
        }
    }, [error]);
    return (
        <Button
            onClick={() => setError((prev) => !prev)}
        >
            {t('Кинуть ошибку')}
        </Button>
    );
};

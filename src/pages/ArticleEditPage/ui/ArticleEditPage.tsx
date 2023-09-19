import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Text from '@/shared/ui/Text/Text';

interface ArticleEditPageProps {
    className?: string;
}

const ArticleEditPage = ({ className }: ArticleEditPageProps) => {
    const { t } = useTranslation();
    const { id } = useParams<{id: string}>();

    if (id) {
        return (
            <div className={classNames('', {}, [className])}>
                <Text title={t(`Редактирование статьи с id${id}`)} />
            </div>
        );
    }

    return (
        <div className={classNames('', {}, [className])}>
            <Text title={t('Создание новой статьи')} />
        </div>
    );
};

export default ArticleEditPage;

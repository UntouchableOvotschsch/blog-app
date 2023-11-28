import { useTranslation } from 'react-i18next';

import { SortField, SortOrder, SortSelector } from '@/features/SortSelector';
import { ArticleTypes } from '@/entities/Article';
import Card from '@/shared/ui/Card';
import { ArticleTypeTabs } from '@/features/ArticleTypeTabs';
import Input from '@/shared/ui/Input';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';

import styles from './ArticleFilters.module.scss';

interface ArticleFiltersProps {
    className?: string;
    searchValue: string;
    changeSearchValue: (value: string) => void;
    sortField: SortField;
    changeSortField: (value: SortField) => void;
    sortOrder: SortOrder;
    changeSortOrder: () => void;
    articleActiveTypes: ArticleTypes[];
    articleActiveTypesHandler: (value: ArticleTypes[]) => void;
}

const ArticleFilters = (props: ArticleFiltersProps) => {
    const {
        className,
        searchValue,
        changeSearchValue,
        sortOrder,
        changeSortOrder,
        sortField,
        changeSortField,
        articleActiveTypes,
        articleActiveTypesHandler,
    } = props;

    const { t } = useTranslation('article');

    return (
        <Card className={classNames(styles.container, {}, [className])} padding='16' rounded>
            <VStack gap='32' maxWidth align='start'>
                <Input
                    value={searchValue}
                    placeholder={t('Поиск')}
                    onChange={changeSearchValue}
                    align='left'
                    typeVariant='search'
                />
                <ArticleTypeTabs activeTypes={articleActiveTypes} typeHandler={articleActiveTypesHandler} />
                <SortSelector
                    sortOrder={sortOrder}
                    sortField={sortField}
                    changeSortField={changeSortField}
                    changeSortOrder={changeSortOrder}
                />
            </VStack>
        </Card>
    );
};

export default ArticleFilters;

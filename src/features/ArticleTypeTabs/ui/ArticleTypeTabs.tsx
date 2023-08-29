import React, { useCallback } from 'react';
import { ArticleTypes } from 'entities/Article';
import Tabs, { TabItem } from 'shared/ui/Tabs';
import { useTranslation } from 'react-i18next';

interface ArticleTypeTabsProps {
    className?: string
    activeTypes: ArticleTypes[]
    typeHandler: (type: ArticleTypes[]) => void
}

const ArticleTypeTabs = (props: ArticleTypeTabsProps) => {
    const { activeTypes, typeHandler, className } = props;
    const { t } = useTranslation('article');

    const types: TabItem<ArticleTypes>[] = [
        {
            value: ArticleTypes.ALL,
            content: t('Все статьи'),
        },
        {
            value: ArticleTypes.IT,
            content: t('Айти'),
        },
        {
            value: ArticleTypes.ECONOMICS,
            content: t('Экономика'),
        },
        {
            value: ArticleTypes.SCIENCE,
            content: t('Наука'),
        },
    ];

    const tabHandler = useCallback((newType: TabItem<ArticleTypes>) => {
        if (newType.value !== ArticleTypes.ALL) {
            if (activeTypes.includes(newType.value)) {
                const newForm = activeTypes.filter((type) => (
                    type !== newType.value && type !== ArticleTypes.ALL
                ));
                typeHandler(newForm.length === 0 ? [ArticleTypes.ALL] : newForm);
            } else {
                const newForm = [...activeTypes, newType.value].filter((type) => (
                    type !== ArticleTypes.ALL
                ));
                typeHandler(newForm.length === 0 ? [ArticleTypes.ALL] : newForm);
            }
        } else {
            typeHandler([ArticleTypes.ALL]);
        }
    }, [activeTypes, typeHandler]);

    return (
        <Tabs
            className={className ?? ''}
            tabs={types}
            activeTabs={activeTypes}
            tabHandler={tabHandler}
        />
    );
};

export default ArticleTypeTabs;

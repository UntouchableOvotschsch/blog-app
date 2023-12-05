import React from 'react';

import { useTranslation } from 'react-i18next';

import { HStack, VStack } from '@/shared/ui/Stack';
import { typedMemo } from '@/shared/lib/helpers/typedMemo';
import { User } from '@/entities/User';
import Avatar from '@/shared/ui/Avatar';
import Text from '@/shared/ui/Text';
import { AppLink } from '@/shared/ui/AppLink';
import { getRouteArticleEditPage } from '@/shared/const/router';

interface ArticleInfoProps {
    className?: string;
    user?: User;
    createdAt?: string;
    views?: number;
    articleId: string;
    isEditable?: boolean;
}

const ArticleInfo = typedMemo((props: ArticleInfoProps) => {
    const { t } = useTranslation();
    const { createdAt, isEditable, views, user, articleId, className } = props;

    return (
        <VStack className={className} align='start' gap='32'>
            <HStack gap='8'>
                <Avatar avatar={user?.avatar} alt={user?.username ?? 'Аватар пользователя'} width='32' height='32' />
                <Text text={user?.username} bold />
                <Text text={createdAt} />
            </HStack>
            {/* TODO сделать плюральные переводы */}
            <Text text={t(`${views} просмотров`)} />
            {isEditable && (
                <AppLink to={getRouteArticleEditPage(articleId)} variant='outline'>
                    <Text text={t('Редактировать')} />
                </AppLink>
            )}
        </VStack>
    );
});

export default ArticleInfo;

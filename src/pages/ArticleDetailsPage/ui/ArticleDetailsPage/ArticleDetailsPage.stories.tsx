import type { Meta, StoryObj } from '@storybook/react';
import { Themes } from 'app/providers/ThemeProvider';
import { articlesArrayTemplate, articleTemplate } from 'entities/Article';
import { UserRoles } from 'entities/User';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { PageWrapper } from 'widgets/PageWrapper';
import ArticleDetailsPage from './index';

const meta: Meta<typeof ArticleDetailsPage> = {
    title: 'pages/ArticleDetailsPage',
    component: ArticleDetailsPage,
    decorators: [
        ThemeDecorator(Themes.LIGHT),
        StoreDecorator({
            articleComments: {
                isLoading: false,
                ids: [1, 2],
                entities: {
                    1: {
                        id: '1',
                        text: 'Крутая статья',
                        articleId: '1',
                        user: {
                            id: '1',
                            roles: [
                                UserRoles.ADMIN,
                            ],
                            username: 'admin',
                            // eslint-disable-next-line max-len
                            avatar: 'https://sun9-53.userapi.com/impg/Uv1iXOqHQ01p0t_9DosTyZ8xQ7XLTBmrmetw_w/N05oIgf44j0.jpg?size=2560x1707&quality=96&sign=af5a1bb22fdd9df08551bf2b4322a067&c_uniq_tag=5G-EKJZpc7rD0ixPEKBrzR81EReq-A4tMp4clyJWhCw&type=album',
                        },
                    },
                    2: {
                        id: '2',
                        text: 'Крутая статья',
                        articleId: '1',
                        user: {
                            id: '2',
                            roles: [
                                UserRoles.USER,
                            ],
                            username: 'testUser',
                            // eslint-disable-next-line max-len
                            avatar: 'https://icon-library.com/images/avatar-png-icon/avatar-png-icon-13.jpg',
                        },
                    },
                },
            },
        }),
    ],
    parameters: {
        mockData: [
            {
                url: `${__API_URL__}/articles/1`,
                method: 'GET',
                status: 200,
                response: articleTemplate,
            },
            {
                url: `${__API_URL__}/articles?_expand=user&_limit=7`,
                method: 'GET',
                status: 200,
                response: articlesArrayTemplate,
            },
        ],
    },
};

export default meta;
type Story = StoryObj<typeof ArticleDetailsPage>;

export const Normal: Story = {
    render: () => (
        <PageWrapper>
            <ArticleDetailsPage />
        </PageWrapper>
    ),
};

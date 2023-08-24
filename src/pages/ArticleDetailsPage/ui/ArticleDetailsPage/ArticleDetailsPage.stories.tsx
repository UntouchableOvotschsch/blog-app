import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator';
import { Themes } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator';
import { articleTemplate } from 'entities/Article';
import { UserRoles } from 'entities/User';
import ArticleDetailsPage from './index';

export default {
    title: 'pages/ArticleDetailsPage',
    component: ArticleDetailsPage,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = (args) => (
    <ArticleDetailsPage {...args} />
);

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [
    ThemeDecorator(Themes.LIGHT),
    StoreDecorator({
        articlesDetailsPage: {
            articleDetails: {
                article: articleTemplate,
                isLoading: false,
            },
            articleDetailsComments: {
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
            articleDetailsRecommendations: {
                ids: [1, 2, 3, 4, 5],
                entities: {
                    1: {
                        ...articleTemplate,
                    },
                    2: {
                        ...articleTemplate, id: '2',
                    },
                    3: {
                        ...articleTemplate, id: '3',
                    },
                    4: {
                        ...articleTemplate, id: '4',
                    },
                    5: {
                        ...articleTemplate, id: '5',
                    },
                },
            },
        },
    }),
];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
    ThemeDecorator(Themes.DARK),
    StoreDecorator({
        articlesDetailsPage: {
            articleDetails: {
                article: articleTemplate,
                isLoading: false,
            },
            articleDetailsComments: {
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
            articleDetailsRecommendations: {
                ids: [1, 2, 3, 4, 5],
                entities: {
                    1: {
                        ...articleTemplate,
                    },
                    2: {
                        ...articleTemplate, id: '2',
                    },
                    3: {
                        ...articleTemplate, id: '3',
                    },
                    4: {
                        ...articleTemplate, id: '4',
                    },
                    5: {
                        ...articleTemplate, id: '5',
                    },
                },
            },
        },
    }),
];

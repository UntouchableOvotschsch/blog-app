## Запуск проекта

```
npm install - устанавка зависимостей
npm start - запуск frontend проекта в режиме разработки на webpack
npm run start:server - запуск backend сервера
npm run start:dev - запуск frontend проекта в режиме разработки на webpack и backend сервера
npm run start:dev:vite - запуск frontend проекта в режиме разработки на vite и backend сервера
```
## Скрипты

- `npm run start` - запуск frontend проекта в режиме разработки на webpack
- `npm run start:server` - запуск backend сервера
- `npm run start:dev` - запуск frontend проекта в режиме разработки на webpack и backend сервера
- `npm run start:dev:vite` - запуск frontend проекта в режиме разработки на vite и backend сервера
- `npm run build:prod` - сборка проекта в production режиме на webpack
- `npm run build:prod:vite` - сборка проекта в production режиме на vite
- `npm run build:dev` - сборка проекта в development режиме на webpack (без минимизации)
- `npm run lint:ts` - проверка ts/x файлов линтером 
- `npm run lint:ts:errors` - проверка ts/x файлов линтером только с выводом ошибок
- `npm run lint:ts:fix` - исправление ts/x файлов линтером
- `npm run lint:scss` - проверка scss файлов style линтером
- `npm run lint:scss:fix` - исправление scss файлов style линтером
- `npm run test:unit` - запуск unit тестов с jest
- `npm run test:ui` - запуск скриншотных тестов с loki
- `npm run test:ui:approve` - подтверждение новых скриншотов 
- `npm run test:ui:ci` - запуск скришотных тестов c loki для CI
- `npm run storybook` - запуск витрины компонентов в storybook
- `npm run storybook:build` - сборка storybook билда
- `npm run test:ui:report` генерация отчета для скриншотных тестов
- `npm run visual:report:json` - генерация json отчета для скриншотных тестов
- `npm run visual:report:html` - генерация HTML отчета для скриншотных тестов
- `npm run prepare` - запуск pre-commit хуков

----

## Архитектура проекта

Проект написан в соответствии с методологией Feature sliced design

Ссылка на документацию - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

----

## Работа с переводами

В проекте используется библиотека i18next для работы с переводами.
Файлы с переводами хранятся в public/locales.

Документация i18next - [https://react.i18next.com/](https://react.i18next.com/)

----

## Тесты

В проекте используются 4 вида тестов:
1) Обычные unit тесты на jest - `npm run test:unit`
2) Тесты на компоненты с React testing library -`npm run test:unit`
3) Скриншотное тестирование с loki `npm run test:ui`
4) e2e тестирование с Cypress `npm run test:e2e`

----

## Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

Также для строгого контроля главных архитектурных принципов используется собственный eslint plugin *eslint-plugin-fsd-rules-checker*,
который содержит 3 правила
1) fsd-path-checker - запрещает использовать абсолютные импорты в рамках одного модуля
2) layer-import-checker - проверяет корректность использования слоев с точки зрения методологии
3) public-api-imports - разрешает импорт из других модулей только из public api. Имеет auto fix

##### Запуск линтеров
- `npm run lint:ts` - проверка ts файлов линтером
- `npm run lint:ts:fix` - исправление ts файлов линтером
- `npm run lint:scss` - проверка scss файлов style линтером
- `npm run lint:scss:fix` - исправление scss файлов style линтером

----
## Storybook

В проекте для каждого компонента описываются story-кейсы. Запросы на сервер мокаются с помощью storybook-addon-mock.

Файл со story-кейсом создается рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:
- `npm run storybook`

Изначально в проекте использовался Storybook v6, в котором story-кейсы описывались следующим образом:

```typescript jsx
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Button, ButtonSize, ButtonTheme } from './Button';
import { Theme } from '@/shared/const/theme';

export default {
    title: 'shared/Button',
    component: Button,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
    children: 'Text',
    theme: ButtonTheme.CLEAR,
};
```
Ссылка на пример - [Button.stories.tsx](./src/shared/ui/Button/Button.stories.tsx)

Позже была произведена миграция на Storybook v7 и все последующие компоненты описываются следующим образом: 

```typescript jsx
import type { Meta, StoryObj } from '@storybook/react';

import { articlesArrayTemplate } from '@/entities/Article';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator';
import { Themes } from '@/shared/const/theme';
import PageWrapper from '@/shared/ui/PageWrapper';

import ArticleRecommendationsList from '.';

const meta: Meta<typeof ArticleRecommendationsList> = {
    title: 'features/ArticleRecommendations',
    component: ArticleRecommendationsList,
    decorators: [
        ThemeDecorator(Themes.LIGHT),
    ],
    parameters: {
        mockData: [
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
type Story = StoryObj<typeof ArticleRecommendationsList>;

export const Normal: Story = {
    render: () => (
        <PageWrapper>
            <ArticleRecommendationsList />
        </PageWrapper>
    ),
};
```
Ссылка на пример - [ArticleRecommendationsList.stories.tsx](./src/features/ArticleRecommendationsList/ui/ArticleRecommendationsList/ArticleRecommendationsList.stories.tsx)

----

## Конфигурация проекта

В проекте используются два сборщика - webpack и vite:
1. [Webpack конфиг](./config/build/buildWebpackConfig.ts)
2. [Vite кофиг](./vite.config.ts)

Оба сборщика адаптированы под основные фичи приложения.

Все конфигурации хранятся в /config
- [/config/build](./config/build) - конфигурация webpack
- [/config/jest](./config/jest) - конфигурация тестовой среды jest
- [/config/storybook](./config/storybook) - конфигурация storybook

В папке `scripts` находятся различные скрипты для рефакторинга и упрощения написания кода, генерации отчетов и тд.

----

## CI pipeline и pre commit хуки

Конфигурация github actions находится в [./github/workflows](./.github/workflows/main.yml). В CI прогоняются все виды тестов - сборка проекта и сторибука, линтинг (eslint и stylelint), скриншотные тесты, unit тесты и e2e тесты.

В прекоммит хуках проверяем проект линтерами. Конфигурация [./.husky/pre-commit](./.husky/pre-commit)

----

## Работа с данными

Взаимодействие с данными осуществляется с помощью redux toolkit.
По возможности переиспользуемые сущности необходимо нормализовать с помощью EntityAdapter

Запросы на сервер отправляются с помощью [RTK query](/src/shared/api/rtkApi.ts) и [createAsyncThunk]() в связке с [axios]()

Для асинхронного подключения редюсеров используется
[DynamicModuleLoader](/src/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader.tsx),
куда передается объект с редьюсерами, где ключ - имя редьюсера, согласно [StateSchema](./src/app/providers/StoreProvider/config/StateSchema.ts),
a значение - сам редьюсер. Пример использования:
```typescript jsx

import DynamicModuleLoader, { ReducerList } from '@/shared/lib/components/DynamicModuleLoader';

const reducerList: ReducerList = {
    commentForm: commentFormReducer,
};

interface CommentFormProps {
    addNewCommentTo: () => void
}

const CommentForm = memo(({addNewCommentTo}: CommentFormProps) => {
    
    return (
        <DynamicModuleLoader reducerList={reducerList}>
            {content}
        </DynamicModuleLoader>
    );
});

export default CommentForm;
```
Ссылка на пример - [CommentForm](./src/entities/Comment/ui/CommentForm/index.tsx)

Для асинхронного подключения библиотек используются Context провайдеры, 
например [AnimationProvider](./src/shared/lib/components/AnimationProvider/index.tsx).
Пример использования:
```typescript jsx
import { ReactNode, useCallback, useEffect } from 'react';

import { AnimationProvider, useAnimationLibs } from '@/shared/lib/components/AnimationProvider';


const DrawerContent = (props) => {
    const { Gesture, Spring } = useAnimationLibs();

    return (
        <Portal>
            <div className={classNames(styles.Drawer, {}, [className])}>
                <Overlay visible={visible} onClick={() => close()} />
                <Spring.a.div
                    className={styles.content}
                    onClick={(event) => event.stopPropagation()}
                    style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
};

const DrawerLibsLoader = ({ ...props }: DrawerProps) => {
    const { isLoaded } = useAnimationLibs();
    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
};

const Drawer = ({ ...props }: DrawerProps) => (
    <AnimationProvider>
        <DrawerLibsLoader {...props} />
    </AnimationProvider>
);

export default Drawer;
```
Ссылка на пример - [Drawer](./src/shared/ui/Drawer/index.tsx)

----

# Слайсы проекта:

## Страницы (pages)

- [AboutPage](./src/pages/AboutPage)
- [AdminPage](./src/pages/AdminPage)
- [ArticleDetailsPage](./src/pages/ArticleDetailsPage)
- [ArticleEditPage](./src/pages/ArticleEditPage)
- [ArticlesPage](./src/pages/ArticlesPage)
- [ForbiddenPage](./src/pages/ForbiddenPage)
- [MainPage](./src/pages/MainPage)
- [NotFoundPage](./src/pages/NotFoundPage)
- [ProfilePage](./src/pages/ProfilePage)

## Виджеты (widgets)

- [Navbar](./src/widgets/Navbar)
- [PageError](./src/widgets/PageError)
- [PageLoader](./src/widgets/PageLoader)
- [Sidebar](./src/widgets/Sidebar)


## Фичи (features)

- [ArticleComments](./src/features/ArticleComments)
- [ArticleRating](./src/features/ArticleRating)
- [ArticleRecommendationsList](./src/features/ArticleRecommendationsList)
- [ArticleTypeTabs](./src/features/ArticleTypeTabs)
- [AuthByUsername](./src/features/AuthByUsername)
- [AvatarDropdown](./src/features/AvatarDropdown)
- [ChangeViewType](./src/features/ChangeViewType)
- [EditableProfileCard](./src/features/EditableProfileCard)
- [LangSwitcher](./src/features/LangSwitcher)
- [NotificationButton](./src/features/NotificationButton)
- [SortSelector](./src/features/SortSelector)
- [ThemeSwitcher](./src/features/ThemeSwitcher)
- [UI](./src/features/UI)


## Сущности (entities)

- [Article](./src/entities/Article)
- [Comment](./src/entities/Comment)
- [Counter](./src/entities/Counter)
- [Country](./src/entities/Country)
- [Currency](./src/entities/Currency)
- [Notification](./src/entities/Notification)
- [Profile](./src/entities/Profile)
- [Rating](./src/entities/Rating)
- [User](./src/entities/User)


# Доступ к проекту


- [Демо проекта](https://master--mellifluous-zuccutto-14ad61.netlify.app/)
- [API проекта](https://blogappserver-sergeypost.b4a.run) 
- Тестовые доступы: login - admin, password - 123

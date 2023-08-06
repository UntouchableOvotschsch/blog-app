import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/helpers/classNames/classNames';
import { memo, useCallback, useState } from 'react';
import ArticleList from 'widgets/Article/ArticleList';
import { articlesArrayTemplate, ArticleViewTypes } from 'entities/Article';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import Icon from 'shared/ui/Icon';
import ListViewIcon from 'shared/assets/icons/list-view-icon.svg';
import TileViewIcon from 'shared/assets/icons/tile-view-icon.svg';
import { ARTICLE_VIEW_KEY } from 'shared/const/localStorage';
import styles from './ArticlesPage.module.scss';

interface ArticlesPageProps {
    className?: string;
}

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
    const { t } = useTranslation();
    const localStorageView = localStorage
        .getItem(ARTICLE_VIEW_KEY) as ArticleViewTypes || ArticleViewTypes.SMALL_TILE;

    const [view, changeView] = useState(localStorageView);

    const changeToBigTile = useCallback(() => {
        changeView(ArticleViewTypes.BIG_TILE);
        localStorage.setItem(ARTICLE_VIEW_KEY, ArticleViewTypes.BIG_TILE);
    }, []);

    const changeToSmallTile = useCallback(() => {
        changeView(ArticleViewTypes.SMALL_TILE);
        localStorage.setItem(ARTICLE_VIEW_KEY, ArticleViewTypes.SMALL_TILE);
    }, []);

    return (
        <div className={classNames(styles.ArticlesPage, {}, [className])}>
            <div>
                <Button
                    theme={ThemeButton.CLEAR}
                    onClick={changeToBigTile}
                >
                    <Icon
                        Icon={ListViewIcon}
                        className={classNames('', {
                            [styles.active]: view === ArticleViewTypes.BIG_TILE,
                        }, [])}
                    />
                </Button>
                <Button
                    theme={ThemeButton.CLEAR}
                    onClick={changeToSmallTile}
                >
                    <Icon
                        Icon={TileViewIcon}
                        className={
                            classNames('', {
                                [styles.active]: view === ArticleViewTypes.SMALL_TILE,
                            }, [])
                        }
                    />
                </Button>
            </div>
            <ArticleList
                articles={articlesArrayTemplate}
                view={view}
            />
        </div>
    );
});

export default ArticlesPage;

import { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import CodeDeprecated from '@/shared/ui/deprecated/Code';
import Code from '@/shared/ui/Code';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';

import styles from './ArticleCodeBlockCom.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComProps {
    className?: string;
    block: ArticleCodeBlock;
}

const ArticleCodeBlockCom = memo(({ className, block }: ArticleCodeBlockComProps) => (
    <ToggleFeatureComponent
        /* eslint-disable-next-line i18next/no-literal-string */
        name='isAppRedesigned'
        on={<Code textCode={block.code} className={className} />}
        off={
            <div className={classNames(styles.ArticleCodeBlockCom, {}, [className])}>
                <CodeDeprecated textCode={block.code} />
            </div>
        }
    />
));

export default ArticleCodeBlockCom;

import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Code from '@/shared/ui/Code';
import styles from './ArticleCodeBlockCom.module.scss';
import { ArticleCodeBlock } from '../../model/types/article';

interface ArticleCodeBlockComProps {
    className?: string;
    block: ArticleCodeBlock
}

const ArticleCodeBlockCom = memo(({ className, block }: ArticleCodeBlockComProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.ArticleCodeBlockCom, {}, [className])}>
            <Code textCode={block.code} />
        </div>
    );
});

export default ArticleCodeBlockCom;

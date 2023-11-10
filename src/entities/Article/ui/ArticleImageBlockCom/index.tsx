import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Text, { TextAlign, TextSize } from '@/shared/ui/deprecated/Text';

import styles from './ArticleImageBlockCom.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComProps {
    className?: string;
    block: ArticleImageBlock;
}

const ArticleImageBlockCom = memo(({ className, block }: ArticleImageBlockComProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.ArticleImageBlockCom, {}, [className])}>
            <img src={block.src} alt={block.title} className={styles.img} />
            <Text text={block.title} align={TextAlign.CENTER} size={TextSize.L} />
        </div>
    );
});

export default ArticleImageBlockCom;

import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import Text, { TextAlign, TextSize } from '@/shared/ui/Text';
import { ArticleTextBlock } from '../../model/types/article';
import styles from './ArticleTextBlockCom.module.scss';

interface ArticleTextBlockComProps {
    className?: string;
    block: ArticleTextBlock
}

const ArticleTextBlockCom = memo(({ className, block }: ArticleTextBlockComProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(styles.ArticleTextBlockCom, {}, [className])}>
            {
                block.title && (
                    <Text
                        title={block.title}
                        size={TextSize.L}
                        classname={styles.title}
                    />
                )
            }
            {
                block.paragraphs.map((paragraph) => (
                    <Text
                        align={TextAlign.JUSTIFY}
                        text={paragraph}
                        size={TextSize.L}
                        key={paragraph}
                        classname={styles.paragraph}
                    />
                ))
            }
        </div>
    );
});

export default ArticleTextBlockCom;

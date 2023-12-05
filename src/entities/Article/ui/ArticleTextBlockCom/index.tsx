import { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import TextDeprecated, { TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import Text from '@/shared/ui/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { VStack } from '@/shared/ui/Stack';

import styles from './ArticleTextBlockCom.module.scss';
import { ArticleTextBlock } from '../../model/types/article';

interface ArticleTextBlockComProps {
    className?: string;
    block: ArticleTextBlock;
}

const ArticleTextBlockCom = memo(({ className, block }: ArticleTextBlockComProps) => (
    <ToggleFeatureComponent
        /* eslint-disable-next-line i18next/no-literal-string */
        name='isAppRedesigned'
        on={
            <VStack gap='8' className={className} align='start'>
                {block.title && <Text title={block.title} size='size_l' />}
                {block.paragraphs.map((paragraph) => (
                    <Text align='justify' text={paragraph} key={paragraph} />
                ))}
            </VStack>
        }
        off={
            <div className={classNames(styles.ArticleTextBlockCom, {}, [className])}>
                {block.title && <TextDeprecated title={block.title} size={TextSize.L} classname={styles.title} />}
                {block.paragraphs.map((paragraph) => (
                    <TextDeprecated
                        align={TextAlign.JUSTIFY}
                        text={paragraph}
                        size={TextSize.L}
                        key={paragraph}
                        classname={styles.paragraph}
                    />
                ))}
            </div>
        }
    />
));

export default ArticleTextBlockCom;

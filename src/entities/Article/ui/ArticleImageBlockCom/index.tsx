import { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames/classNames';
import TextDeprecated, { TextAlign, TextSize } from '@/shared/ui/deprecated/Text';
import Text from '@/shared/ui/Text';
import ToggleFeatureComponent from '@/shared/lib/features/ToggleFeatureComponent';
import { VStack } from '@/shared/ui/Stack';
import AppImage from '@/shared/ui/AppImage';

import styles from './ArticleImageBlockCom.module.scss';
import { ArticleImageBlock } from '../../model/types/article';

interface ArticleImageBlockComProps {
    className?: string;
    block: ArticleImageBlock;
}

const ArticleImageBlockCom = memo(({ className, block }: ArticleImageBlockComProps) => (
    <ToggleFeatureComponent
        /* eslint-disable-next-line i18next/no-literal-string */
        name='isAppRedesigned'
        on={
            <VStack className={className} gap='4'>
                <AppImage src={block.src} alt={block.title} width='100%' />
                <Text text={block.title} align='center' />
            </VStack>
        }
        off={
            <div className={classNames(styles.ArticleImageBlockCom, {}, [className])}>
                <img src={block.src} alt={block.title} className={styles.img} />
                <TextDeprecated text={block.title} align={TextAlign.CENTER} size={TextSize.L} />
            </div>
        }
    />
));

export default ArticleImageBlockCom;

import { Story } from '@storybook/react';
import { Suspense } from 'react';

export const SuspenseDecorator = (StoryCom: Story) => (
    <Suspense>
        <StoryCom />
    </Suspense>

);

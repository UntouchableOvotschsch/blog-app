import { Suspense } from 'react';

import { Story } from '@storybook/react';

export const SuspenseDecorator = (StoryCom: Story) => (
    <Suspense fallback="">
        <StoryCom />
    </Suspense>

);

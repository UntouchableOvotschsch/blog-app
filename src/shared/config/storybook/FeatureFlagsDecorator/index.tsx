import { StoryFn } from '@storybook/react';

import { FeatureFlags } from '@/shared/types/featureFlags';
import { setFeatureFlags } from '@/shared/lib/features/featureFlagsHandler';

export const FeatureFlagsDecorator = (features: Partial<FeatureFlags>) => (Story: StoryFn) => {
    setFeatureFlags(features);

    return <Story />;
};

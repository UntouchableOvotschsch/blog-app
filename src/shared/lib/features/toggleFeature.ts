import { FeatureFlags } from '@/shared/types/featureFlags';

import { getFeatureFlag } from './featureFlagsHandler';

interface ToggleFeatureProps<T> {
    name: keyof FeatureFlags;
    on: () => T;
    off: () => T;
}

export function toggleFeature<T>({ on, off, name }: ToggleFeatureProps<T>): T {
    if (getFeatureFlag(name)) {
        return on();
    }
    return off();
}

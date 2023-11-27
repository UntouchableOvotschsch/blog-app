import { FeatureFlags } from '@/shared/types/featureFlags';

let featureFlags: FeatureFlags = {};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(featureKey: keyof FeatureFlags) {
    return featureFlags[featureKey];
}

export function getAllFeatureFlags() {
    return featureFlags;
}

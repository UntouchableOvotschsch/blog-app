import { FeatureFlags } from '@/shared/types/featureFlags';
import { LOCAL_STORAGE_FEATURE_FLAGS_KEY } from '@/shared/const/localStorage';

let featureFlags: FeatureFlags = {};

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(featureKey: keyof FeatureFlags) {
    const featureFlagsFromLC = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FEATURE_FLAGS_KEY) ?? '{}');
    return featureFlags[featureKey] ?? featureFlagsFromLC[featureKey];
}

export function getAllFeatureFlags() {
    return featureFlags;
}

export function setFeatureFlagsToLocalStorage(newFeatureFlags?: Partial<FeatureFlags>) {
    if (newFeatureFlags) {
        const data = JSON.stringify(newFeatureFlags);
        localStorage.setItem(LOCAL_STORAGE_FEATURE_FLAGS_KEY, data);
    }
}

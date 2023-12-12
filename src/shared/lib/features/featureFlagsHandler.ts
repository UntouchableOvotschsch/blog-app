import { FeatureFlags } from '@/shared/types/featureFlags';
import { LOCAL_STORAGE_FEATURE_FLAGS_KEY } from '@/shared/const/localStorage';

let featureFlags: FeatureFlags = {};

const featureFlagsFromLC = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FEATURE_FLAGS_KEY) ?? '{}');

export function setFeatureFlags(newFeatureFlags?: FeatureFlags) {
    if (newFeatureFlags) {
        featureFlags = newFeatureFlags;
    }
}

export function getFeatureFlag(featureKey: keyof FeatureFlags) {
    return featureFlags[featureKey] ?? featureFlagsFromLC?.[featureKey];
}

export function getAllFeatureFlags() {
    return featureFlags;
}

export function setFeatureFlagsToLocalStorage(newFeatureFlags?: Partial<FeatureFlags>) {
    const data = JSON.stringify({
        ...featureFlagsFromLC,
        ...newFeatureFlags,
    });
    localStorage.setItem(LOCAL_STORAGE_FEATURE_FLAGS_KEY, data);
}

export function getFeatureFlagsFromLocalStorage(featureKey: keyof FeatureFlags) {
    return featureFlagsFromLC?.[featureKey];
}

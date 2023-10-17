import { ReactElement } from 'react';

import { FeatureFlags } from '@/shared/types/featureFlags';


import { getFeatureFlag } from './featureFlagsHandler';

interface ToggleFeatureComponentProps {
    name: keyof FeatureFlags
    on: ReactElement
    off: ReactElement
}

const ToggleFeatureComponent = ({name, on, off}: ToggleFeatureComponentProps) => {
    if(getFeatureFlag(name)) {
        return on
    }
    return off
}

export default ToggleFeatureComponent

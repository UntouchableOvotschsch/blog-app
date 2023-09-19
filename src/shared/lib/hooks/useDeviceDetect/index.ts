import React from 'react';

export const useDeviceDetect = () => {
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);
    React.useEffect(() => {
        if (!window.matchMedia) return;
        setIsTouchDevice(window.matchMedia('(pointer:coarse)').matches);
    }, []);
    return isTouchDevice;
};

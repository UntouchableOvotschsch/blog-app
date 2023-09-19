import {
    createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState,
} from 'react';

type GestureType = typeof import('@use-gesture/react')
type SpringType = typeof import('@react-spring/web')

interface AnimationProviderProps {
    children: ReactNode
}

interface AnimationProviderPayload {
    Gesture?: GestureType
    Spring?: SpringType
    isLoaded?: boolean
}

const getAsyncAnimationModules = async () => Promise.all([
    import('@use-gesture/react'),
    import('@react-spring/web'),
]);

const AnimationContext = createContext<AnimationProviderPayload>({});

export const useAnimationLibs = () => useContext(AnimationContext) as Required<AnimationProviderPayload>;

export const AnimationProvider = ({ children }: AnimationProviderProps) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const GestureRef = useRef<GestureType>();
    const SpringRef = useRef<SpringType>();

    useEffect(() => {
        getAsyncAnimationModules()
            .then(([Gesture, Spring]) => {
                GestureRef.current = Gesture;
                SpringRef.current = Spring;
                setIsLoaded(true);
            });
    }, []);

    const payload = useMemo<AnimationProviderPayload>(() => ({
        isLoaded,
        Gesture: GestureRef.current,
        Spring: SpringRef.current,
    }), [isLoaded]);

    return (
        <AnimationContext.Provider value={payload}>
            {children}
        </AnimationContext.Provider>
    );
};

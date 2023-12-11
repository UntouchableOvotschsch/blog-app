import { createContext, FC, PropsWithChildren, useContext, useMemo, useState } from 'react';

interface ForceUpdateProviderContextProps {
    value: boolean
    forceUpdate: () => void
}


const ForceUpdateProviderContext = createContext<ForceUpdateProviderContextProps>({
    value: true,
    forceUpdate: () => {}
})


export const useForceUpdate = () => {
    const {forceUpdate} = useContext(ForceUpdateProviderContext)
    return forceUpdate
}


export const ForceUpdateProvider: FC<PropsWithChildren> = ({children}) => {

    const [value, setValue] = useState(true)

    const forceUpdate = () => {
        setValue(prevState => !prevState)
        setTimeout(() => {
            setValue(prevState => !prevState)
        })
    }


    const contextValue = useMemo<ForceUpdateProviderContextProps>(() => ({
        value,
        forceUpdate
    }), [value])



    if(!value) {
        return null
    }


    return (
        <ForceUpdateProviderContext.Provider value={contextValue}>
            {children}
        </ForceUpdateProviderContext.Provider>
    )


}

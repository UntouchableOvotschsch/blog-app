import {createContext} from "react";


export enum Themes {
    LIGHT = 'light',
    DARK = 'dark'
}

export interface ThemeContext {
    theme?: Themes
    setTheme?: (theme: Themes) => void
}

export const ThemeContext = createContext<ThemeContext>({})


export const LOCAL_STORAGE_THEME_KEY = 'theme'
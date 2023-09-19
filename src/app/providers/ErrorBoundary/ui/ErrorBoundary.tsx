import React, { ErrorInfo, ReactNode, Suspense } from 'react';
import { PageError } from '@/widgets/PageError';
import { ThemeProvider, Themes } from '@/app/providers/ThemeProvider';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';

interface ErrorBoundaryProps {
    children: ReactNode
}

interface ErrorBoundaryState {
    hasError: boolean
}
class ErrorBoundary
    extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Если есть сервис для логирования ошибок
        console.log(error, errorInfo);
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;
        const currentTheme = localStorage
            .getItem(LOCAL_STORAGE_THEME_KEY) as Themes || Themes.LIGHT;
        if (hasError) {
            return (
                <Suspense fallback="">
                    <ThemeProvider initialTheme={currentTheme}>
                        <PageError />
                    </ThemeProvider>
                </Suspense>
            );
        }

        return children;
    }
}

export default ErrorBoundary;

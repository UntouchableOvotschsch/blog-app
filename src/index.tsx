import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/app/App';
import { ErrorBoundary } from '@/app/providers/ErrorBoundary';
import { StoreProvider } from '@/app/providers/StoreProvider';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import '@/shared/config/i18n/i18n';
import '@/app/styles/index.scss';
import { ForceUpdateProvider } from '@/shared/render/ForceUpdateProvider';

const domNode = document.getElementById('root');
const root = createRoot(domNode!);
root.render(
    <BrowserRouter>
        <StoreProvider>
            <ThemeProvider>
                <ForceUpdateProvider>
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </ForceUpdateProvider>
            </ThemeProvider>
        </StoreProvider>
    </BrowserRouter>,
);

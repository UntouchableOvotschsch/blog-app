import { Story } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

export const RouterDecorator = (StoryCom: Story) => (
    <BrowserRouter>
        <StoryCom />
    </BrowserRouter>

);

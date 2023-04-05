import React from 'react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { Story } from '@storybook/react';
import { DeepPartial } from '@reduxjs/toolkit';

export const StoreDecorator = (initialState: DeepPartial<StateSchema>) => (StoryCom: Story) => (
    <StoreProvider initialState={initialState}>
        <StoryCom />
    </StoreProvider>
);

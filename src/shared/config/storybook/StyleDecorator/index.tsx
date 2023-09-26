import '@/app/styles/testing';
import { StoryFn } from '@storybook/react';

export const StyleDecorator = (StoryCom: StoryFn) => (
    <StoryCom />
);

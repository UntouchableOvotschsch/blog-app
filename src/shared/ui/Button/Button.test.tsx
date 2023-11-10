import { render, screen } from '@testing-library/react';

import { Button } from '.';

describe('Button', () => {
    test('render with children', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });
    test('render with theme', () => {
        render(<Button theme='clear'>TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});

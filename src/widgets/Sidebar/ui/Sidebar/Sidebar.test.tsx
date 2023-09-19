import { fireEvent, screen } from '@testing-library/react';
import { renderForTests } from '@/shared/config/jest/renderForTests';
import { Sidebar } from '.';

describe('Sidebar', () => {
    test('render', () => {
        renderForTests(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
    test('test toggle', () => {
        renderForTests(<Sidebar />);
        const toggleButton = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});

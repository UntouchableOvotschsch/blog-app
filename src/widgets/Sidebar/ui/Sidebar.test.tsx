import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar';

// eslint-disable-next-line max-len
import { renderWithTranslation } from 'shared/lib/helpers/tests/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
    test('render', () => {
        renderWithTranslation(<Sidebar />);
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });
    test('test toggle', () => {
        renderWithTranslation(<Sidebar />);
        const toggleButton = screen.getByTestId('sidebar-toggle');
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        fireEvent.click(toggleButton);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
});

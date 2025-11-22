import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';

describe('Navbar', () => {
    it('renders the logo and brand name', () => {
        render(<Navbar />);
        expect(screen.getByText('')).toBeInTheDocument();
        expect(screen.getByAltText(' Logo')).toBeInTheDocument();
    });

    it('renders navigation links', () => {
        render(<Navbar />);
        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByText('Experiences')).toBeInTheDocument();
        expect(screen.getByText('Community')).toBeInTheDocument();
    });
});

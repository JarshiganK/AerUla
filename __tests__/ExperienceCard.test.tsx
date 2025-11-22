import { render, screen } from '@testing-library/react';
import ExperienceCard from '@/components/ExperienceCard';

const mockExperience = {
    id: 1,
    slug: 'test-experience',
    title: 'Test Experience',
    short_description: 'This is a test experience description.',
    duration_label: '2 hours',
    price_label: 'LKR 5,000',
    difficulty: 'Easy',
};

describe('ExperienceCard', () => {
    it('renders experience details correctly', () => {
        render(<ExperienceCard experience={mockExperience} />);

        expect(screen.getByText('Test Experience')).toBeInTheDocument();
        expect(screen.getByText('This is a test experience description.')).toBeInTheDocument();
        expect(screen.getByText('2 hours')).toBeInTheDocument();
        expect(screen.getByText('LKR 5,000')).toBeInTheDocument();
        expect(screen.getByText('Easy')).toBeInTheDocument();
    });

    it('contains a link to the contact page', () => {
        render(<ExperienceCard experience={mockExperience} />);

        const link = screen.getByRole('link', { name: /i want this experience/i });
        expect(link).toHaveAttribute('href', '/contact');
    });
});

-- Create experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  short_description TEXT NOT NULL,
  duration_label TEXT,
  price_label TEXT,
  difficulty TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Seed data for experiences
INSERT INTO experiences (slug, title, short_description, duration_label, price_label, difficulty)
VALUES
  ('palmyrah-weaving-circle', 'Palmyrah Weaving Circle', 'Join local artisans to learn the ancient craft of weaving palmyrah leaves into beautiful, functional art.', '2 hours', 'LKR 4,500', 'Beginner'),
  ('clay-and-flame-kitchen', 'Clay & Flame Kitchen', 'Cook a traditional northern meal using clay pots and open fire, guided by a village grandmother.', '3 hours', 'LKR 7,500', 'Beginner–Intermediate'),
  ('twilight-folk-sessions', 'Twilight Folk Sessions', 'An intimate evening of folk songs and stories under the stars, accompanied by traditional instruments.', '1.5 hours', 'LKR 3,500', 'Relaxed')
ON CONFLICT (slug) DO NOTHING;

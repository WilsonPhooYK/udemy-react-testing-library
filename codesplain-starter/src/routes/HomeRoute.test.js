import { render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { MemoryRouter } from 'react-router';
import HomeRoute from './HomeRoute';
import { createServer } from '../test/server';

// GOAL:
createServer([
  {
    path: '/api/repositories',
    method: 'get',
    res: (req) => {
      const language = req.url.searchParams.get('q').split('language:')[1];

      return {
        items: [
          { id: 1, full_name: `${language}_one` },
          { id: 2, full_name: `${language}_two` },
        ]
      }
    }
  }
])

test('render two links for each language', async () => {
  render(
    <MemoryRouter>
      <HomeRoute />
    </MemoryRouter>
  );

  // Loop over each language
  const languages = [
    'javascript',
    'typescript',
    'rust',
    'go',
    'python',
    'java'
  ]
  // For each language, makre sure we see 2 links
  for (let language of languages) {
    const links = await screen.findAllByRole('link', {
      name: new RegExp(`${language}_`)
    });

    expect(links).toHaveLength(2);
    // Assert that the links have the appropriate full_name
    expect(links[0]).toHaveTextContent(`${language}_one`);
    expect(links[1]).toHaveTextContent(`${language}_two`);
    expect(links[0]).toHaveAttribute('href', `/repositories/${language}_one`);
    expect(links[1]).toHaveAttribute('href', `/repositories/${language}_two`);
  }
  
});
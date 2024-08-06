import { render, screen, within } from '@testing-library/react';
import UserList from './UserList';

function renderComponent() {
  // Render the component
  const users = [{
    name: 'jane', email: 'jane@jane.com',
  }, {
    name: 'sam', email: 'sam@sam.com',
  }]
  render(<UserList users={users} />);

  return { users };
}

test('render one row per user', () => {
  renderComponent();

  // Find all the rows in the table
  // screen.logTestingPlaygroundURL();
  // const rows = screen.getAllByRole('row');
  const rows = within(screen.getByTestId('users')).getAllByRole('row');
  // const rows = container.querySelectorAll('tbody tr');

  // Assertion: correct number of rows in the table
  expect(rows).toHaveLength(2);
});


test('render the email and name of each user', () => {
  const { users } = renderComponent();

  for (let user of users) {
    const name = screen.getByRole('cell', { name: user.name });
    const email = screen.getByRole('cell', { name: user.email });

    expect(name).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  }
})
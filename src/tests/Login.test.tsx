import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../components/Forms/Login/Login';
import { Provider } from 'react-redux';
import store from '../store';
import { BrowserRouter as Router } from 'react-router-dom';

it('should have an email password field and submit button', () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );
  const emailField = screen.getByLabelText(/E-mail/i);
  const passwordField = screen.getByLabelText(/Mot de pass/i);
  const submitButton = screen.getByRole('button', { name: /Connexion/i });

  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('displays error message for invalid data', async () => {
  render(
    <Provider store={store}>
      <Router>
        <Login />
      </Router>
    </Provider>
  );

  // Fill in invalid data
  userEvent.type(screen.getByLabelText(/Adresse E-mail/i), 'npm.gmail.com');
  userEvent.type(screen.getByLabelText(/Mot de passe/i), '123456');

  // Submit the form
  userEvent.click(screen.getByRole('button', { name: /Connexion/i }));

  await waitFor(() => {
    expect(
      screen.getByText(
        /Le mot de passe ou l&aps;email que vous avez saisi est incorrect/i
      )
    ).toBeInTheDocument();
  });
});
export {};

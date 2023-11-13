import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../store';
import AnimalCard from '../components/Inbox/CardsInbox/Cards';

describe('AnimalCard Component', () => {
  test('renders AnimalCard component with correct information', async () => {
    render(
      <Provider store={store}>
        <AnimalCard
          type="Cat"
          name="Whiskers"
          start_date="2023-11-15"
          end_date="2023-11-20"
          clientId="123"
        />
      </Provider>
    );

    expect(screen.getByText('Whiskers')).toBeInTheDocument();
    expect(screen.getByText('2023-11-15 au')).toBeInTheDocument();
    expect(screen.getByText('2023-11-20')).toBeInTheDocument();
  });
});

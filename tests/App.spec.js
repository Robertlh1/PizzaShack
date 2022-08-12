/**
 * @jest-environment jsdom
 */

import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { server } from '../client/src/mocks/server'
import App from '../client/src/App.jsx';

beforeEach(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('App', () => {
  test('renders App component', () => {
    render(<App />)
  })

  test('should display a login screen', () => {
    render(<App />)

    screen.getByText('Please choose your role to continue.')
  })

  test('should be able to login as store owner', () => {
    render(<App />)
    const button = screen.getByText('Store Owner')
    fireEvent.click(button)
    screen.getByText('Welcome back Bob!')
  })

  test('should be able to login as pizza chef', () => {
    render(<App />)
    const button = screen.getByText('Pizza Chef')
    fireEvent.click(button)
    screen.getByText('Welcome back Chef!')
  })

  test('should be able to login as store owner and then log out', () => {
    render(<App />)
    const button = screen.getByText('Store Owner')
    fireEvent.click(button)
    screen.getByText('Welcome back Bob!')
    const logout = screen.getByText('Logout')
    fireEvent.click(logout)
    screen.getByText('Please choose your role to continue.')
  })

  test('should be able to login as pizza chef and then log out', () => {
    render(<App />)
    const button = screen.getByText('Pizza Chef')
    fireEvent.click(button)
    screen.getByText('Welcome back Chef!')
    const logout = screen.getByText('Logout')
    fireEvent.click(logout)
    screen.getByText('Please choose your role to continue.')
  })
})

describe('Store Owner', () => {
  test('should display a list of toppings', async () => {
    render(<App />)
    const button = screen.getByText('Store Owner')
    fireEvent.click(button)

    await waitFor(() => {
      screen.getByText('Pepperoni')
    })
  })

  test('should be able to add a new topping', async () => {
    render(<App />)
    const button = screen.getByText('Store Owner')
    fireEvent.click(button)

    await waitFor(() => {
      const newTopping = screen.getByText('New Topping')
      fireEvent.click(newTopping)
      const input = screen.getByPlaceholderText('Jalapenos? Maybe.')
      fireEvent.change(input), {target: {value: 'Sausage'}}
      const submit = screen.getByPlaceholderText('newTopping')
      fireEvent.click(submit)
    })
  })

  test('should be able to edit a topping', async () => {
    render(<App />)
    const button = screen.getByText('Store Owner')
    fireEvent.click(button)

    await waitFor(() => {
      const pepp = screen.getByText('Pepperoni')
      fireEvent.click(pepp)
      const input = screen.getByText('Pepperoni')
      fireEvent.change(input), {target: {value: 'Jalapenos'}}
      const submit = screen.getByText('Edit Topping')
      fireEvent.click(submit)
    })
  })

  test('should be able to delete a topping', async () => {
    render(<App />)
    const button = screen.getByText('Store Owner')
    fireEvent.click(button)

    await waitFor(() => {
      const pepp = screen.getByText('Pepperoni')
      fireEvent.click(pepp)
      const submit = screen.getByText('Delete Topping')
      fireEvent.click(submit)
    })
  })
})

describe('Pizza Chef', () => {
  test('should display a list of pizzas', async () => {
    render(<App />)
    const button = screen.getByText('Pizza Chef')
    fireEvent.click(button)

    await waitFor(() => {
      screen.getByText('Pepperoni Pizza')
    })
  })

  test('should be able to add a new pizza', async () => {
    render(<App />)
    const button = screen.getByText('Pizza Chef')
    fireEvent.click(button)

    await waitFor(() => {
      const newpizza = screen.getByText('New Pizza')
      fireEvent.click(newpizza)
      const cheese = screen.getByText('Cheese')
      fireEvent.click(cheese)
      const sub = screen.getByPlaceholderText('Submit')
      fireEvent.click(sub)
    })
  })

  test('should be able to edit a pizza', async () => {
    render(<App />)
    const button = screen.getByText('Pizza Chef')
    fireEvent.click(button)

    await waitFor(() => {
      const pepp = screen.getByText('Pepperoni Pizza')
      fireEvent.click(pepp)
      const cheese = screen.getByText('Cheese')
      fireEvent.click(cheese)
      const edit = screen.getByText('Save Changes')
      fireEvent.click(edit)
    })
  })

  test('should be able to delete a pizza', async () => {
    render(<App />)
    const button = screen.getByText('Pizza Chef')
    fireEvent.click(button)

    await waitFor(() => {
      const pepp = screen.getByText('Pepperoni Pizza')
      fireEvent.click(pepp)
      const del = screen.getByText('Delete Pizza')
      fireEvent.click(del)
    })
  })
})
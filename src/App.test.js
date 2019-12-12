import React from 'react';
import { 
  render, waitForElement 
} from '@testing-library/react';
jest.mock('./services/blogs');
import App from './App';

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(      () =>  component.getByText('login') )
    const el = component.container.querySelector('.login');
    const bEl = component.container.querySelector('.blogs');

    expect(el).toBeTruthy()
    expect(bEl).not.toBeTruthy()

    // expectations here
  })
    test('if user is logged, blog is renderd', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('user', JSON.stringify(user))
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(      () =>  component.getByText('blogs') )
    const el = component.container.querySelector('.blogs');
    const bEl = component.container.querySelector('.login');

    expect(el).toBeTruthy()
    expect(bEl).not.toBeTruthy()

    // expectations here
  })

})

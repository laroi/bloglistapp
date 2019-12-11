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
})

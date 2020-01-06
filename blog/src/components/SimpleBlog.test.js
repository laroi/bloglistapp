import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import SimpleBlog from './SimpleBlog';

test('renders content', () => {
    const blog = {
        title: 'Test title',
        author: 'test author',
        likes: 10,
    };
    const onClick = () =>  {
        console.log('click');
    };
    const component = render(
        <SimpleBlog blog={blog} onClick={onClick} />
    );
    const title = component.container.querySelector('.title')
    const likes = component.container.querySelector('.likes')

    expect(component.container).toHaveTextContent(
        'Test title test author'
    );

    expect(component.container).toHaveTextContent(
        'blog has 10 likeslike'
    );

});
test('clicking the button fires event handler', () => {
    const blog = {
        title: 'Test title',
        author: 'test author',
        likes: 10,
    };
    const mockHandler = jest.fn()
    const component = render(
        <SimpleBlog blog={blog} onClick={mockHandler} />
    );
    const button = component.container.querySelector('.btn')
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)

});

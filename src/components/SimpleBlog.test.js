import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
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

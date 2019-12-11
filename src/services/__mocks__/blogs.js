const blogs = [
    {
        title: 'test title',
        author: 'test author',
        url: 'test url',
        user: 'test123',
        likes: 0,
    }
];
const getAll = () => {
    return Promise.resolve(blogs);
};

export default {getAll}

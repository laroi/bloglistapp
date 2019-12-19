import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import AddForm from './components/AddForm';
import Togglable from './components/Togglable';
import  { useField } from './hooks';

const loginForm = (handleLogin, username, password) => (
    <form className="login" onSubmit={handleLogin}>
        <div>
            username
            <input {...username}  />
        </div>
        <div>
            password
            <input {...password}  />
        </div>
        <button type="submit">login</button>
    </form>
);
const Notification = ({ message, error }) => {
    if (message === null) {
        return null;
    }
    const notice = {
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    };
    let styleObj = {};
    if (error) {
        styleObj = { ...notice, color:'red' };
    } else {
        styleObj =  { ...notice, color: 'green' };
    }
    return (
        <div style={styleObj}>
            {message}
        </div>
    );
};

const blogForm = (blogs, handleLike, user={}, handleLogout, handleDelete) => {
    const { name = '' } = user;
    return  (
        <div className="blogs">
            <h2>blogs</h2>
            <span>{`${name} logged in`} <button onClick={handleLogout}>logout</button> </span>
            { blogs.map(x => <Blog key={x.id} blog={x} handleLike={handleLike} handleDelete={handleDelete} />) }
        </div>
    );
};
const getTogglable = (handleSubmit, newTitle, newAuthor, newUrl) => (
    <Togglable buttonLabel="new blog">
        <AddForm handleSubmit={handleSubmit} newTitle={newTitle} newAuthor={newAuthor} newUrl={newUrl} />
    </Togglable>

);
function App() {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const username = useField('text');
    const password = useField('password');
    const newTitle = useField('text');
    const newAuthor = useField('text');
    const newUrl = useField('text');
    const [error, setError ] = useState(null);
    const [notification, setNotification] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const blgObj = await blogService.createNew({ title: newTitle.value, author: newAuthor.value, url: newUrl.value });
            setNotification(`A new blog ${newTitle.value} by ${newAuthor.value} is added `);
            newTitle.reset();
            newAuthor.reset();
            newUrl.reset();
            setBlogs([...blogs, blgObj].sort((a, b) => { if (a.likes < b.likes) {return 1; }else{ return -1;}}  ));
            setTimeout(() => {setNotification(null);}, 5000);

        } catch (e) {
            setError(`${e.response.data.error}`);
            setTimeout(() => {setError(null);}, 5000);
        }
    };
    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const userVal = username.value;
            const pasVal = password.value;
            console.log(userVal, pasVal);
            const user = await loginService.login({ username: userVal, password: pasVal });
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            username.reset();
            password.reset();

        } catch (exception) {
            setError('user name or password is invalid');
            setTimeout(() => { setError(null); }, 5000);
        }
    };
    const handleLike = (id) => {
        return async() => {
            const index = blogs.findIndex(x => x.id===id);
            blogs[index].likes += 1;

            try {
                await blogService.updateLike(id, blogs[index].likes);
                setBlogs([...blogs].sort((a, b) => { if (a.likes < b.likes) {return 1; }else{ return -1;}}  ));
            } catch (e) {
                console.log(e);
            }
        };
    };
    const handleDelete = (id, title) => {
        return async() => {
            if (window.confirm(`Do you really want to delete ${title} ?`)) {
                try {
                    await blogService.deletePost(id);
                    const index = blogs.findIndex(x => x.id===id);
                    blogs.splice(index, 1);
                    setBlogs([...blogs].sort((a, b) => { if (a.likes < b.likes) {return 1; }else{ return -1;}}  ));
                } catch (e) {
                    console.log(e);
                }
            }
        };
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        setUser(null);

    };
    useEffect(() => {
        let  user = localStorage.getItem('user');
        if (user) {
            user =JSON.parse(user);
        } else {
            user = null;
        }
        setUser(user);

        blogService
            .getAll().then(blogs => {
                blogs = blogs.sort((a, b) => { if (a.likes < b.likes) {return 1; }else{ return -1;} });
                setBlogs(blogs);
            });
    }, []);
    return (
        <div className="App">
            <Notification message={notification} />
            <Notification message={error} error />

            {user !== null && blogForm(blogs, handleLike, user, handleLogout, handleDelete)}
            {user !== null && getTogglable(handleSubmit, newTitle, newAuthor, newUrl)}
            {user === null && loginForm(handleLogin, username, password)}


        </div>
    );
}

export default App;

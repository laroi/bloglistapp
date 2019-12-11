import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import AddForm from './components/AddForm';
import Togglable from './components/Togglable';

const loginForm = (handleLogin, username, setUsername, password, setPassword) => (
    <form className="login" onSubmit={handleLogin}>
        <div>
            username
            <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            password
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
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
        <div style={ styleObj }>
            { message }
        </div>
    );
};

const blogForm = (blogs, handleLike, user={}, handleLogout, handleDelete) => {
    const { name = '' } = user;
    return  (
        <div className="blogs">
            <h2>blogs</h2>
            <span>{ `${name} logged in` } <button onClick={ handleLogout }>logout</button> </span>
            { blogs.map(x => <Blog key={ x.id } blog={ x } handleLike={ handleLike } handleDelete={ handleDelete }/>)}
        </div>
    );
};
const getTogglable = (handleSubmit, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl) => (
    <Togglable buttonLabel="new blog">
        <AddForm handleSubmit={handleSubmit} newTitle={newTitle} setNewTitle={setNewTitle} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newUrl={newUrl} setNewUrl={setNewUrl}/>
    </Togglable>

);
function App() {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const [error, setError ] = useState(null);
    const [notification, setNotification] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const blgObj = await blogService.createNew({ title: newTitle, author: newAuthor, url: newUrl });
            setNotification(`A new blog ${newTitle} by ${newAuthor} is added `);
            setNewTitle('');
            setNewAuthor('');
            setNewUrl('');
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
            const user = await loginService.login({
                username, password,
            });
            setUser(user);
            localStorage.setItem('user', JSON.stringify(user));
            setUsername('');
            setPassword('');
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
        setUsername('');
        setPassword('');
        setUser(null);

    };
    useEffect(() => {
        let  user = localStorage.getItem('user');
        if (user) {
            user =JSON.parse(user)
        } else {
            user = null;
        }
        console.log('(*', user)
        setUser(user);

        blogService
            .getAll().then(blogs => {
                blogs = blogs.sort((a, b) => { if (a.likes < b.likes) {return 1; }else{ return -1;} });
                setBlogs(blogs);
            });
    }, []);
    return (
        <div className="App">
            <Notification message={notification}/>
            <Notification message={error} error/>

            {user !== null && blogForm(blogs, handleLike, user, handleLogout, handleDelete)}
            {user !== null && getTogglable(handleSubmit, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl)}
            {user === null && loginForm(handleLogin, username, setUsername, password, setPassword)}


        </div>
    );
}

export default App;

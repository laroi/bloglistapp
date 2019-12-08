import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs'
import loginService from './services/login'

const loginForm = (handleLogin, username, setUsername, password, setPassword) => (
    <form onSubmit={handleLogin}>
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
)

const blogForm = (blogs, user, handleLogout)=>{
    const {name = ''} = user;
   return  (
    <div>
        <h2>blogs</h2>
        <span>{`${name} logged in`} <button onClick={handleLogout}>logout</button> </span>
        {blogs.map(x=><Blog key={x.id} blog={x}/>)}
    </div>
)
}
function App() {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            setUser(user)
            localStorage.setItem('user', JSON.stringify(user));
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    const handleLogout = ()=> {
        localStorage.removeItem('user');
        setUser({});

    }
    useEffect(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            setUser(user);
            blogService
            .getAll().then(blogs => {
                setBlogs(blogs)
            })
    });
    return (
        <div className="App">
        {user !== null && blogForm(blogs, user, handleLogout)}
        {user === null && loginForm(handleLogin, username, setUsername, password, setPassword)}


        </div>
    );
}

export default App;

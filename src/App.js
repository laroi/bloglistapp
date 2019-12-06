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

const blogForm = (blogs)=> (
    <div>
        <h2>blogs</h2>
        {blogs.map(x=><Blog key={x.id} blog={x}/>)}
    </div>
)
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
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }
    useEffect(() => {
            blogService
            .getAll().then(blogs => {
                setBlogs(blogs)
            })
    }, []);
    return (
        <div className="App">
        {user !== null && blogForm(blogs)}
        {user === null && loginForm(handleLogin, username, setUsername, password, setPassword)}


        </div>
    );
}

export default App;

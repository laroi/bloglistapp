import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs'
import loginService from './services/login'
import AddForm from './components/AddForm';
import Togglable from './components/Togglable';

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
const Notification = ({ message, error }) => {
  if (message === null) {
    return null
  }
  const notice = {
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
  }
  let styleObj = {};
  if (error) {
      styleObj = {...notice, color:'red'}
  } else {
      styleObj = {...notice, color: 'green'}
  }
  return (
    <div style={styleObj}>
      {message}
    </div>
  )
}

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
const getTogglable = (handleSubmit, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl) => (
    <Togglable buttonLabel="new blog">
            <AddForm handleSubmit={handleSubmit} newTitle={newTitle} setNewTitle={setNewTitle} newAuthor={newAuthor} setNewAuthor={setNewAuthor} newUrl={newUrl} setNewUrl={setNewUrl}/>
    </Togglable>

)
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
        const blgObj = await blogService.createNew({title: newTitle, author: newAuthor, url: newUrl});
            setNotification(`A new blog ${newTitle} by ${newAuthor} is added `)
            setNewTitle('');
            setNewAuthor('');
            setNewUrl('');
            setBlogs([...blogs, blgObj])
            setTimeout(()=> {setNotification(null)}, 5000)

        } catch (e) {
            setError(`${e.response.data.error}`);
            setTimeout(()=> {setError(null)}, 5000)
        }
    }
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
            setError(`user name or password is invalid`);
            setTimeout(()=> {setError(null)}, 5000)
        }
    }
    const handleLogout = ()=> {
        localStorage.removeItem('user');
        setUsername('')
        setPassword('');
        setUser(null);

    }
    useEffect(() => {
            const user = JSON.parse(localStorage.getItem('user'));
            setUser(user);

            blogService
            .getAll().then(blogs => {
                setBlogs(blogs)
            })

    }, []);
    return (
        <div className="App">
        <Notification message={notification}/>
        <Notification message={error} error/>

        {user !== null && blogForm(blogs, user, handleLogout)}
        {user !== null && getTogglable(handleSubmit, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl)}
        {user === null && loginForm(handleLogin, username, setUsername, password, setPassword)}


        </div>
    );
}

export default App;

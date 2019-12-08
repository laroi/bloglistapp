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
  const addForm = (handleSubmit, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl) => {
      return (
          <div>
          <h1>Add New</h1>
          <form onSubmit={handleSubmit}>
            <div>
              title: <input value={newTitle} onChange={(e)=>{setNewTitle(e.target.value.trim());}}/>
          </div>
          <div>
              author: <input value={newAuthor} onChange={(e)=>{setNewAuthor(e.target.value.trim());}}/>

            </div>
          <div>
              url: <input value={newUrl} onChange={(e)=>{setNewUrl(e.target.value.trim());}}/>

            </div>

            <div>
              <button type="submit">add</button>
            </div>
          </form>
          </div>
      )
  };
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
    const [newTitle, setNewTitle] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newUrl, setNewUrl] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
        const blgObj = await blogService.createNew({title: newTitle, author: newAuthor, url: newUrl});
            setNewTitle('');
            setNewAuthor('');
            setNewUrl('');
            setBlogs([...blogs, blgObj])
        } catch (e) {
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
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
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
        {user !== null && blogForm(blogs, user, handleLogout)}
        {user !== null && addForm(handleSubmit, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl)}
        {user === null && loginForm(handleLogin, username, setUsername, password, setPassword)}


        </div>
    );
}

export default App;

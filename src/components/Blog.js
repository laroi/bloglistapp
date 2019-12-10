import React, {useState} from 'react';
import PropTypes from 'prop-types';
const username = JSON.parse(localStorage.getItem('user')).username

const delButton = (inUsername, handleDelete, id, title) => {

    if (username === inUsername) {
        return (<button onClick={handleDelete(id, title)}>Delete</button>)
    }
    return null;
    
}
const Details = ({url, id, user, likes, isVisible, handleLike, title, handleDelete}) => {
    if (isVisible) {
        const {name='', username} = user;
        return (
            <div>
                <div><a href={url}>{url}</a></div>
                <div>{likes} likes <button onClick={handleLike(id)}>Like</button></div>
                <div>added by {name}</div>
                {delButton(username, handleDelete, id, title)}
            </div>
        )
    }
    return null;

}
const Blog = ({ blog, handleLike , handleDelete}) => {
    const [isVisible, setIsVisible] = useState(false);
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    return (
        <div style={blogStyle}>
            <div onClick={() => setIsVisible(!isVisible)}>
                {blog.title} {blog.author}
            </div>
            <Details url={blog.url} title={blog.title} user={blog.user || {}} likes={blog.likes} id={blog.id} isVisible={isVisible} handleDelete={handleDelete} handleLike={handleLike} />
        </div>
    )
}
Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    handleLike: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired
}
export default Blog

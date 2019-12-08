import React, {useState} from 'react'
const Details = ({url, id, user, likes, isVisible, handleLike, handleDelete}) => {
    if (isVisible) {
        const {name=''} = user;
        return (
            <div>
                <div><a href={url}>{url}</a></div>
                <div>{likes} likes <button onClick={handleLike(id)}>Like</button></div>
                <div>added by {name}</div>
                <button onClick={handleDelete(id)}>Delete</button>
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
            <Details url={blog.url} user={blog.user || {}} likes={blog.likes} id={blog.id} isVisible={isVisible} handleDelete={handleDelete} handleLike={handleLike} />
        </div>
    )
}
export default Blog

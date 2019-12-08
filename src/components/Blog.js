import React, {useState} from 'react'
const Details = ({url, user, likes, isVisible}) => {
    if (isVisible) {
        const {name=''} = user;
        return (
            <div>
                <div><a href={url}>{url}</a></div>
                <div>{likes} likes <button>Like</button></div>
                <div>added by {name}</div>
            </div>
        )
    }
    return null;

}
const Blog = ({ blog }) => {
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
            <Details url={blog.url} user={blog.user || {}} likes={blog.likes} isVisible={isVisible}/>
        </div>
    )
}
export default Blog

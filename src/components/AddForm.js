import React from 'react';
const AddForm = ({ handleSubmit, newTitle, newAuthor,  newUrl }) => {
    return (
        <div>
            <h1>Add New</h1>
            <form onSubmit={ handleSubmit }>
                <div>
                    title: <input  {...newTitle}/>
                </div>
                <div>
                    author: <input{...newAuthor }/>

                </div>
                <div>
                    url: <input {...newUrl}/>

                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};
export default AddForm;

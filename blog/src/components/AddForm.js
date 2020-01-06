/* eslint-disable no-unused-vars */

import React from 'react';
const AddForm = ({ handleSubmit, newTitle, newAuthor,  newUrl }) => {
    const { reset:titleReset, ..._newTitle } = newTitle;
    const { reset:authorReset, ..._newAuthor } = newAuthor;
    const { reset:urlReset, ..._newUrl } = newUrl;

    return (
        <div>
            <h1>Add New</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    title: <input  {..._newTitle} />
                </div>
                <div>
                    author: <input{..._newAuthor} />

                </div>
                <div>
                    url: <input {..._newUrl} />

                </div>

                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
};
export default AddForm;

import React, { useState } from 'react'
  const AddForm = ({handleSubmit, newTitle, setNewTitle, newAuthor, setNewAuthor, newUrl, setNewUrl}) => {
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
export default AddForm

import React from 'react'
import {Link} from 'react-router-dom'
import supabase from '../config/supabaseClient'

const Blogpost = ( {post, onDelete } ) => {

    const handleDelete= async () => {
        const {data, error} = await supabase
        .from('posts')
        .delete()
        .eq( 'id', post.id)
        .select()

        if (error){
            console.log(error)
        }

        if (data) {
            console.log(data)
            onDelete(post.id)
        }
    // to refresh screen- mustupdate from home screen
    }


  return (

    <div className="posts-card">
      <h3>{post.title}</h3>
      <p>{post.author}</p>
      <p>{ post.createdAt }</p>
      <div className="">{post.content}</div>
      <div className="buttons">
      <Link to={'/' + post.id}>
        <i className="material-icons">edit</i>
      </Link>
        <i className="material-icons" onClick={handleDelete}>delete</i>
      </div>
    </div>
  )
}

export default Blogpost
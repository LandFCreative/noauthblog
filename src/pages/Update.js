import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../config/supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [dateCreated, setDateCreated] = useState('')
  const [content, setContent] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title || !content) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error} = await supabase
    .from('posts')
    // This is how you update
    .update({title, content})
    .eq ('id', id)
    .select()

    if (error){
      setFormError('Please fill in all the fields correctly.')
      console.log(error)
    }

    if (data){
      setFormError(null)
      navigate('/')
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
      // from which table do we want data from?
      .from ('posts')
      .select()
      // item column value is equal to the id on the request
      .eq('id', id)
      .single()

      if(error){
        navigate ('/', {replace: true})
      }
      if (data) {
        setTitle (data.title)
        // setAuthor(data.author)
        setContent(data.content)
      }
    }

  fetchPost()
}, [id, navigate])

  return (
    <div className="page update">
       <form onSubmit={handleSubmit} >
        <label htmlFor="title">Title:</label>
        <input 
          type="text" 
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="content">Type your Post here:</label>
        <textarea 
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button>Update Blog Post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>

  )
}

export default Update
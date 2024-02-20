import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [dateCreated, setDateCreated] = useState('')
  const [content, setContent] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    // Prevents page reloading
    e.preventDefault()

    // Won't be able to submit if missing any of the following:
    if (!title || !content) {
      setFormError('Please fill in all the fields correctly.')
      return
    }

    const { data, error } = await supabase
      .from('posts')
      .insert([{ title, content }])
      .select()

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
    if (data) {
      console.log(data)
      // removes error if data is correctly entered
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
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

        <button>Create Blog Post</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default Create
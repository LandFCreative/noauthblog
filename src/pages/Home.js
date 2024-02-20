import { useEffect, useState } from 'react'
import supabase from '../config/supabaseClient'

// components
import Blogpost from '../components/Blogpost'

const Home = () => {

  const [fetchError, setFetchError] = useState(null)
  const [posts, setPosts] = useState(null)
  const [orderBy, setOrderBy] = useState('created_at') 

  const handleDelete =(id) => {
    setPosts(prevPosts => {
      return prevPosts.filter(pt => pt.id !== id) //id is false
     // remove the deleted post from state
  })
}
  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')         // name of the data table
        .select()        // to get them all leave blank
        .order(orderBy, {ascending:false})
 

        if (error) {
          setFetchError('Could not fetch posts')
          setPosts(null)
          console.log(error)
        }
        if (data) {
          setPosts(data)
          setFetchError(null)
        }
    }
    fetchPosts()

  }, [orderBy])
  return (
    <div className="page home">
      {fetchError && (<p>Could not fetch posts</p>)}
      {posts && (
        <div className='posts'>   
        {/* map through each post in the array. order by buttons */}
        <div className="order-by">
            <p>Order by:</p>
            <button onClick={() => setOrderBy('created_at')}>Time Created</button>
            <button onClick={() => setOrderBy('title')}>Title</button>

          </div>
          <div className='post-grid'>
          {posts.map(post => (
            <Blogpost key ={post.id}  post ={post} 
            onDelete={handleDelete} />
          ))} 
          </div>
          </div>
      )}
    </div>
  )
}

export default Home
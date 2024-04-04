import { useEffect, useState } from "react"
import { 
    fetchPosts, 
    createPost, 
    updatePost, 
    deletePost
   } from "./services/apiService";


interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(()=> {
    const getPosts = async() => {
      const postData = await fetchPosts();
      setPosts(postData)
    }
    getPosts()
  },[])

  const handleUpdatePost = async (id: number | string) => {
    const updatedPost = {
      title: 'Updated Post',
      body: `This is an updated post ${Date.now()}`,
      userId: 1,
    }
    console.log('Datos del post actualizado:', updatedPost);

    const post = await updatePost(id, updatedPost)
    console.log('Respuesta de actualización del servidor:', post);

    setPosts(posts.map((p) => p.id === id ? post : p))
    console.log('Posts después de la actualización:', posts);
  }

  const handleDeletePost= async(id: number | string) => {
    await deletePost(id);
    setPosts(posts.filter((p) => p.id !== id))
  }

  const handleCreatepost = async() => {
    const newPost = {
      title: 'New Post',
      body: `This is a new post ${Date.now()}`,
      userId: 1,
    }
    const post = await createPost(newPost);
    setPosts([post, ...posts])
  }

  return(
    <div>
      <h1>Posts</h1>
      <button
       onClick={handleCreatepost}
      >
        Create
      </button>
      {posts.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <button 
          onClick={() => handleUpdatePost(post.id)}
          >
            Update
          </button>
          <button
          onClick={() => handleDeletePost(post.id)}
          >
            Delete
          </button>
        </article>
      ))}
    </div>

  )
}

export default App

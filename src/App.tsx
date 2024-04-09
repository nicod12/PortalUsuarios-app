import { useEffect, useState } from "react"
import { 
    fetchPosts, 
    createPost, 
    updatePost, 
    deletePost
   } from "./services/apiService";
import { ErrorMessage } from "./components/ErrorMessage";
import { PostList } from "./components/PostList";


export interface Post {
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true)
  const [error,setError] = useState(false)

  useEffect(()=> {
    const getPosts = async() => {
     try {
      const postData = await fetchPosts();
      setPosts(postData)
     } catch (error) {
      setError(true)
     } finally {
      setLoading(false)
     }
    }
    getPosts()
  },[])

  const handleUpdatePost = async (id: number | string) => {
    const updatedPost = {
      title: 'Updated Post',
      body: `This is an updated post ${Date.now()}`,
      userId: 1,
    }


    const post = await updatePost(id, updatedPost)
  
    setPosts(posts.map((p) => p.id === id ? post : p))

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

  return (
    <div className="container mx-auto">
      <h1 className="text-center" style={{margin:"20px 0px"}}>Posts</h1>
      <button 
        onClick={handleCreatepost}
        className="btn btn-primary"
      >
        Crear Post
      </button>
      {error ? <ErrorMessage /> : loading ? <h2>Loading...</h2> : <PostList posts={posts} handleUpdatePost={handleUpdatePost} handleDeletePost={handleDeletePost} />}
    </div>
  );
}

export default App

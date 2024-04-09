import { Post } from "../App";


interface Props {
    posts: Post[];
    handleUpdatePost:(id: number | string) => void;
    handleDeletePost:(id: number | string) => void;
}

export const PostList: React.FC<Props> = ({ posts, handleUpdatePost, handleDeletePost }) => {
    return(
        <section 
          style={{display:"flex", flexDirection:"column", maxWidth:"auto", gap:"30px", marginTop:"20px",}}
        >
            {posts.map((post) => (
          <article 
            key={post.id}
            style={{border:"1px solid", padding:"15px",  boxShadow:"2px 3px 3px 2px gray"}}
          >
            <h2>{post.title}</h2>
            <p style={{margin:"10px 0px"}}>{post.body}</p>
            <div
              style={{display:"flex", gap:"10px"}}
            >
              <button 
                className="btn btn-secondary"
                onClick={() => handleUpdatePost(post.id)}
              >
                Actualizar
              </button>
              <button
                className="btn btn-del" 
                onClick={() => handleDeletePost(post.id)}
              >
                  Eliminar
              </button>
            </div>
          </article>
        ))}
      </section>
    )
}
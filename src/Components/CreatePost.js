import { useState } from 'react';
import styles from '../Styles/home.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {addPost} from '../Api'
import {usePosts} from '../hooks'

const CreatePost = () => {
    const [post, setPost] = useState("");
    const [addingPost, setAddingPost] = useState(false);
    const posts = usePosts();

    const handleAddPostClick = async() => {
        setAddingPost(true);

        const response = await addPost(post);
        if (response.success) {
            setPost('');
            posts.addPostToState(response.data.post);
            toast("Post Created Succesfully ")
        } else {
            toast('Error')
        }
        setAddingPost(false);
    }
    return (
      <div className={styles.createPost}>
        <textarea
          className={styles.addPost}
          value= {post}
          onChange={(e) => setPost(e.target.value)}
        />
        <div>
          <button
            className={styles.addPostBtn}
            onClick={handleAddPostClick}
            disabled={addingPost}
          >
          {addingPost ? 'Adding Post...' : 'Add Post'}
          </button>
          <ToastContainer />
        </div>
      </div>
    );
};

export default CreatePost;
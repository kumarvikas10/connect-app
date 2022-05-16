// import PropTypes from 'prop-types';
import styles from '../Styles/home.module.css';
import {Post, CreatePost, FriendList, Loader} from '../Components';
import { useAuth, usePosts } from '../hooks';


const Home = () => {
  const auth = useAuth();
  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }
  return (
    <div className={styles.home}>
      <div className={styles.postsList}>
      <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key= {`post-${post._id}`}/>
        ))}
      </div>
      {auth.user && <FriendList/>}
    </div>
  );
};

// Home.propTypes = {
//   posts: PropTypes.array.isRequired,
// };

export default Home; 
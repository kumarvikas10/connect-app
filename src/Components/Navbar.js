import styles from '../Styles/navbar.module.css';
import logo from './Connect-logo.png'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks';
import { useEffect, useState } from 'react';
import { searchUsers } from '../Api';

const Navbar = () => {
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const auth = useAuth();

  useEffect(() => {
    const fetchUsers =async() => {
      const response = await searchUsers(searchText)
      if(response.success){
        setResults(response.data.users);
      }
    };

    if (searchText.length > 2) {
      fetchUsers();
    }else{
      setResults([]);
    }

  }, [searchText]);

  return (
    <div className={styles.nav}>
      <div className={styles.leftDiv}>
      <Link className={styles.spaceLogo} to="/">
        <div>
          <img className={styles.logo}
            alt=""
            src= {logo}
          />
        </div>
        <div className={styles.logoName}>CONNECT</div>
        </Link>
      </div>

      <div className={styles.searchContainer}>
        <img className={styles.searchIcon} src="https://cdn-icons-png.flaticon.com/128/107/107122.png" alt=""/>
        <input placeholder='search users' value={searchText} onChange={(e) => setSearchText(e.target.value)}/>
        {results.length > 0 && <div className={styles.searchResults}>
          <ul>
            {results.map(user => <li className={styles.searchResultsRow} key={`user-${user._id}`}>
              <Link to={`/user/${user._id}`}>
                <img src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png" alt="" />
                <span>{user.name}</span>
              </Link>
            </li>)}
          </ul>

          </div>}

      </div>

      <div className={styles.rightNav}>
        {auth.user && (
          <div className={styles.user}>
            <Link to="/settings">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
                alt=""
                className={styles.userDp}
              />
            </Link>
            <span>{auth.user.name}</span>
          </div>
        )}
      
        <div className={styles.navLinks}>
          <ul>
            {auth.user ? (
              <>
                <li onClick={auth.logout}>Log out</li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">Log in</Link>
                </li>
                <li>
                  <Link to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
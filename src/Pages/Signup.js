import { useState } from 'react';
import {Navigate, useNavigate} from 'react-router-dom';
import { useAuth } from '../hooks';
import styles from '../Styles/login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signingUp, setSigningUp] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const notify = async () => {
    setSigningUp(true);

    let error = false;
    if (!name || !email || !password || !confirmPassword) {
        toast("Please fill all the fields")
        error = true;
    }

    if (password !== confirmPassword) {
        toast("Make sure password and confirm password matches")
        error = true;
    }

    if (error) {
      return setSigningUp(false);
    }

    const response = await auth.signup(name, email, password, confirmPassword);

    if (response.success) {
      navigate('/login');
      setSigningUp(false);
      toast('User registered successfully, please login now')
    } else {
        toast('Failed to Create account')
    }
    setSigningUp(false);
  }

  if (auth.user){
    return <Navigate to ='/' />
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // setSigningUp(true);

    // setSigningUp(false);
  };

  return (
    <form className={styles.loginForm} onSubmit={handleFormSubmit}>
      <span className={styles.loginSignupHeader}> Signup</span>
      <div className={styles.field}>
        <input
          placeholder="Name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="new-password"
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Confirm password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <input
          placeholder="Password"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className={styles.field}>
        <button disabled={signingUp} onClick={notify}>
          {signingUp ? 'Signing up...' : 'Signup'}
        </button>
        <ToastContainer />
      </div>
    </form>
  );
};

export default Signup;

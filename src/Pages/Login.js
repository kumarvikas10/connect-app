import { useState } from 'react';
import styles from '../Styles/login.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuth } from '../hooks'
import {Navigate} from 'react-router-dom'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loggingIn, setLoggingIn] = useState(false);
    const auth = useAuth();

    console.log(auth);

    const notify = async() => {
        if (!email || !password) {
            toast("Please Enter Email and Password")
            setLoggingIn(false);
        }
        
        const response = await auth.login(email, password);
        
        if (response.success) {
            toast("Succesfully Logged In")
            setLoggingIn(true);
        } else {
            toast('Enter Correct Email and Password')
            setLoggingIn(false);
        }
        
    }

    const handleSumbit = async(e) => {
        e.preventDefault();
        if (!email || !password) {
            setLoggingIn(false);
        }
        else{
            setLoggingIn(true);
        }        
    }

    if (auth.user){
        return <Navigate to ="/" />
      }

    return(
        <form className= {styles.loginForm} onSubmit={handleSumbit}>
            <span className= {styles.loginSignupHeader}>Log In</span>
            <div className={styles.field}>
                <input type='email' placeholder='Email' value={email}  onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles.field}>
                <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <div className={styles.field} >
                <button disabled={loggingIn} onClick={notify}>{loggingIn ? 'logging in...' : 'log In'}</button>
                <ToastContainer />
            </div>
        </form>
    );
}

export default Login;
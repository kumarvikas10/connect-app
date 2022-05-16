import styles from '../Styles/settings.module.css';
import { useAuth } from '../hooks';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Settings = () => {
  const auth = useAuth();
  const [name, setName] = useState(auth.user?.name ? auth.user.name : '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [savingForm, setSavingForm] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const clearForm = () => {
      setPassword('');
      setConfirmPassword('');
  }

  const updateProfile= async() => {
      setSavingForm(true);

      let error = false;

      if(!name || !password || !confirmPassword) {
        toast("Please fill all the fields")
        error= true;
      }

      if (password !== confirmPassword){
        toast("Password and confirm Password does not match")
        error= true;
      }
      
      if(error){
          return setSavingForm(false);
      }

      const response = await auth.updateUser(auth.user._id, name, password, confirmPassword);

      if (response.success){
          setEditMode(false);
          setSavingForm(false);
          clearForm();
          return toast('User updated Successfully')

      } else{
        toast('Failed to update user profile')
      }
      setSavingForm(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3237/3237472.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <div>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
        </div>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button className={`button ${styles.saveBtn}`} onClick={updateProfile} disabled={savingForm}>
              {savingForm ? 'Saving Profile...' : 'Save Profile'}
            </button>
            <ToastContainer />
            <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(false)}>
              Go Back
            </button>
          </>
        ) : (
            <>
            <button className={`button ${styles.editBtn}`} onClick={() => setEditMode(true)}>Edit Profile</button>
            <ToastContainer />
            </>
        )}
      </div>
    </div>
  );
};

export default Settings;

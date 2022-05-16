import { HashRouter as Router} from "react-router-dom";
import { Routes, Route, Navigate} from "react-router-dom";
import { useAuth } from "../hooks";
import { Home, Login, Signup, Settings, UserProfile} from '../Pages';
import {Loader} from './';
import {Navbar} from './';

// const UserInfo = () => {
//   return <h1>User</h1>
// }

const Page404 = () => {
  return <div>
    <h1>Error 404</h1>
  </div>  
}

function PrivateRoute({ children, ...rest}) {
  const auth = useAuth();
  return auth.user ? children : <Navigate to="/login" />;
}

function App() {
  const auth = useAuth();
  
  if (auth.loading) {
    return <Loader />
  }
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="/user/:userId" element={<PrivateRoute> <UserProfile /> </PrivateRoute> }>
          </Route>
          <Route path="/login" element={<Login />}>
          </Route>
          <Route path="/register" element={<Signup />}>
          </Route>
          <Route path="/settings" element={<PrivateRoute> <Settings /> </PrivateRoute> }>
          </Route>
          {/* <Route path="/settings" element={<Settings />}>
          </Route> */}
          <Route path= "*" element={<Page404 />}>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;


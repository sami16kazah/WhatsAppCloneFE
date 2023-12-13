import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { useSelector } from 'react-redux';

function App() {
  const { user } = useSelector((state) => state.user);

  const { token } = user;

  console.log(user);
  return (
    <div className="dark">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              token ? (
                <Home socket={'socket'} />
              ) : (
                <Navigate to="/login"></Navigate>
              )
            }
          />
          <Route
            exact
            path="/login"
            element={!token ? <Login /> : <Navigate to="/"></Navigate>}
          />
          <Route
            exact
            path="/register"
            element={!token ? <Register /> : <Navigate to="/"></Navigate>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

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
import { io } from 'socket.io-client';
import SocketContext from './context/SocketContext';
const socket = io(process.env.REACT_APP_API_ENDPOINT_SOCKET);
function App() {
  const { user } = useSelector((state) => state.user);

  const { token } = user;

  return (
    <div className="dark">
      <SocketContext.Provider value={socket}>
        <Router>
          <Routes>
            <Route
              exact
              path="/"
              element={
                token ? (
                  <Home socket={socket} />
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
      </SocketContext.Provider>
    </div>
  );
}

export default App;

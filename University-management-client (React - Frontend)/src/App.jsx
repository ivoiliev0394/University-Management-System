import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import Students from './pages/Students';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';

import PrivateGuard from './guards/PrivateGuard';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/students"
          element={
            <PrivateGuard>
              <Students />
            </PrivateGuard>
          }
        />

        {/* ❗ Login/Register БЕЗ GuestGuard */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

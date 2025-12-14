import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onLogin = () => {
    login({ email: 'test@test.com' });
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={onLogin}>Fake Login</button>
    </div>
  );
}


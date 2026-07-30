import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login({ email, password });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6)', backgroundSize: '40px 40px' }}>
      <div className="w-full max-w-md manga-box bg-white p-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-manga tracking-wider uppercase mb-2">LOGIN</h1>
          <p className="text-sm font-bold bg-black text-white inline-block px-3 py-1 transform -skew-x-12">WELCOME BACK TO PANEL</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl font-manga tracking-widest uppercase mb-2">EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              placeholder="ENTER YOUR EMAIL"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-manga tracking-widest uppercase mb-2">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="ENTER YOUR PASSWORD"
              required
            />
          </div>

          {error && (
            <p className="text-sm font-bold text-white bg-red-600 border-2 border-black p-3 transform rotate-1">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full text-xl"
          >
            {loading ? 'LOGGING IN...' : 'LOGIN'}
          </button>
        </form>

        <p className="text-center text-sm font-bold mt-8">
          DON'T HAVE AN ACCOUNT?{' '}
          <Link to="/register" className="text-black underline decoration-2 hover:bg-black hover:text-white px-1 transition-colors">
            REGISTER
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

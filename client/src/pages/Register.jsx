import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    navigate('/', { replace: true });
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6)', backgroundSize: '40px 40px' }}>
      <div className="w-full max-w-md manga-box bg-white p-8">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-manga tracking-wider uppercase mb-2">REGISTER</h1>
          <p className="text-sm font-bold bg-black text-white inline-block px-3 py-1 transform -skew-x-12">CREATE YOUR PANEL ACCOUNT</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xl font-manga tracking-widest uppercase mb-2">FULL NAME</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input-field"
              placeholder="ENTER YOUR FULL NAME"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-manga tracking-widest uppercase mb-2">EMAIL</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input-field"
              placeholder="ENTER YOUR EMAIL"
              required
            />
          </div>
          <div>
            <label className="block text-xl font-manga tracking-widest uppercase mb-2">PASSWORD</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              placeholder="MINIMUM 6 CHARACTERS"
              minLength={6}
              required
            />
          </div>
          <div>
            <label className="block text-xl font-manga tracking-widest uppercase mb-2">CONFIRM PASSWORD</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input-field"
              placeholder="CONFIRM YOUR PASSWORD"
              minLength={6}
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
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        <p className="text-center text-sm font-bold mt-8">
          ALREADY HAVE AN ACCOUNT?{' '}
          <Link to="/login" className="text-black underline decoration-2 hover:bg-black hover:text-white px-1 transition-colors">
            LOGIN
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { HiOutlineCheck } from 'react-icons/hi';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    street: user?.address?.street || '',
    city: user?.address?.city || '',
    state: user?.address?.state || '',
    zipCode: user?.address?.zipCode || '',
    country: user?.address?.country || '',
  });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (password && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
      };

      if (password) {
        updateData.password = password;
      }

      await updateProfile(updateData);
      setSuccess(true);
      setPassword('');
      setConfirmPassword('');
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-manga tracking-widest uppercase mb-4 border-b-8 border-black pb-4 inline-block transform -rotate-1 bg-yellow-300 px-4">PROFILE</h1>
        <p className="text-lg font-bold bg-black text-white inline-block px-3 py-1 mb-12 transform skew-x-12">{user?.email}</p>

        <form onSubmit={handleSubmit} className="space-y-8 manga-box bg-white p-8">
          {/* Personal Info */}
          <div>
            <h2 className="text-2xl font-manga tracking-widest uppercase mb-6 border-b-4 border-black pb-2">PERSONAL INFORMATION</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">FULL NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">PHONE</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h2 className="text-2xl font-manga tracking-widest uppercase mb-6 border-b-4 border-black pb-2 mt-8">ADDRESS</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">STREET</label>
                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xl font-manga tracking-widest uppercase mb-2">CITY</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xl font-manga tracking-widest uppercase mb-2">STATE</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xl font-manga tracking-widest uppercase mb-2">ZIP CODE</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-xl font-manga tracking-widest uppercase mb-2">COUNTRY</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <h2 className="text-2xl font-manga tracking-widest uppercase mb-6 border-b-4 border-black pb-2 mt-8">CHANGE PASSWORD</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">NEW PASSWORD</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field"
                  placeholder="LEAVE BLANK TO KEEP CURRENT"
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-xl font-manga tracking-widest uppercase mb-2">CONFIRM NEW PASSWORD</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-field"
                  placeholder="CONFIRM NEW PASSWORD"
                  minLength={6}
                />
              </div>
            </div>
          </div>

          {error && <p className="text-sm font-bold text-white bg-red-600 border-2 border-black p-3 transform rotate-1">{error}</p>}
          {success && (
            <p className="text-sm font-bold text-black bg-green-400 border-2 border-black p-3 flex items-center gap-2 transform -rotate-1">
              <HiOutlineCheck size={20} strokeWidth={3} /> PROFILE UPDATED SUCCESSFULLY
            </p>
          )}

          <button type="submit" disabled={loading} className="btn-primary w-full text-xl mt-8">
            {loading ? 'SAVING...' : 'SAVE CHANGES'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;

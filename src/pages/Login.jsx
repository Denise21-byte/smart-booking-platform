import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) { navigate('/'); return null; }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { setError('Please fill in all fields.'); return; }
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center px-6 py-12 bg-gradient-to-br from-stone-50 to-stone-200">
      <div className="bg-white border border-stone-200 rounded-3xl px-10 py-12 w-full max-w-md shadow-xl animate-[fadeUp_0.4s_ease]">

        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 font-serif text-xl font-semibold text-stone-900 mb-6">
            <span className="text-orange-600">◆</span> StayScape
          </Link>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">Welcome back</h1>
          <p className="text-sm text-stone-400">Sign in to manage your trips and favorites</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-stone-800">Email address</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              className="px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-900 bg-stone-50 focus:outline-none focus:border-orange-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-stone-800">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="px-4 py-3 border border-stone-200 rounded-xl text-sm text-stone-900 bg-stone-50 focus:outline-none focus:border-orange-400 transition-colors"
            />
          </div>

          {error && <p className="text-xs text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-orange-600 text-white rounded-xl font-semibold text-base hover:bg-orange-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-1"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <p className="text-center text-xs text-stone-400 mt-6 leading-relaxed">
          Any email + password works for this demo.<br />
          Your data is stored locally on your device.
        </p>
      </div>
    </div>
  );
}
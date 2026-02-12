// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { Rocket } from 'lucide-react';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         try {
//             await login(email, password);
//             navigate('/dashboard');
//         } catch (err) {
//             setError('Invalid email or password');
//         }
//     };

//     return (
//         <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
//             <motion.div
//                 className="glass-panel"
//                 style={{ padding: '2.5rem', width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
//                     <div style={{ display: 'inline-block', padding: '12px', background: 'rgba(0, 212, 255, 0.1)', borderRadius: '50%', marginBottom: '1rem' }}>
//                         <Rocket size={40} color="var(--accent-color)" />
//                     </div>
//                     <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Welcome Back</h2>
//                     <p style={{ color: 'var(--text-secondary)' }}>Login to access mission control</p>
//                 </div>

//                 {error && <div style={{ background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '10px', borderRadius: '4px', textAlign: 'center' }}>{error}</div>}

//                 <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
//                     <input
//                         type="email"
//                         placeholder="Email Address"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                         style={{ padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', outline: 'none' }}
//                         required
//                     />

//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         style={{ padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white', borderRadius: '8px', outline: 'none' }}
//                         required
//                     />

//                     <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', fontSize: '1.1rem' }}>Login</button>
//                 </form>

//                 <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
//                     Don't have an account? <Link to="/register" style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Sign Up</Link>
//                 </p>
//             </motion.div>
//         </div>
//     );
// };

// export default Login;



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="
          w-full max-w-md
          backdrop-blur-xl bg-white/5
          border border-white/10
          rounded-2xl
          p-10
          flex flex-col gap-6
          shadow-2xl
        "
      >
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-400/10 mb-4">
            <Rocket size={40} className="text-cyan-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="text-gray-400">Login to access mission control</p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-2 rounded text-center text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="
              px-4 py-3 rounded-lg
              bg-white/5
              border border-white/10
              text-white
              placeholder-gray-400
              outline-none
              focus:border-cyan-400
              focus:ring-2 focus:ring-cyan-400/30
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="
              px-4 py-3 rounded-lg
              bg-white/5
              border border-white/10
              text-white
              placeholder-gray-400
              outline-none
              focus:border-cyan-400
              focus:ring-2 focus:ring-cyan-400/30
            "
          />

          <button
            type="submit"
            className="
              mt-2 py-3 rounded-lg
              bg-cyan-500 hover:bg-cyan-400
              text-black font-semibold text-lg
              transition-all duration-200
              shadow-lg shadow-cyan-500/30
            "
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-400 text-sm">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="text-cyan-400 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;


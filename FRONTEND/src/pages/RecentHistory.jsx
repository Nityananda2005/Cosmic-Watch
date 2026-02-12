// import React, { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import { Clock, ExternalLink, ArrowRight } from 'lucide-react';
// import AsteroidService from '../services/asteroid.service';
// import Sidebar from '../components/Sidebar';
// import { Link } from 'react-router-dom';

// const RecentHistory = () => {
//     const [history, setHistory] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchHistory();
//     }, []);

//     const fetchHistory = async () => {
//         setLoading(true);
//         try {
//             const data = await AsteroidService.getHistory();
//             // Backend returns { count: N, data: [...] }
//             setHistory(data.data || []);
//         } catch (err) {
//             console.error("Failed to fetch history", err);
//             setError("Failed to load history.");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         return new Intl.DateTimeFormat('en-US', {
//             month: 'short',
//             day: 'numeric',
//             hour: '2-digit',
//             minute: '2-digit'
//         }).format(date);
//     };

//     return (
//         <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#050505', color: 'white' }}>
//             <Sidebar />

//             <main style={{ marginLeft: '240px', flex: 1, padding: '2rem 3rem' }}>
//                 <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                     <div>
//                         <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Recent History</h1>
//                         <p style={{ color: '#888' }}>Asteroids you've viewed recently</p>
//                     </div>
//                 </header>

//                 {loading ? (
//                     <div style={{ color: '#666', marginTop: '2rem' }}>Loading history...</div>
//                 ) : error ? (
//                     <div style={{ color: '#ff4d4d', marginTop: '2rem' }}>{error}</div>
//                 ) : history.length === 0 ? (
//                     <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: '#666' }}>
//                         <Clock size={48} style={{ opacity: 0.3, marginBottom: '1rem' }} />
//                         <h3>No viewing history</h3>
//                         <p>Explore asteroid details to build your history.</p>
//                     </div>
//                 ) : (
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                         {history.map((item, index) => (
//                             <motion.div
//                                 key={index}
//                                 initial={{ opacity: 0, x: -20 }}
//                                 animate={{ opacity: 1, x: 0 }}
//                                 transition={{ delay: index * 0.05 }}
//                                 className="glass-panel"
//                                 style={{
//                                     background: '#0a0a0e',
//                                     border: '1px solid rgba(255,255,255,0.08)',
//                                     padding: '1.5rem',
//                                     borderRadius: '16px',
//                                     display: 'flex',
//                                     justifyContent: 'space-between',
//                                     alignItems: 'center'
//                                 }}
//                             >
//                                 <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
//                                     <div style={{
//                                         width: '40px',
//                                         height: '40px',
//                                         borderRadius: '50%',
//                                         background: 'rgba(255,255,255,0.05)',
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         justifyContent: 'center'
//                                     }}>
//                                         <Clock size={20} color="#888" />
//                                     </div>
//                                     <div>
//                                         <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '0.2rem' }}>
//                                             {item.name.replace(/[()]/g, '')}
//                                         </h3>
//                                         <div style={{ fontSize: '0.85rem', color: '#666' }}>
//                                             Viewed on {formatDate(item.viewedAt)}
//                                         </div>
//                                     </div>
//                                 </div>

//                                 <Link
//                                     to={`/asteroid/${item.neo_reference_id}`}
//                                     style={{
//                                         display: 'flex',
//                                         alignItems: 'center',
//                                         gap: '0.5rem',
//                                         color: '#ccc',
//                                         textDecoration: 'none',
//                                         padding: '8px 16px',
//                                         borderRadius: '8px',
//                                         background: 'rgba(255,255,255,0.03)',
//                                         transition: 'all 0.2s'
//                                     }}
//                                     onMouseOver={(e) => {
//                                         e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
//                                         e.currentTarget.style.color = 'white';
//                                     }}
//                                     onMouseOut={(e) => {
//                                         e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
//                                         e.currentTarget.style.color = '#ccc';
//                                     }}
//                                 >
//                                     View Again <ArrowRight size={16} />
//                                 </Link>
//                             </motion.div>
//                         ))}
//                     </div>
//                 )}
//             </main>
//         </div>
//     );
// };

// export default RecentHistory;

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import AsteroidService from '../services/asteroid.service';
import DashboardLayout from '../components/DashboardLayout';
import { Link } from 'react-router-dom';

const RecentHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const data = await AsteroidService.getHistory();
      setHistory(data?.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load history.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) =>
    new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));

  return (
    <DashboardLayout>
      <div className="container-responsive px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8 lg:mb-12">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Recent History</h1>
            <p className="text-gray-400">
              Asteroids you’ve viewed recently
            </p>
          </header>

          {/* STATES */}
          {loading ? (
            <div className="text-gray-500">Loading history...</div>
          ) : error ? (
            <div className="text-red-400">{error}</div>
          ) : history.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-12 sm:p-16 lg:p-20 text-center text-gray-400">
              <Clock size={48} className="mx-auto mb-4 opacity-40" />
              <h3 className="text-xl font-semibold">No viewing history</h3>
              <p>Explore asteroid details to build your history.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {history.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-zinc-950 border border-white/10 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Clock size={18} className="text-gray-400" />
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        {item.name.replace(/[()]/g, '')}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Viewed on {formatDate(item.viewedAt)}
                      </p>
                    </div>
                  </div>

                  <Link
                    to={`/asteroid/${item.neo_reference_id}`}
                    className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-300 font-medium hover:bg-white/10 hover:text-white transition shrink-0"
                  >
                    View Again <ArrowRight size={16} />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RecentHistory;


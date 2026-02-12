import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Rocket, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setMenuOpen(false);
    };

    const navLinks = (
        <>
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link>
            <Link to="/about" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link>
            <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>Dashboard</Link>
        </>
    );

    return (
        <>
            <nav
                className="navbar-mobile-bar fixed top-0 left-0 right-0 w-full z-[1000] flex justify-between items-center bg-black/90 backdrop-blur-md border-b border-white/10 min-w-0"
                style={{ width: '100%', maxWidth: '100vw' }}
            >
                <Link
                    to="/"
                    className="flex items-center gap-2 min-w-0 flex-shrink text-lg sm:text-xl font-bold no-underline text-white"
                    onClick={() => setMenuOpen(false)}
                >
                    <Rocket size={22} className="sm:w-6 sm:h-6 flex-shrink-0" color="var(--accent-purple)" />
                    <span className="glow-text hidden sm:inline truncate">Cosmic Watch</span>
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex gap-6 lg:gap-8 items-center flex-shrink-0">
                    {navLinks}
                    {currentUser ? (
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-[var(--text-primary)] font-medium">
                                <div className="p-2 rounded-full bg-white/10 flex">
                                    <User size={18} />
                                </div>
                                <span className="max-w-[120px] truncate lg:max-w-none">
                                    {currentUser.firstname || currentUser.name || currentUser.email}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="p-2 rounded-lg border border-white/20 text-[var(--text-secondary)] hover:border-[var(--accent-color)] hover:text-[var(--text-primary)] transition"
                                title="Logout"
                            >
                                <LogOut size={16} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-primary px-4 py-2 rounded-lg">Login</Link>
                    )}
                </div>

                {/* Mobile menu button */}
                <button
                    type="button"
                    className="md:hidden p-2.5 rounded-lg hover:bg-white/10 text-white flex-shrink-0 touch-manipulation"
                    onClick={() => setMenuOpen((o) => !o)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
            </nav>

            {/* Mobile dropdown */}
<div
                className={`md:hidden fixed top-[64px] left-0 right-0 w-full bg-black/95 backdrop-blur-md border-b border-white/10 z-[999]
                transition-all duration-300 ease-in-out
                ${menuOpen
                    ? 'max-h-[500px] opacity-100 pointer-events-auto'
                    : 'max-h-0 opacity-0 pointer-events-none'}
                overflow-hidden`}
            >
                <div className="flex flex-col gap-1 px-4 py-3">
                    <Link to="/" className="nav-link py-3" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/about" className="nav-link py-3" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/dashboard" className="nav-link py-3" onClick={() => setMenuOpen(false)}>Dashboard</Link>

                    {currentUser ? (
                        <>
                            <div className="flex items-center gap-2 py-3 text-gray-300 text-sm">
                                <User size={18} />
                                <span className="truncate">
                                    {currentUser.firstname || currentUser.name || currentUser.email}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="nav-link py-3 flex items-center gap-2"
                            >
                                <LogOut size={18} /> Logout
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="btn-primary text-center py-3 mt-2 rounded-lg"
                            onClick={() => setMenuOpen(false)}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </>
    );
};

export default Navbar;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Rocket, User, LogOut, Menu, X } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//     const { currentUser, logout } = useAuth();
//     const navigate = useNavigate();
//     const [menuOpen, setMenuOpen] = useState(false);

//     const handleLogout = () => {
//         logout();
//         navigate('/login');
//         setMenuOpen(false);
//     };

//     return (
//         <>
//             <nav
//                 className="navbar-mobile-bar fixed top-0 left-0 right-0 w-full z-[1000] flex justify-between items-center bg-black/90 backdrop-blur-md border-b border-white/10 min-w-0"
//                 style={{ width: '100%', maxWidth: '100vw' }}
//             >
//                 <Link
//                     to="/"
//                     className="flex items-center gap-2 min-w-0 flex-shrink text-lg sm:text-xl font-bold no-underline text-white"
//                     onClick={() => setMenuOpen(false)}
//                 >
//                     <Rocket size={22} className="sm:w-6 sm:h-6 flex-shrink-0" color="var(--accent-purple)" />
//                     <span className="glow-text hidden sm:inline truncate">Cosmic Watch</span>
//                 </Link>

//                 {/* Mobile menu button */}
//                 <button
//                     type="button"
//                     className="md:hidden p-2.5 rounded-lg hover:bg-white/10 text-white flex-shrink-0"
//                     onClick={() => setMenuOpen((o) => !o)}
//                     aria-label={menuOpen ? 'Close menu' : 'Open menu'}
//                 >
//                     {menuOpen ? <X size={22} /> : <Menu size={22} />}
//                 </button>
//             </nav>

//             {/* ✅ FIXED Mobile dropdown */}
//             <div
//                 className={`md:hidden fixed top-[64px] left-0 right-0 w-full bg-black/95 backdrop-blur-md border-b border-white/10 z-[999]
//                 transition-all duration-300 ease-in-out
//                 ${menuOpen
//                     ? 'max-h-[500px] opacity-100 pointer-events-auto'
//                     : 'max-h-0 opacity-0 pointer-events-none'}
//                 overflow-hidden`}
//             >
//                 <div className="flex flex-col gap-1 px-4 py-3">
//                     <Link to="/" className="nav-link py-3" onClick={() => setMenuOpen(false)}>Home</Link>
//                     <Link to="/about" className="nav-link py-3" onClick={() => setMenuOpen(false)}>About</Link>
//                     <Link to="/dashboard" className="nav-link py-3" onClick={() => setMenuOpen(false)}>Dashboard</Link>

//                     {currentUser ? (
//                         <>
//                             <div className="flex items-center gap-2 py-3 text-gray-300 text-sm">
//                                 <User size={18} />
//                                 <span className="truncate">
//                                     {currentUser.firstname || currentUser.name || currentUser.email}
//                                 </span>
//                             </div>
//                             <button
//                                 onClick={handleLogout}
//                                 className="nav-link py-3 flex items-center gap-2"
//                             >
//                                 <LogOut size={18} /> Logout
//                             </button>
//                         </>
//                     ) : (
//                         <Link
//                             to="/login"
//                             className="btn-primary text-center py-3 mt-2 rounded-lg"
//                             onClick={() => setMenuOpen(false)}
//                         >
//                             Login
//                         </Link>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default Navbar;

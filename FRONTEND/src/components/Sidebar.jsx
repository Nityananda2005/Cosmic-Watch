import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, LayoutDashboard, List, Bell, Clock, X } from 'lucide-react';

const SIDEBAR_WIDTH = 260;

const Sidebar = ({ isOpen = false, onClose, onNavigate }) => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    const navItems = [
        { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
        { icon: <List size={20} />, label: 'Watchlist', path: '/watchlist' },
        { icon: <Bell size={20} />, label: 'Alerts', path: '/alerts' },
        { icon: <Clock size={20} />, label: 'Recent History', path: '/recent-history' },
    ];

    const handleLinkClick = () => {
        onNavigate?.();
    };

    return (
        <>
            <aside
                className={`sidebar-drawer ${isOpen ? 'sidebar-drawer--open' : ''}`}
                style={{
                    width: SIDEBAR_WIDTH,
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    backgroundColor: '#050505',
                    borderRight: '1px solid rgba(255,255,255,0.1)',
                    padding: '2rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 100,
                    transition: 'transform 0.25s ease',
                }}
            >
                {/* Close button - visible only on mobile when open */}
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        className="lg:hidden absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-gray-400"
                        aria-label="Close menu"
                    >
                        <X size={20} />
                    </button>
                )}

                <Link
                    to="/"
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 mb-12 pl-1 no-underline"
                    style={{ color: 'white' }}
                >
                    <div style={{ background: 'var(--accent-purple)', padding: '6px', borderRadius: '8px', display: 'flex' }}>
                        <Rocket size={20} color="white" />
                    </div>
                    <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Cosmic Watch</span>
                </Link>

                <nav className="flex flex-col gap-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            onClick={handleLinkClick}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '12px 16px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                color: isActive(item.path) ? 'white' : '#888',
                                backgroundColor: isActive(item.path) ? 'var(--accent-purple)' : 'transparent',
                                transition: 'all 0.2s',
                                fontWeight: isActive(item.path) ? '600' : 'normal',
                            }}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
export { SIDEBAR_WIDTH };

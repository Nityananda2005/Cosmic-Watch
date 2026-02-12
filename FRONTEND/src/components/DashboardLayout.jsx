import React, { useState } from 'react';
import Sidebar from './Sidebar';

/**
 * Wraps dashboard-style pages with responsive sidebar.
 * - Desktop (lg+): Sidebar always visible, content with left margin.
 * - Mobile/Tablet: Sidebar as overlay drawer, hamburger in header opens it.
 */
const DashboardLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-[#050505] text-white">
            {/* Mobile overlay when sidebar is open */}
            <div
                className="fixed inset-0 bg-black/60 z-[99] lg:hidden transition-opacity"
                style={{ opacity: sidebarOpen ? 1 : 0, pointerEvents: sidebarOpen ? 'auto' : 'none' }}
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
            />

            <Sidebar
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onNavigate={() => setSidebarOpen(false)}
            />

            {/* Mobile/Tablet: only sidebar icon on the left - no navbar */}
            <header className="fixed top-0 left-0 right-0 h-14 px-3 flex items-center bg-[#050505]/95 border-b border-white/10 z-[97] lg:hidden">
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="p-2.5 rounded-lg hover:bg-white/10 transition text-white"
                    aria-label="Open menu"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
            </header>

            {/* Main content: padding for mobile header, margin for desktop sidebar */}
            <main className="flex-1 w-full min-w-0 pt-14 lg:pt-0 lg:ml-[260px] transition-[margin]">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;

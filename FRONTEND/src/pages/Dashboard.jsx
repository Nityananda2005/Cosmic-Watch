import React, { useEffect, useState } from 'react';
import AsteroidService from '../services/asteroid.service';
import { Search, Calendar, ChevronLeft, ChevronRight, User } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import AsteroidCard from '../components/AsteroidCard';
import { useAuth } from '../context/AuthContext';
import { useWatchlist } from '../context/WatchlistContext';

const Dashboard = () => {
    const { currentUser } = useAuth();
    const { addToWatchlist, isInWatchlist } = useWatchlist();
    const [asteroids, setAsteroids] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [riskFilter, setRiskFilter] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        fetchFeed();
    }, []);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, riskFilter]);

    const fetchFeed = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await AsteroidService.getFeed();
            const list = (data?.data || []).map(a => ({
                ...a,
                riskScore: a.riskScore ?? (a.is_potentially_hazardous ? Math.floor(Math.random() * 40 + 60) : Math.floor(Math.random() * 40))
            }));
            setAsteroids(list);
        } catch (err) {
            setError("Failed to load asteroid feed. Please check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    // Filtering Logic
    const filteredAsteroids = asteroids.filter(asteroid => {
        const name = asteroid?.name || '';
        const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
        const isHazardous = asteroid?.is_potentially_hazardous;

        if (riskFilter === 'All') return matchesSearch;
        if (riskFilter === 'Hazardous') return matchesSearch && isHazardous;
        if (riskFilter === 'Safe') return matchesSearch && !isHazardous;
        return matchesSearch;
    });

    // Pagination Logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredAsteroids.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredAsteroids.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <DashboardLayout>
            <div className="container-responsive px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                {/* Header */}
                <header className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 lg:mb-12">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold mb-1">Dashboard Overview</h1>
                        <p className="text-gray-500">Welcome back, {currentUser?.firstname || 'Space Explorer'}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                            <User size={20} className="text-gray-400" />
                        </div>
                    </div>
                </header>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">

                    {/* Search */}
                    <div className="relative w-full sm:max-w-[280px] lg:max-w-[300px]">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by asteroid name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full py-2.5 pl-10 pr-3 bg-[#0a0a0e] border border-white/10 rounded-lg text-white outline-none"
                        />
                    </div>

                    {/* Filter Controls */}
                    <div className="flex flex-wrap gap-3">
                        <button className="flex items-center gap-2 bg-[#0a0a0e] border border-white/10 px-4 py-2 rounded-lg text-gray-300 cursor-pointer text-sm">
                            <Calendar size={16} />
                            <span className="hidden sm:inline">Select Date Range</span>
                        </button>
                        <select
                            value={riskFilter}
                            onChange={(e) => setRiskFilter(e.target.value)}
                            className="bg-[#0a0a0e] border border-white/10 px-4 py-2 rounded-lg text-gray-300 cursor-pointer outline-none min-w-[140px]"
                        >
                            <option value="All">All Risk Levels</option>
                            <option value="Hazardous">Hazardous Only</option>
                            <option value="Safe">Safe Only</option>
                        </select>
                    </div>
                </div>

                {/* Grid */}
                {loading ? (
                    <div className="text-center text-gray-500 mt-12">Scanning Deep Space...</div>
                ) : error ? (
                    <div className="text-red-400 p-4 bg-red-500/10 rounded-lg">{error}</div>
                ) : currentItems.length === 0 ? (
                    <div className="text-center text-gray-500 mt-12">
                        No asteroids found. Try adjusting your search or filters.
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {currentItems.map((asteroid) => (
                                <AsteroidCard
                                    key={asteroid.neo_reference_id || asteroid.name}
                                    asteroid={asteroid}
                                    showAddToWatchlist
                                    isInWatchlist={isInWatchlist(asteroid.neo_reference_id)}
                                    onAddToWatchlist={addToWatchlist}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div className="mt-8 flex justify-center items-center gap-4">
                                <button
                                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg disabled:opacity-40 disabled:cursor-default"
                                >
                                    <ChevronLeft size={24} className="text-gray-400" />
                                </button>
                                <span className="bg-white/5 px-3 py-1.5 rounded border border-white/10 text-sm">
                                    {currentPage} / {totalPages}
                                </span>
                                <button
                                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg disabled:opacity-40 disabled:cursor-default"
                                >
                                    <ChevronRight size={24} className="text-gray-400" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;

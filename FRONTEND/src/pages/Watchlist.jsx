import React from 'react';
import { Trash2, AlertOctagon } from 'lucide-react';
import DashboardLayout from '../components/DashboardLayout';
import AsteroidCard from '../components/AsteroidCard';
import { useWatchlist } from '../context/WatchlistContext';

const Watchlist = () => {
    const { watchlist, loading, removeFromWatchlist } = useWatchlist();

    return (
        <DashboardLayout>
            <div className="container-responsive px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
                <header className="mb-8 lg:mb-12">
                    <h1 className="text-2xl sm:text-3xl font-bold mb-1">Your Watchlist</h1>
                    <p className="text-gray-500">{watchlist.length} Asteroids Monitored</p>
                </header>

                {loading ? (
                    <div className="text-gray-500">Syncing with observatory...</div>
                ) : watchlist.length === 0 ? (
                    <div className="glass-panel text-center py-16 px-6 text-gray-500 rounded-2xl">
                        <AlertOctagon size={48} className="mx-auto mb-4 opacity-50" />
                        <h3 className="text-lg font-semibold">Your watchlist is empty</h3>
                        <p>Track hazardous asteroids from the Dashboard or Details page.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {watchlist.map((item) => (
                            <div key={item.neo_reference_id} className="relative">
                                <AsteroidCard asteroid={item} />
                                <button
                                    onClick={() => removeFromWatchlist(item.neo_reference_id)}
                                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 border border-red-500/30 text-red-400 flex items-center justify-center cursor-pointer z-10 hover:bg-red-500/20"
                                    title="Remove from Watchlist"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Watchlist;

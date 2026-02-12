import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsteroidService from '../services/asteroid.service';

const WatchlistContext = createContext();

export const useWatchlist = () => useContext(WatchlistContext);

const STORAGE_KEY = 'cosmic_watchlist';

export const WatchlistProvider = ({ children }) => {
    const [watchlist, setWatchlist] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchWatchlist = useCallback(async () => {
        setLoading(true);
        try {
            const data = await AsteroidService.getWatchlist();
            setWatchlist(Array.isArray(data) ? data : (data?.data || []));
        } catch (err) {
            const stored = localStorage.getItem(STORAGE_KEY);
            setWatchlist(stored ? JSON.parse(stored) : []);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWatchlist();
    }, [fetchWatchlist]);

    const addToWatchlist = useCallback(async (asteroid) => {
        try {
            const result = await AsteroidService.addToWatchlist(asteroid);
            setWatchlist(prev => {
                const exists = prev.some(w => String(w.neo_reference_id) === String(asteroid.neo_reference_id));
                if (exists) return prev;
                const newItem = result?.neo_reference_id ? result : { ...asteroid, ...result };
                return [...prev, newItem];
            });
            return { success: true };
        } catch (err) {
            const item = {
                neo_reference_id: asteroid.neo_reference_id,
                name: asteroid.name,
                miss_distance_km: asteroid.miss_distance_km,
                velocity_kmph: asteroid.velocity_kmph,
                is_potentially_hazardous: asteroid.is_potentially_hazardous,
                close_approach_date: asteroid.close_approach_date,
                riskScore: asteroid.riskScore
            };
            setWatchlist(prev => {
                const exists = prev.some(w => String(w.neo_reference_id) === String(asteroid.neo_reference_id));
                if (exists) return prev;
                const next = [...prev, item];
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                return next;
            });
            return { success: true };
        }
    }, []);

    const removeFromWatchlist = useCallback(async (neoId) => {
        try {
            await AsteroidService.removeFromWatchlist(neoId);
            setWatchlist(prev => {
                const next = prev.filter(w => String(w.neo_reference_id) !== String(neoId));
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                return next;
            });
            return { success: true };
        } catch (err) {
            setWatchlist(prev => {
                const next = prev.filter(w => String(w.neo_reference_id) !== String(neoId));
                localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
                return next;
            });
            return { success: true };
        }
    }, []);

    const isInWatchlist = useCallback((neoId) => {
        return watchlist.some(w => String(w.neo_reference_id) === String(neoId));
    }, [watchlist]);

    return (
        <WatchlistContext.Provider value={{
            watchlist,
            loading,
            fetchWatchlist,
            addToWatchlist,
            removeFromWatchlist,
            isInWatchlist
        }}>
            {children}
        </WatchlistContext.Provider>
    );
};

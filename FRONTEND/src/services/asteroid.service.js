import api from './api';
import axios from 'axios';

// Simple risk score for NASA fallback (matches backend logic)
const calculateRiskScore = ({ miss_distance_km, diameter_min_km, diameter_max_km, is_potentially_hazardous }) => {
    const avgDiameter = (diameter_min_km + diameter_max_km) / 2;
    let score = 0;
    if (miss_distance_km < 500000) score += 50;
    else if (miss_distance_km < 1500000) score += 30;
    else if (miss_distance_km < 5000000) score += 10;
    if (avgDiameter > 0.5) score += 30;
    else if (avgDiameter > 0.15) score += 20;
    else if (avgDiameter > 0.05) score += 10;
    if (is_potentially_hazardous) score += 20;
    return Math.min(score, 100);
};

const AsteroidService = {
    getFeed: async (startDate, endDate) => {
        const params = {};
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;

        try {
            const response = await api.get('/asteroids/feed', { params });
            return response.data;
        } catch (err) {
            // Fallback: fetch directly from NASA API when backend is down
            const today = new Date().toISOString().split('T')[0];
            const start = startDate || today;
            const end = endDate || today;
            const nasaRes = await axios.get(
                `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=DEMO_KEY`
            );
            const neoData = nasaRes.data.near_earth_objects || {};
            const result = [];
            for (const date in neoData) {
                neoData[date].forEach((a) => {
                    const approach = a.close_approach_data?.[0];
                    if (!approach) return;
                    const diam = a.estimated_diameter?.kilometers || {};
                    const minKm = diam.estimated_diameter_min ?? 0;
                    const maxKm = diam.estimated_diameter_max ?? 0;
                    const missKm = Number(approach.miss_distance?.kilometers) || 0;
                    const velKm = Number(approach.relative_velocity?.kilometers_per_hour) || 0;
                    const riskScore = calculateRiskScore({
                        miss_distance_km: missKm,
                        diameter_min_km: minKm,
                        diameter_max_km: maxKm,
                        is_potentially_hazardous: a.is_potentially_hazardous_asteroid ?? false,
                    });
                    result.push({
                        neo_reference_id: a.neo_reference_id,
                        name: a.name || 'Unknown',
                        close_approach_date: approach.close_approach_date,
                        miss_distance_km: missKm,
                        velocity_kmph: velKm,
                        is_potentially_hazardous: a.is_potentially_hazardous_asteroid ?? false,
                        riskScore,
                    });
                });
            }
            return { count: result.length, data: result };
        }
    },

    getWatchlist: async () => {
        const response = await api.get('/watchlist');
        const data = response.data;
        return Array.isArray(data) ? data : (data?.data ?? []);
    },

    addToWatchlist: async (asteroid) => {
        // asteroid object should contain neo_reference_id, name, etc.
        const payload = {
            neo_reference_id: asteroid.neo_reference_id,
            name: asteroid.name,
            miss_distance_km: asteroid.miss_distance_km,
            velocity_kmph: asteroid.velocity_kmph,
            is_potentially_hazardous: asteroid.is_potentially_hazardous,
            close_approach_date: asteroid.close_approach_date,
            riskScore: asteroid.riskScore
        };
        const response = await api.post('/watchlist', payload);
        return response.data;
    },

    removeFromWatchlist: async (asteroidId) => {
        const response = await api.delete(`/watchlist/${asteroidId}`);
        return response.data;
    },

    getHistory: async () => {
        const response = await api.get('/history');
        const data = response.data;
        return { count: data?.count ?? 0, data: data?.data ?? [] };
    },

    // Accepts either (neo_reference_id, name) or a full asteroid object
    addHistory: async (neo_reference_idOrAsteroid, name) => {
        let neo_reference_id = neo_reference_idOrAsteroid;
        let finalName = name;

        if (neo_reference_idOrAsteroid && typeof neo_reference_idOrAsteroid === 'object') {
            neo_reference_id = neo_reference_idOrAsteroid.neo_reference_id;
            finalName = neo_reference_idOrAsteroid.name;
        }

        const response = await api.post('/history', { neo_reference_id, name: finalName });
        return response.data;
    },

    getAlerts: async (type = 'watchlist') => {
        try {
            const response = await api.get('/alerts', { params: { type } });
            return response.data;
        } catch (err) {
            if (type === 'global') {
                const today = new Date();
                const end = new Date();
                end.setDate(today.getDate() + 7);
                const startDate = today.toISOString().split('T')[0];
                const endDate = end.toISOString().split('T')[0];
                const feed = await AsteroidService.getFeed(startDate, endDate);
                const data = feed?.data ?? feed;
                const alerts = (Array.isArray(data) ? data : []).map((a) => ({
                    neo_reference_id: a.neo_reference_id,
                    name: a.name,
                    close_approach_date: a.close_approach_date,
                    miss_distance_km: a.miss_distance_km,
                    is_potentially_hazardous: a.is_potentially_hazardous ?? false,
                }));
                return { type: 'global', count: alerts.length, alerts };
            }
            return { type: 'watchlist', count: 0, alerts: [] };
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/asteroids/${id}`);
            return response.data;
        } catch (err) {
            const nasaRes = await axios.get(
                `https://api.nasa.gov/neo/rest/v1/neo/${id}?api_key=DEMO_KEY`
            );
            const a = nasaRes.data;
            const approach = a.close_approach_data?.[0];
            if (!approach) throw new Error('No approach data');
            const diam = a.estimated_diameter?.kilometers || {};
            const minKm = diam.estimated_diameter_min ?? 0;
            const maxKm = diam.estimated_diameter_max ?? 0;
            const missKm = Number(approach.miss_distance?.kilometers) || 0;
            const velKm = Number(approach.relative_velocity?.kilometers_per_hour) || 0;
            const riskScore = calculateRiskScore({
                miss_distance_km: missKm,
                diameter_min_km: minKm,
                diameter_max_km: maxKm,
                is_potentially_hazardous: a.is_potentially_hazardous_asteroid ?? false,
            });
            return {
                neo_reference_id: a.neo_reference_id,
                name: a.name || 'Unknown',
                absolute_magnitude_h: a.absolute_magnitude_h,
                close_approach_date: approach.close_approach_date,
                miss_distance_km: missKm,
                velocity_kmph: velKm,
                estimated_diameter_km: { min: minKm, max: maxKm },
                estimated_diameter_miles: {
                    min: a.estimated_diameter?.miles?.estimated_diameter_min ?? 0,
                    max: a.estimated_diameter?.miles?.estimated_diameter_max ?? 0,
                },
                is_potentially_hazardous: a.is_potentially_hazardous_asteroid ?? false,
                riskScore,
            };
        }
    }
};

export default AsteroidService;

import { useState, useEffect } from 'react';
import { getApplications } from '../api/applicationApi';

export const useApplications = (filters) => {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchApplications = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await getApplications(filters);
                setApplications(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, [filters]);

    return { applications, loading, error };
};


import { useState, useEffect } from 'react';
import { getApplicationById, updateApplication, updateApplicationStatus } from '../api/applicationApi';

export const useApplication = (id) => {
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApplication = async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await getApplicationById(id);
      setApplication(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplication();
  }, [id]);

  const updateApp = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await updateApplication(id, data);
      setApplication(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (status) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await updateApplicationStatus(id, status);
      setApplication(response.data);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { 
    application, 
    loading, 
    error, 
    updateApp, 
    changeStatus,
    refetch: fetchApplication 
  };
};


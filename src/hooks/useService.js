import { useState, useEffect } from 'react';

const useService = ({ initialData, service, serviceParams }) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetch = async () => {
    try {
      setLoading(true);
      const { data } = await service(serviceParams);
      setData(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return { data, loading, error, refetch: fetch };
};

export default useService;

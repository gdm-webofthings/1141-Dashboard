import { useState } from 'react';

import { useFetch } from '../../core/hooks/useFetch';
import { LightNav } from './LightNav';
import { LightPanel } from './LightPanel';
import { Spinner } from './Spinner';

export const apiBaseUrl = 'http://localhost:3001/api'; // TODO: Get IP address from DataProvider
export const names = ['Jane', 'Mary'];

export const LightController = ({ ip }) => {
  const apiBaseUrl = `${ip}:3001/api`;

  const [active, setActive] = useState(names[0]);
  const {
    data: paths,
    error,
    loading,
    updateData,
  } = useFetch(`${apiBaseUrl}/paths`);

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <p className="alert alert--error" style={{ marginTop: '5rem' }}>
        Failed to fetch data. Error: {error.message}
      </p>
    );
  }

  const updatePath = (points) => {
    updateData(
      paths.map((path) => (path.name === active ? { ...path, points } : path))
    );
  };

  const points = paths?.find((path) => path.name === active)?.points ?? [];

  return (
    <section className="light">
      <LightNav active={active} setActive={setActive} />
      <LightPanel active={active} initialPoints={points} onSave={updatePath} />
    </section>
  );
};

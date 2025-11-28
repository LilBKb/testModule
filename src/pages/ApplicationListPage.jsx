import { useState } from 'react';
import { Typography, Card } from 'antd';
import { ApplicationFilters } from '../components/ApplicationFilters';
import { ApplicationsTable } from '../components/ApplicationsTable';
import { useApplications } from '../hooks/useApplications';
import '../styles/ApplicationListPage.scss';

const { Title } = Typography;

export const ApplicationListPage = () => {
  const [filters, setFilters] = useState({});
  const { applications, loading, error } = useApplications(filters);

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="application-list-page">
      <Title level={2}>Управление заявками</Title>
      
      <Card className="filters-card">
        <ApplicationFilters onFilter={handleFilter} />
      </Card>

      {error && (
        <div className="error-message">
          Ошибка загрузки данных: {error}
        </div>
      )}

      <Card className="table-card">
        <ApplicationsTable applications={applications} loading={loading} />
      </Card>
    </div>
  );
};


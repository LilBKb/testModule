import { Table, Button, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import '../styles/ApplicationsTable.scss';

export const ApplicationsTable = ({ applications, loading }) => {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case 'На рассмотрении':
        return 'processing';
      case 'Одобрено':
        return 'success';
      case 'Отклонено':
        return 'error';
      default:
        return 'default';
    }
  };

  const columns = [
    {
      title: '№ Заявки',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (date) => dayjs(date).format('DD.MM.YYYY HH:mm'),
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: 'Наименование изделия',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Тип заявки',
      dataIndex: 'type',
      key: 'type',
      width: 150,
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      width: 180,
      render: (status) => (
        <Tag color={getStatusColor(status)}>
          {status}
        </Tag>
      ),
    },
    {
      title: 'Действие',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => navigate(`/application/${record.id}`)}
        >
          Открыть
        </Button>
      ),
    },
  ];

  return (
    <div className="applications-table">
      <Table
        columns={columns}
        dataSource={applications}
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showTotal: (total) => `Всего заявок: ${total}`,
        }}
      />
    </div>
  );
};


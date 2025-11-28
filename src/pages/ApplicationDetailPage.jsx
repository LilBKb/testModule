import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Card, Form, Input, Button, Select, Tag, Space, message, Descriptions } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useApplication } from '../hooks/useApplication';
import { APPLICATION_STATUSES } from '../api/mockData';
import dayjs from 'dayjs';
import '../styles/ApplicationDetailPage.scss';

const { Title } = Typography;
const { TextArea } = Input;

export const ApplicationDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  
  const { application, loading, error, updateApp, changeStatus } = useApplication(id);

  const handleSave = async (values) => {
    try {
      await updateApp(values);
      message.success('Заявка успешно обновлена');
    } catch (err) {
      message.error('Ошибка при сохранении заявки');
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      await changeStatus(newStatus);
      message.success(`Статус изменен на: ${newStatus}`);
    } catch (err) {
      message.error('Ошибка при изменении статуса');
    }
  };

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

  if (loading && !application) {
    return <div className="loading">Загрузка...</div>;
  }

  if (error) {
    return (
      <div className="error-page">
        <Title level={3}>Ошибка</Title>
        <p>{error}</p>
        <Button onClick={() => navigate('/')}>Вернуться к списку</Button>
      </div>
    );
  }

  if (!application) {
    return null;
  }

  return (
    <div className="application-detail-page">
      <Button 
        icon={<ArrowLeftOutlined />} 
        onClick={() => navigate('/')}
        style={{ marginBottom: 20 }}
      >
        Назад к списку
      </Button>

      <Title level={2}>Заявка №{application.id}</Title>

      {/* Блок основной информации */}
      <Card title="Основная информация" className="info-card">
        <Descriptions column={2}>
          <Descriptions.Item label="Номер заявки">
            {application.id}
          </Descriptions.Item>
          <Descriptions.Item label="Дата создания">
            {dayjs(application.createdAt).format('DD.MM.YYYY HH:mm')}
          </Descriptions.Item>
          <Descriptions.Item label="Тип заявки">
            {application.type}
          </Descriptions.Item>
          <Descriptions.Item label="Текущий статус">
            <Tag color={getStatusColor(application.status)}>
              {application.status}
            </Tag>
          </Descriptions.Item>
        </Descriptions>
      </Card>

      {/* Форма редактирования */}
      <Card title="Редактирование заявки" className="edit-card">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          initialValues={{
            name: application.name,
            description: application.description,
          }}
        >
          <Form.Item
            label="Наименование изделия"
            name="name"
            rules={[
              { required: true, message: 'Пожалуйста, введите наименование изделия' }
            ]}
          >
            <Input placeholder="Введите наименование изделия" />
          </Form.Item>

          <Form.Item
            label="Описание"
            name="description"
            rules={[
              { required: true, message: 'Пожалуйста, введите описание' }
            ]}
          >
            <TextArea
              rows={4}
              placeholder="Введите описание заявки"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Card>

      {/* Управление статусом */}
      <Card title="Изменение статуса" className="status-card">
        <Space direction="vertical" style={{ width: '100%' }}>
          <p>Выберите новый статус для заявки:</p>
          <Space wrap>
            {APPLICATION_STATUSES.map((status) => (
              <Button
                key={status}
                onClick={() => handleStatusChange(status)}
                disabled={application.status === status}
                loading={loading}
                type={application.status === status ? 'default' : 'primary'}
              >
                {status}
              </Button>
            ))}
          </Space>
        </Space>
      </Card>
    </div>
  );
};


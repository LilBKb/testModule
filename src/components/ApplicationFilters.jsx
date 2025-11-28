import { Form, Select, DatePicker, Button, Space } from 'antd';
import { APPLICATION_TYPES, APPLICATION_STATUSES } from '../api/mockData';
import dayjs from 'dayjs';
import '../styles/ApplicationFilters.scss';

const { RangePicker } = DatePicker;

export const ApplicationFilters = ({ onFilter }) => {
  const [form] = Form.useForm();

  const handleFilter = (values) => {
    const filters = {
      type: values.type,
      status: values.status,
      dateFrom: values.dateRange ? values.dateRange[0].format('YYYY-MM-DD') : null,
      dateTo: values.dateRange ? values.dateRange[1].format('YYYY-MM-DD') : null,
    };
    
    onFilter(filters);
  };

  const handleReset = () => {
    form.resetFields();
    onFilter({});
  };

  return (
    <div className="application-filters">
      <Form
        form={form}
        layout="inline"
        onFinish={handleFilter}
        className="filters-form"
      >
        <Form.Item name="type" label="Тип заявки">
          <Select
            placeholder="Выберите тип"
            allowClear
            style={{ width: 200 }}
          >
            {APPLICATION_TYPES.map(type => (
              <Select.Option key={type} value={type}>
                {type}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="status" label="Статус">
          <Select
            placeholder="Выберите статус"
            allowClear
            style={{ width: 200 }}
          >
            {APPLICATION_STATUSES.map(status => (
              <Select.Option key={status} value={status}>
                {status}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="dateRange" label="Дата создания">
          <RangePicker
            format="DD.MM.YYYY"
            placeholder={['От', 'До']}
          />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Применить
            </Button>
            <Button onClick={handleReset}>
              Сбросить
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
  );
};


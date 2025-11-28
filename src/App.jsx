import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { ApplicationListPage } from './pages/ApplicationListPage';
import { ApplicationDetailPage } from './pages/ApplicationDetailPage';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import './styles/App.scss';

dayjs.locale('ru');

function App() {
  return (
    <ConfigProvider locale={ruRU}>
      <BrowserRouter>
        <div className="app">
          <div className="container">
            <Routes>
              <Route path="/" element={<ApplicationListPage />} />
              <Route path="/application/:id" element={<ApplicationDetailPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;


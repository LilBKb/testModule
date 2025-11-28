import { mockApplications } from './mockData';



// Симуляция задержки сети для реалистичности
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Хранилище данных в памяти (для имитации базы данных)
let applications = [...mockApplications];

/**
 * Получение списка заявок с опциональной фильтрацией
 * 
 * @param {Object} filters - Объект с параметрами фильтрации
 * @returns {Promise} - Промис с массивом заявок
 */
export const getApplications = async (filters = {}) => {
    await delay(500); // Имитация задержки сети

    let filtered = [...applications];

    // Применяем фильтры на клиенте 
    if (filters.type) {
        filtered = filtered.filter(app => app.type === filters.type);
    }

    if (filters.status) {
        filtered = filtered.filter(app => app.status === filters.status);
    }

    if (filters.dateFrom) {
        filtered = filtered.filter(app => new Date(app.createdAt) >= new Date(filters.dateFrom));
    }

    if (filters.dateTo) {
        filtered = filtered.filter(app => new Date(app.createdAt) <= new Date(filters.dateTo));
    }

    return {
        data: filtered,
        status: 200
    };
};

// GET /api/applications/:id - получить конкретную заявку
export const getApplicationById = async (id) => {
    await delay(300);

    const application = applications.find(app => app.id === parseInt(id));

    if (!application) {
        throw new Error('Заявка не найдена');
    }

    return {
        data: application,
        status: 200
    };
};

// PUT /api/applications/:id - обновить заявку
export const updateApplication = async (id, data) => {
    await delay(400);

    const index = applications.findIndex(app => app.id === parseInt(id));

    if (index === -1) {
        throw new Error('Заявка не найдена');
    }

    applications[index] = {
        ...applications[index],
        ...data
    };

    return {
        data: applications[index],
        status: 200
    };
};

// PATCH /api/applications/:id/status - изменить статус заявки
export const updateApplicationStatus = async (id, status) => {
    await delay(300);

    const index = applications.findIndex(app => app.id === parseInt(id));

    if (index === -1) {
        throw new Error('Заявка не найдена');
    }

    applications[index].status = status;

    return {
        data: applications[index],
        status: 200
    };
};


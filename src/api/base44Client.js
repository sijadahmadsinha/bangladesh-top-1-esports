import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true
});

const createEntityApi = (entityName) => ({
  list: async (sort, limit) => {
    const res = await api.get(`/entities/${entityName}`, { params: { sort, limit } });
    return res.data.items || res.data;
  },
  getById: async (id) => {
    const res = await api.get(`/entities/${entityName}/${id}`);
    return res.data;
  },
  filter: async (query, sort, limit) => {
    const res = await api.get(`/entities/${entityName}`, { params: { ...query, sort, limit } });
    return res.data.items || res.data;
  },
  create: async (data) => {
    const res = await api.post(`/entities/${entityName}`, data);
    return res.data;
  },
  update: async (id, data) => {
    const res = await api.patch(`/entities/${entityName}/${id}`, data);
    return res.data;
  },
  delete: async (id) => {
    const res = await api.delete(`/entities/${entityName}/${id}`);
    return res.data;
  }
});

export const base44 = {
  auth: {
    me: async () => {
      try {
        const res = await api.get('/auth/me');
        return res.data.user;
      } catch (e) {
        return null;
      }
    },
    login: async (email, password) => {
      const res = await api.post('/auth/login', { email, password });
      return res.data;
    },
    logout: async () => {
      await api.post('/auth/logout');
      window.location.href = '/';
    },
    redirectToLogin: () => {
      window.location.href = '/login'; 
    }
  },
  entities: {
    Player: createEntityApi('Player'),
    Tournament: createEntityApi('Tournament'),
    Result: createEntityApi('Result'),
    Achievement: createEntityApi('Achievement'),
    Earning: createEntityApi('Earning'),
    Media: createEntityApi('Media'),
    Management: createEntityApi('Management'),
  },
  integrations: {
    Core: {
      UploadFile: async (payload) => {
        const file = payload.file;
        if (!file) throw new Error('No file provided');

        const formData = new FormData();
        formData.append('file', file);
        
        const res = await api.post('/integrations/core/upload', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        
        return {
          file_url: res.data.url
        };
      }
    }
  }
};

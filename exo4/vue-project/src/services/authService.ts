import api from "./api";

export const authService = {
    async register(username: string, email: string, password: string) {
        const response = await api.post('/auth/register', { username, email, password });
        return response.data;
    },

    async login(email: string, password: string) {
        if (localStorage.getItem('token')){
            this.logout();
        }
        const response = await api.post('/auth/login', { email, password });
        const token = response?.data?.data?.token;
        if (token) {
          localStorage.setItem('token', token);
        }
        return response.data;
    },

    async connectedUser() {
        if (localStorage.getItem('token')){
            const response = await api.get('/auth/me');
            return response.data;
        }else{
            // no token available
        }
    },

    logout() {
        localStorage.removeItem('token');
    }
}
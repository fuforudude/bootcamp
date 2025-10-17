import api from './api';
import * as auth from './authService';

export const userService = {

    async getAllUsers(){
        const response = await api.get('/users');
        return response.data;
    },

    async getUserById(id: string ){
        const response = await api.get(`/users/${id}`);
        return response.data;
    },

    async updateUser(id: string, username?: string, email?: string, password?: string){
        const response = await api.put(`/users/${id}`, ({username, email, password}));
        return response.data;
    },

    async addUser(username: string, email: string, password: string){
        const response = await api.post('/users', ({username, email, password}));
        return response.data;
    },

    async deleteUser(id: string){
        const userSelected = this.getUserById(id)
        const connectedUser = auth.authService.connectedUser();
        if (await userSelected){
            if (userSelected == connectedUser){
                auth.authService.logout();
            }
            const response = await api.delete(`/users/${id}`);
            return response.data;
        }
    }
}
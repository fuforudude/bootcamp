import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose, { connect } from 'mongoose'
import * as user from './controllers/userController.js'
import {login, register, connectedUser } from './controllers/authController.js'
import { verifyToken } from './middlewares/authMiddleware.js'

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);

app.get('/api/auth/me', verifyToken, connectedUser);

app.get('/api/users', verifyToken, user.getAllUsers);
app.get('/api/users/:id', verifyToken, user.getUserById);

app.put('/api/users/:id', verifyToken, user.updateUser);

app.post('/api/users', verifyToken, user.addUser);
app.delete('/api/users/:id', verifyToken, user.deleteUser);


const PORT = 3000;

mongoose.connect('mongodb+srv://Titouan:SIxuGqDDlOCGDNGz@project.usoxe.mongodb.net/exercice?retryWrites=true&w=majority&appName=Project')
.then(() => {
    app.listen(PORT, () => {
      // server started
    });
  })
  .catch((err) => {
    console.error(' Erreur de connexion à MongoDB :', err.message);
  });
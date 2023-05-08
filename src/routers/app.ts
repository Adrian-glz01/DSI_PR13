import express from 'express';
import '../db/mongoose.js';

//import routers
import { alumnoRouter } from './alumno.js';
import { asignaturaRouter } from './asignatura.js';

export const server = express();
server.use(express.json());

server.use('/alumnos',alumnoRouter)
server.use('/asignaturas',asignaturaRouter)

//! MANEJO DE ERRORES
server.post('*', (_, res) => {
  res.status(404).send('404 Not Found');
});

server.delete('*', (_, res) => {
  res.status(404).send('404 Not Found');
});

server.get('*', (_, res) => {
  res.status(404).send('404 Not Found');
});

server.patch('*', (_, res) => {
  res.status(404).send('404 Not Found');
});

//? PUERTO DE ESCUCHA
server.listen(3000, () => {
  console.log('Server running on port 3000');
});
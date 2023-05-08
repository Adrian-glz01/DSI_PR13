import { Asignatura } from '../models/asignatura.js';
import express from 'express';

export const asignaturaRouter = express.Router();

//* POST
asignaturaRouter.post('/', async (req, res) => {
  const asignatura = new Asignatura(req.body);

  try {
    await asignatura.save();
    return res.status(201).send(asignatura);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//* GET TODAS
asignaturaRouter.get('/', async (req, res) => {

  try {
    const asignaturas = await Asignatura.find();

    if (asignaturas.length !== 0) {
      return res.status(200).send(asignaturas);
    }
    return res.status(400).send({error: "No se encontró la ruta con ese nombre"});
  } catch (error) {
    return res.status(400).send(error);
  }
});

//* GET POR ID
asignaturaRouter.get('/:id', async (req, res) => {
  try {
    const asignaturas = await Asignatura.findById(req.params.id);

    if (asignaturas) {
      return res.status(200).send(asignaturas);
    }
    return res.status(400).send({error: "No se encontró la ruta con ese id"});
  } catch (error) {
    return res.status(400).send(error);
  }
});

//* DELETE BY ID
asignaturaRouter.delete('/:id', async (req, res) => {
  try {
    const asignaturasFoundandDeleted = await Asignatura.findByIdAndDelete(req.params.id);

    if (!asignaturasFoundandDeleted) {
      return res.status(400).send({error: "No se encontró la ruta con ese id"});
    }

    return res.status(200).send(asignaturasFoundandDeleted);
  } catch(error) {
    return res.status(400).send(error);    
  }
});

//* PATCH BY ID
asignaturaRouter.patch('/:id', async (req, res) => {
  const allowedUpdates = ['nombre', 'descripcion'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({error: "Actualización no permitida"});
  }

  try {
    const asignaturaUpdated = await Asignatura.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});

    if (asignaturaUpdated) {
      return res.status(200).send(asignaturaUpdated);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(400).send(error); 
  }
});
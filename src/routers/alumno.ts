import { Alumno } from '../models/alumno.js';
import { Asignatura } from '../models/asignatura.js';
import express, { response } from 'express';

export const alumnoRouter = express.Router();

//* POST
alumnoRouter.post('/', async (req, res) => {
  const alumno = new Alumno(req.body);


  try {

    //? COmprobamos que las asignaturas existen en la base de datos
    if (req.body.asignaturas) {
      while(req.body.asignaturas.length !== 0) {
        const asignatura = req.body.asignaturas.shift();
        const asignaturaFound = await Asignatura.findById(asignatura);
        if (!asignaturaFound) {
          return res.status(400).send({error: "No se encontró la asignatura con ese id"});
        }
      }
    }

    await alumno.save();
    return res.status(201).send(alumno);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//* GET TODAS
alumnoRouter.get('/', async (req, res) => {
  if (req.query.email) {
    try {
      const alumnos = await Alumno.findOne({email: req.query.email});
  
      if (alumnos) {
        return res.status(200).send(alumnos);
      }
      return res.status(400).send({error: "No se encontró la ruta con ese id"});
    } catch (error) {
      return res.status(400).send(error);
    }
  } else {
    try {
      const alumnos = await Alumno.find();
  
      if (alumnos.length !== 0) {
        return res.status(200).send(alumnos);
      }
      return res.status(400).send({error: "No se encontró la ruta con ese nombre"});
    } catch (error) {
      return res.status(400).send(error);
    }
  }
});

//* GET POR CORREO
// alumnoRouter.get('/alumnos', async (req, res) => {
//   try {
//     const alumnos = await Alumno.findOne({email: req.query.email});

//     if (alumnos) {
//       return res.status(200).send(alumnos);
//     }
//     return res.status(400).send({error: "No se encontró la ruta con ese id"});
//   } catch (error) {
//     return res.status(400).send(error);
//   }
// });

//* DELETE BY EMAIL
alumnoRouter.delete('/', async (req, res) => {
  try {
    const alumnosFoundandDeleted = await Alumno.findOneAndDelete({email: req.query.email});

    if (!alumnosFoundandDeleted) {
      return res.status(400).send({error: "No se encontró la ruta con ese id"});
    }

    return res.status(200).send(alumnosFoundandDeleted);
  } catch(error) {
    return res.status(400).send(error);    
  }
});

//* PATCH BY EMAIL
alumnoRouter.patch('/', async (req, res) => {
  const allowedUpdates = ['nombre', 'apellidos', 'edad', 'email', 'asignaturas'];
  const actualUpdates = Object.keys(req.body);
  const isValidUpdate = actualUpdates.every((update) => allowedUpdates.includes(update));

  if (!isValidUpdate) {
    return res.status(400).send({error: "Actualización no permitida"});
  }

  try {

    //? COmprobamos que las asignaturas existen en la base de datos
    if (req.body.asignaturas) {
      while(req.body.asignaturas.length !== 0) {
        const asignatura = req.body.asignaturas.shift();
        const asignaturaFound = await Asignatura.findById(asignatura);
        if (!asignaturaFound) {
          return res.status(400).send({error: "No se encontró la asignatura con ese id"});
        }
      }
    }

    const alumnoUpdated = await Alumno.findOneAndUpdate({email: req.query.email}, req.body, {new: true, runValidators: true});

    if (alumnoUpdated) {
      return res.status(200).send(alumnoUpdated);
    }

    return res.status(404).send();
  } catch (error) {
    return res.status(400).send(error); 
  }
});

//* OBTENER LISTADO DE ESTUDIANTES DE UNA ASIGNATURA POR SU ID

alumnoRouter.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const alumnos = await Alumno.find({asignaturas: id});
    if (alumnos) {
      return res.status(200).send(alumnos);
    }
  } catch (error) {
    return res.status(400).send(error); 
  }
});
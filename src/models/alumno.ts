import { Document, model, Schema } from 'mongoose';
import validator  from 'validator';

import { AsignaturaDocumentInterface } from './asignatura.js';

export interface AlumnoDocumentInterface extends Document {
  nombre: string;
  apellidos: string;
  edad: number;
  email: string;
  asignaturas: AsignaturaDocumentInterface[];
}

const AlumnoSchema = new Schema<AlumnoDocumentInterface>({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  apellidos: {
    type: String,
    required: true,
  },
  edad: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        return validator.default.isEmail(value);
      }
    }
  },
  asignaturas: [{
    type: Schema.Types.ObjectId,
    ref: 'Asignatura',
  }],
});

export const Alumno = model<AlumnoDocumentInterface>('Alumno', AlumnoSchema);
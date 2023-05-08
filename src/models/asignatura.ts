import { Document, model, Schema } from 'mongoose';

export interface AsignaturaDocumentInterface extends Document {
  nombre: string;
  descripcion: string;
}

const AsignaturaSchema = new Schema<AsignaturaDocumentInterface>({
  nombre: {
    type: String,
    required: true,
    unique: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
});

export const Asignatura = model<AsignaturaDocumentInterface>('Asignatura', AsignaturaSchema);
import { User } from '@prisma/client'; // Importar el modelo de User si uso Prisma

declare global {
  namespace Express {
    interface Request {
      user?: User; // Asegurarse que coincida con el tipo que estoy usando para 'user'
    }
  }
}

//Para el error de TS en middleware.auth
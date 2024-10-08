import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import path from 'path';

// Ruta al archivo JSON con las credenciales
const KEYFILEPATH = path.join(
  process.cwd(),
  '/credentials/service-account.json'
);
// Rango y hoja de la hoja de cálculo
const SPREADSHEET_ID = '134i7Tt1QLrLZk4ylKOi_KLPVKuk1RiccWIphAIKsRuo'; // Reemplaza con tu ID de hoja de cálculo
const RANGE = 'Sheet1';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método no permitido' });
  }
  try {
    // Autenticación con la cuenta de servicio
    const auth = new google.auth.GoogleAuth({
      keyFile: KEYFILEPATH,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const sheets = google.sheets({
      version: 'v4',
      auth: await auth.getClient(),
    });

    // Los datos que quieres insertar o actualizar en la hoja de cálculo
    const { values } = req.body;

    const resource = {
      values,
    };

    // v4/spreadsheets/{spreadsheetId}/values/{range}

    // Realiza la llamada a la API para agregar nuevas filas
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: 'RAW', // RAW o USER_ENTERED, dependiendo del tipo de entrada que quieras
      insertDataOption: 'INSERT_ROWS', // Se añaden nuevas filas
      resource,
    });

    res
      .status(200)
      .json({ updatedCells: response.data.updates?.updatedCells || 0 });
  } catch (error) {
    console.error('Error al agregar datos a la hoja de cálculo:', error);
    res
      .status(500)
      .json({ error: 'Error al agregar datos a la hoja de cálculo' });
  }
}

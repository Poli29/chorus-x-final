
import formidable from 'formidable';
import fs from 'fs';
import { analyzeImage } from '../../../lib/chorusEngine';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      res.status(500).json({ error: 'Form parsing error' });
      return;
    }

    const filePath = files.image.filepath;
    const result = await analyzeImage(filePath);
    res.status(200).json(result);
  });
}

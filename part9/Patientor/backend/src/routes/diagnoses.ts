import express from 'express';
import diagnoseService from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_request, response) => {
    response.send(diagnoseService.getDiagnoses());
});

export default router;
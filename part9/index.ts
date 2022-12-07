import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;

    if(!height || !weight) {
        return res.status(400).json({ error: 'Missing parameters' });
    }

    if(isNaN(Number(height)) || isNaN(Number(weight))) {
        return res.status(400).json({ error: 'Malformatted parameters'});
    }

    const bmi = calculateBmi(Number(height), Number(weight));

    return res.json({
        height: height, 
        weight: weight,
        bmi: bmi
    });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
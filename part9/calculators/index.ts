import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Excercise } from './exerciseCalculator';

const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { params, target } = req.body;

    if(!params || !target) {
        return res.status(400).json({ error: "parameters missing"});
    }

    if(isNaN(Number(target)) || !Array.isArray(params) ) {
        return res.status(400).json({ error: "malformatted parameters"});
    }

    const exercises: Array<number> = params.map(value => Number(value));
    const result: Excercise = calculateExercises(exercises, Number(target));

    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
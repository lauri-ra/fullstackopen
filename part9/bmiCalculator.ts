const calculateBmi = (height: number, weight: number): string => {
    const result  = weight / Math.pow(height / 100, 2);

    if(result < 18.5) {
        return 'Underweight';
    }
    else if(result >= 18.5 && result < 25) {
        return 'Normal (healthy weight)';
    }
    else if(result >= 25 && result < 30) {
        return 'Overweight (Pre-obese)';
    }
    else if(result > 30) {
        return 'Obese';
    }
}

const callBmiFunction = (args: Array<String>) => {
    if(args.length < 4) throw new Error('Missing arguments');
    if(args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(process.argv[2])) || !isNaN(Number(process.argv[3]))) {
        const height = Number(process.argv[2]);
        const weight = Number(process.argv[3]);

        console.log(calculateBmi(height, weight));
    }
    else throw new Error('Arguments are not numbers!');

}

// console.log(calculateBmi(165, 68));
// console.log(calculateBmi(180, 74));

callBmiFunction(process.argv);
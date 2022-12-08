interface Excercise {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (params: Array<number>, target: number): Excercise => {
    const periodLength: number = params.length;
    const trainingDays: number = params.filter(value => value > 0).length;

    const initialValue = 0;
    const totalHours: number = params.reduce(
        (prev, current) => prev + current, initialValue
    );
    const average: number = totalHours / periodLength;

    const success: boolean = average < target ? false : true;

    let rating: number;
    let ratingDescription: string;
    
    if(success) {
        rating = 3;
        ratingDescription = 'well done'; 
    }
    else if(average > target-0.2) {
        rating = 2;
        ratingDescription = 'not bad';
    }
    else {
        rating = 1;
        ratingDescription = 'very bad';
    }

    const result: Excercise = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };

    console.log(result);
    return result;
};

const callCalFunction = (args: Array<string>) => {
    if(args.length < 3) throw new Error('Missing arguments');

    let target: number;
    if(!isNaN(Number(args[2]))) {
        target = Number(args[2]);
    }
    else throw new Error('Target must be a number');

    const params: Array<number> = [];
    const data: Array<string> = args.slice(3);
    
    data.forEach(num => {
        if(!isNaN(Number(num))) {
            params.push(Number(num));
        }
        else {
            throw new Error('Arguments must be numbers');
        }
    });
    
    calculateExercises(params, target);
};

callCalFunction(process.argv);

// const params = [3, 0, 2, 4.5, 0, 3, 1];
// calculateExercises(params, 2);

// const params2 = [3, 0, 2, 4.5, 0, 3, 1];
// calculateExercises(params2, 6);

// const params3 = [3, 5, 2, 4.5, 4, 3, 1];
// calculateExercises(params3, 2);
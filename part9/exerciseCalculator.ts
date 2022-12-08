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

    return result;
};

export { calculateExercises, Excercise };
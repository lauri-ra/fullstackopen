interface Excercise {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: String;
    target: number;
    average: number;
}

const calculateExercises = (params: Array<number>, target: number): Excercise => {
    const periodLength = params.length;
    const trainingDays = params.filter(value => value > 0).length;

    const initialValue = 0;
    const totalHours = params.reduce(
        (prev, current) => prev + current, initialValue
    )
    const average = totalHours / periodLength;

    const success = average < target ? false : true;

    let rating;
    let ratingDescription;
    
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
}

const params = [3, 0, 2, 4.5, 0, 3, 1];
calculateExercises(params, 2);

const params2 = [3, 0, 2, 4.5, 0, 3, 1];
calculateExercises(params2, 6);

const params3 = [3, 5, 2, 4.5, 4, 3, 1];
calculateExercises(params3, 2);
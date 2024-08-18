interface ExerciseReview {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

// interface ValuesParsed {
//   target: number;
//   hoursArray: number[];
// }

// const parseArgumentsExercise = (args: string[]): ValuesParsed => {
//   if (args.length < 4) 
//     throw new Error('Not enough arguments');

//   if (isNaN(Number(args[2])))
//     throw new Error('Provided target is not a number!');

//   const target = Number(args[2]);
//   const hoursArray = [];
//   for (let i = 3; i < args.length; i++) {
//     if (!isNaN(Number(args[i]))) {
//       hoursArray.push(Number(args[i]));
//     } else {
//       throw new Error('Provided values were not numbers!');
//     }
//   }

//   return {
//     target,
//     hoursArray
//   };
// };


const calculateExercises = (hoursArray: number[], target: number): ExerciseReview => {
  const days = hoursArray.length;
  let trainingDays = days;
  let success = false;
  let hours = 0;
  let rating = 0;
  let ratingDescription = '';

  for (let i = 0; i < days; i++) {
    if (hoursArray[i] === 0)
      trainingDays--;

    hours += hoursArray[i];
  }

  const average = hours / days;

  if (average >= target) {
    success = true;
    rating = 3;
  } else if (average > target * 0.85) {
    rating = 2;
  } else {
    rating = 1;
  }
    
  switch(rating) {
    case 1:
      ratingDescription = 'bad';
      break;
    case 2:
      ratingDescription = 'not too bad but could be better (average > 85% of target)';
      break;
    case 3:
      ratingDescription = 'good';
      break;
      
    default: 
      ratingDescription = 'how???';
      break;
  }


  return {
    periodLength: days,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  };
};


// try {
//   const { target, hoursArray } = parseArgumentsExercise(process.argv);
//   console.log(calculateExercises(hoursArray, target));
// } catch (error) {
//   let errorMessage = 'Something bad happened.';

//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.error(errorMessage);
// }

export default calculateExercises;
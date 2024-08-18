// interface Values {
//   height: number;
//   weight: number;
// }

// const parseArguments = (args: string[]): Values => {
//   if (args.length < 4) 
//     throw new Error('Not enough arguments');
//   if (args.length > 4) 
//     throw new Error('Too many arguments');

//   if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
//     return {
//       height: Number(args[2]),
//       weight: Number(args[3])
//     };
//   } else {
//     throw new Error('Provided values were not numbers!');
//   }
// };


const calculateBmi = (height: number, weight: number): string => {  
  const bmiValue = weight / ((height / 100) ** 2);

  if (bmiValue < 18.5) 
    return 'Underweight';
  else if (bmiValue >= 18.5 && bmiValue <= 24.9)
    return 'Normal (healthy weight)';
  else if (bmiValue > 24.9 && bmiValue <= 29.9)
    return 'Overweight';
  else
    return 'Obesity';
};

// try {
//   const { height, weight } = parseArguments(process.argv);
//   console.log(calculateBmi(height, weight));
// } catch (error) {
//   let errorMessage = 'Something bad happened.';

//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.error(errorMessage);
// }

export default calculateBmi;
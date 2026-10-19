// import { isNotNumber } from './helper.ts';

// const helperText =
//   'Arguments: target, atleast 1 days hours';

interface TrainingPeriodValues {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const countRating = (hours: number): number => {
  if (hours < 1) return 0;
  if (hours < 10) return 1;
  if (hours < 15) return 2;
  return 3;
};

const getRatingDesc = (rating: number): string => {
  if (rating === 0) return 'well can\'t do worse than that';
  if (rating === 1) return 'camoon gotta do better than that';
  if (rating === 2) return 'not too bad but could be better';
  return 'Well done buddy proud of you <3';
};

// const parseArguments = (args: string[]): number[] => {
//   if (args.length < 3) throw new Error('No arguments given');

//   const validArgs: number[] = [];

//   args.slice(2).map(arg => {
//     if (!isNotNumber(arg)) validArgs.push(Number(arg));
//   });

//   if (validArgs.length < 1) throw new Error('Provided values were not numbers!');
//   else return validArgs;
// };

export const exerciseCalculator = (trainingPeriod: number[], target: number): TrainingPeriodValues => {
  const periodLength: number = trainingPeriod.length;
  const trainingDays: number = trainingPeriod.filter(val => val > 0).length;
  const trainingHours: number = trainingPeriod.reduce((acc, current) => acc + current, 0);
  const rating: number = countRating(trainingHours);
  const ratingDescription: string = getRatingDesc(rating);
  const average: number = trainingHours / periodLength;
  const success: boolean = average >= target;

  return {
    periodLength,
    trainingDays,
    rating,
    ratingDescription,
    average,
    target,
    success
  };
};

// const exerciseCalculator = (trainingPeriod: number[]): TrainingPeriodValues => {
//   if (trainingPeriod.length < 2) throw new Error('Expected target and at least one day of hours');
//   const target = trainingPeriod[0];
//   const days = trainingPeriod.slice(1);
  
//   const periodLength: number = days.length;
//   const trainingDays: number = days.filter(val => val > 0).length;
//   const trainingHours: number = days.reduce((acc, current) => acc + current, 0);
//   const rating: number = countRating(trainingHours);
//   const ratingDescription: string = getRatingDesc(rating);
//   const average: number = trainingHours / periodLength;
//   const sucess: boolean = average >= target;

//   return {
//     periodLength,
//     trainingDays,
//     rating,
//     ratingDescription,
//     average,
//     target,
//     sucess
//   };
// };

// try {
//   const trainingPeriod = parseArguments(process.argv);
//   console.log(exerciseCalculator(trainingPeriod));
// } catch (error: unknown) {
//   if (error instanceof Error) {
//     console.log(`Error: ${error.message}.\n${helperText}`);
//   }
// }
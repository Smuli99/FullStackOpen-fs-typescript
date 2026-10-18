/*
Instructions
Create the code of this exercise in file exerciseCalculator.ts in the same project with the previous exercise.

Write a function calculateExercises that calculates the average time of daily exercise hours, compares it to
the target amount of daily hours and returns an object that includes the following values:

  - the number of days
  - the number of training days
  - the original target value
  - the calculated average time
  - boolean value describing if the target was reached
  - a rating between the numbers 1-3 that tells how well the hours are met. 
    You can decide on the metric on your own.
  - a text value explaining the rating, you can come up with the explanations

The daily exercise hours are given to the function as an array(opens in a new tab) that contains the number of exercise 
hours for each day in the training period. Eg. a week with 3 hours of training on Monday, none on Tuesday, 
2 hours on Wednesday, 4.5 hours on Thursday and so on would be represented by the following array:

[3, 0, 2, 4.5, 0, 3, 1]

For the Result object, you should create an interface(opens in a new tab).

If you call the function with parameters [3, 0, 2, 4.5, 0, 3, 1] and 2, it should return:


{ 
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286
}

Create an npm script, npm run calculateExercises, to call the function with hard-coded values.
*/

const target = 2;

interface TrainingPeriodValues {
  periodLength: number;
  trainingDays: number;
  sucess: boolean;
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
}

const getRatingDesc = (rating: number): string => {
  if (rating === 0) return 'well can\'t do worse than that';
  if (rating === 1) return 'camoon gotta do better than that';
  if (rating === 2) return 'not too bad but could be better';
  return 'Well done buddy proud of you <3';
}

const exerciseCalculator = (trainingPeriod: Array<number>): TrainingPeriodValues => {
  const periodLength: number = trainingPeriod.length;
  const trainingDays: number = trainingPeriod.filter(val => val > 0).length;
  const trainingHours: number = trainingPeriod.reduce((acc, current) => acc + current, 0);
  const rating: number = countRating(trainingHours);
  const ratingDescription: string = getRatingDesc(rating);
  const average: number = trainingHours / periodLength;
  const sucess: boolean = average >= target;

  return {
    periodLength,
    trainingDays,
    rating,
    ratingDescription,
    average,
    target,
    sucess
  }
};

// exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1]);
console.log(exerciseCalculator([3, 0, 2, 4.5, 0, 3, 1]));
console.log(exerciseCalculator([0, 0, 0, 0, 0, 0, 0]));
console.log(exerciseCalculator([2, 2, 2, 2, 2, 2, 2]));
console.log(exerciseCalculator([1, 1, 1, 1, 1, 1, 1]));
console.log(exerciseCalculator([5, 0, 0, 0, 0, 0, 0]));
console.log(exerciseCalculator([4, 4, 4, 4, 4, 4, 4]));
console.log(exerciseCalculator([0.5, 0, 1, 0, 0.5, 0, 0]));
console.log(exerciseCalculator([3, 3, 3]));
console.log(exerciseCalculator([1.5, 2.5, 0, 2, 3, 0, 1, 2]));
console.log(exerciseCalculator([]));
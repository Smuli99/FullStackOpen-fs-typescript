import { isNotNumber } from './helper.ts';

interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (args.length !== 4) throw new Error('Give height and weight as arguments');

  if (!isNotNumber(args[2]) && !isNotNumber(args[3])) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  };

  throw new Error('Provided values were not numbers!');
};

export const calculateBmi = (height: number, weight: number): string => {
  if (weight === 0) throw new Error('Can\'t divide by 0!');

  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 18.5) return 'Underweight';
  if (bmi >= 18.5 && bmi < 25) return 'Normal range';
  return 'Overweight';
};

try {
  const { height, weight } = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error: unknown) {
  if (error instanceof Error) console.log('Error:', error.message);
}

// console.log(calculateBmi(180, 84))
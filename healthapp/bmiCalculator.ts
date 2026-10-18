const calculateBmi = (height: number, weight: number) => {
  if (weight === 0) throw new Error('Can\'t divide by 0!');

  const bmi = weight / ((height / 100) * (height / 100));

  if (bmi < 18.5) return 'Under range';
  if (bmi >= 18.5 && bmi < 25) return 'Normal range';
  return 'Over range';
}

console.log(calculateBmi(180, 84))
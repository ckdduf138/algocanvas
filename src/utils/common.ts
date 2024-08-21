// 랜덤 RGB 색상을 생성하는 함수
export const generateRandomNumbers = (min: number, max: number, number: number): number[] => {
  const result: number[] = [];

  for (let i = 0; i < number; i++) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      result.push(randomNumber);
  }

  return result;
};

export const getLogScale = (value: number) => {
    return Math.log10(value + 2);
};
import { range, random } from "lodash";

type Results = {
  spaces: Space[];
};

type Space = {
  name: string;
};

const generateNumbersInRange = (from: number, to: number): number[] => {
  return range(from, to);
};

const generateSpaces = (text: string, numbers: number[]) => {
  return numbers.map((index) => ({
    name: `${text} ${index}`,
  }));
};

const ALL_PARKING_SPACES: Space[] = [
  ...generateSpaces("Kraków HQ", generateNumbersInRange(1, 20)),
  ...generateSpaces("Milano", generateNumbersInRange(21, 50)),
  ...generateSpaces("Munich", generateNumbersInRange(51, 80)),
];

const CHANCE_OF_FAILURE = 0.1;
const MIN_TIME_MILLIS = 100;
const MAX_TIME_MILLIS = 1000;

const searchSpaces = (searchText: string): Promise<Results> => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (random() > CHANCE_OF_FAILURE) {
        const spaces = ALL_PARKING_SPACES.filter(
          ({ name }) => name.indexOf(searchText) !== -1
        );
        res({ spaces });
      } else {
        rej(new Error("Network error"));
      }
    }, random(MIN_TIME_MILLIS, MAX_TIME_MILLIS, false));
  });
};

export { searchSpaces };

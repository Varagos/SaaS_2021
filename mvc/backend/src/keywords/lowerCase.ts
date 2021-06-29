import { ValueTransformer } from 'typeorm';

const lowercase: ValueTransformer = {
  to: (entityValue: string) => {
    return entityValue.toLocaleLowerCase();
  },
  from: (databaseValue: string) => {
    return databaseValue;
  },
};

export default lowercase;

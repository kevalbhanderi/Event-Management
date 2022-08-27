import { registerDecorator, ValidationArguments } from 'class-validator';
import { BadRequestException } from '@nestjs/common';
import { getErrorMessages } from '../../utils/language.helper';

export const IsValidAge = () => {
  return (object: Object, propertyName: string) => {
    registerDecorator({
      propertyName,
      name: 'IsValidAge',
      target: object.constructor,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const currDate = new Date();
          const birthDate = new Date(value);
          // find diff in years to validate user age
          const diffInYears =
            (currDate.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24 * 365);
          if (diffInYears < 18) {
            throw new BadRequestException(getErrorMessages().AGE_MUST_GREATER_18);
          }
          return true;
        },
      },
    });
  };
};

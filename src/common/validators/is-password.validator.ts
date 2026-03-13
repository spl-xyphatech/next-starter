import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsPasswordConstraint implements ValidatorConstraintInterface {
  validate(password: string) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    return typeof password === 'string' && passwordRegex.test(password);
  }

  defaultMessage() {
    return 'Password must be at least 8 characters long and include upper case, lower case, number, and special character (@$!%*?&)';
  }
}

export function IsPassword(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/no-wrapper-object-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsPasswordConstraint,
    });
  };
}

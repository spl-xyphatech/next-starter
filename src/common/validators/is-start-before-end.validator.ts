import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsStartBeforeEndConstraint implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments): boolean {
    console.log('Validating startDate and endDate', args);
    const obj = args.object as any;
    const startDate = obj.startDate;
    const endDate = obj.endDate;

    if (!startDate || !endDate) return true;
    return new Date(startDate) <= new Date(endDate);
  }

  defaultMessage() {
    return 'startDate must not be greater than endDate';
  }
}

export function IsStartBeforeEnd(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isStartBeforeEnd',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsStartBeforeEndConstraint,
    });
  };
}

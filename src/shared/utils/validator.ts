export type ValidatorMethods = "isRequired" | "isDate";

export type IRule = {
  message: string;
};

export type ValidatorConfigType<T> = Partial<
  Record<keyof T, Partial<Record<ValidatorMethods, IRule>>>
>;

export function validator<T>(
  data: T,
  validatorConfig: ValidatorConfigType<T>
): Record<keyof T, string> {
  const errors: Record<keyof T, string> = {} as Record<keyof T, string>;

  function validate(
    validateMethod: ValidatorMethods,
    fieldData: any,
    config?: IRule
  ) {
    let statusValidate = false;

    switch (validateMethod) {
      case "isRequired": {
        if (typeof fieldData === "boolean") {
          statusValidate = !fieldData;
        } else {
          statusValidate = String(fieldData).trim() === "";
        }
        break;
      }
      case "isDate": {
        statusValidate = !(fieldData instanceof Date);
        break;
      }
      default:
        break;
    }
    if (statusValidate && config) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in validatorConfig[fieldName]) {
      const error = validate(
        validateMethod as ValidatorMethods,
        data[fieldName],
        validatorConfig[fieldName]?.[validateMethod]
      );
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }

  return errors;
}

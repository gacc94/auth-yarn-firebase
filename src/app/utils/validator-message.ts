export interface IErrorMessage {
    [key: string]: string;
}


export const errorMessages: IErrorMessage = {
    required: 'This field is required.',
    pattern: 'Email must be valid.',
    minlength: 'This field must be at least 5 characters long.',
    email: 'Email must be valid.',
}

export const validatorErrorMessage = (validatorName: string): string => {
    return errorMessages[validatorName] ?? '';
}
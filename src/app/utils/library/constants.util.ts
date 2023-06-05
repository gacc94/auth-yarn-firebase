export abstract class  ConstantsUtil {

    static readonly SIGN_IN: string = 'sign-in';
    static readonly SIGN_UP: string = 'sign-up';

    /*
    * ========================================
    *           MESSAGE VALIDATION
    * =======================================*/

    static readonly REQUIRED: string = 'This field is required.';
    static readonly PATTERN: string = 'Email must be valid.';
    static readonly MIN_LENGTH: string = 'This field must be at least 5 characters long.';
    static readonly EMAIL: string = 'Email must be valid.';


    /*
    * =======================================
    *           REGEX VALIDATOR
    * ======================================*/

    static readonly PATTERN_EMAIL: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
}
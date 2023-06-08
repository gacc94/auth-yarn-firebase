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
    static readonly EMAIL_NOT_EXIST: string = 'The email entered does not exist.';
    static readonly DATA_INVALID: string = 'the data is invalid.';
    static readonly EMAIL_IN_USE: string = 'the email already in use.';

    /*
    * =======================================
    *           REGEX VALIDATOR
    * ======================================*/

    static readonly PATTERN_EMAIL: string = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';


    /*
    * ========================================
    *           LOCALSTORAGE - KEYS
    * =======================================*/
    static readonly TOKEN: string = 'token';
    static readonly REFRESH_TOKEN: string = 'refresh-token';
    static readonly CURRENT_USER: string = 'current-user';
}
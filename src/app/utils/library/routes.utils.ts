export abstract class RoutesUtils {
    /*
    * ========================================
    *           ROUTES - HOME
    * =======================================*/
    static readonly HOME: string = '/home';

    /*
    * ========================================
    *           ROUTES - AUTH
    * =======================================*/

    static readonly AUTH: string = '/auth';
    static readonly SIGN_IN: string = this.AUTH+'/sign-in';
    static readonly SIGN_UP: string = this.AUTH+'/sign-up';
    static readonly EMAIL_VERIFICATION: string = this.AUTH+'/email-verification';
    static readonly FORGOT_PASSWORD: string = this.AUTH+'/forgot-password';

    /*
    * ========================================
    *           ROUTES - DASHBOARD
    * =======================================*/
    static readonly DASHBOARD: string = '/dashboard';
    static readonly DASH_HOME: string = this.DASHBOARD+'/home';
    static readonly DASH_USERS: string = this.DASHBOARD+'/users';
    static readonly DASH_COUNTRIES: string = this.DASHBOARD+'/countries';




}
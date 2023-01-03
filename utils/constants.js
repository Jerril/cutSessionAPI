/**
 * @desc This file defines the app constants
 */

exports.AccessType = class {
    static user = 'user';
    static merchant = 'merchant';

    static all = [this.user, this.merchant];
}

exports.SessionType = class {
    static weekday = 'weekDay';
    static weekend = 'weekEnd';

    static all = [this.weekday, this.weekend];
}
/**
 * @desc This file defines the app constants
 */

class AccessType {
    static user = 'user';
    static merchant = 'merchant';

    static all = [this.user, this.merchant];
}

class SessionType {
    static weekday = 'weekDay';
    static weekend = 'weekEnd';

    static all = [this.weekday, this.weekend];
}

module.exports = {
    AccessType,
    SessionType
}
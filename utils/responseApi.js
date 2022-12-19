/**
 * @desc This file contains success and Error response for the API endpoints
 * @author Jeremiah Ekundayo
 * @since 2022
 */

exports.success = (message, data = null) => {
    return {
        success: true,
        message,
        data
    }
}

exports.error = (message, data = null) => {
    return {
        success: false,
        message,
        data
    }
}
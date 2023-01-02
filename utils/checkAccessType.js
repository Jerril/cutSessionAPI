const { success, error } = require('./responseApi');
const { AccessType, SessionType } = require('./constants');

exports.isMerchant = (req, res, next) => {
    if (req.user['accesstype'] !== AccessType.merchant) return res.status(422).json(error('Only merchants can perform this operation'))
    next();
}

exports.isUser = (req, res, next) => {
    if (req.user['accesstype'] !== AccessType.user) return res.status(422).json(error('Only users can perform this operation'))
    next();
}
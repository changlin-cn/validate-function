'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.validate = validate;
exports.validateAll = validateAll;

var _changlinUtil = require('changlin-util');

var _changlinWarning = require('changlin-warning');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validate(key, value, rules) {
    if (!(0, _changlinUtil.isString)(key) || !(0, _changlinUtil.isObject)(rules)) {
        throw new Error('Parameter type error');
    }

    if ((0, _changlinUtil.isUndefined)(rules[key]) || !(0, _changlinUtil.isObject)(rules[key])) {
        (0, _changlinWarning.warning)(true, key + ' has no rule');
        return null;
    }

    var rule = rules[key];

    if (rule.required) {
        if (value === '' || (0, _changlinUtil.isUndefined)(value)) {
            return (0, _extends3.default)({ errorMsg: (rule.name || key) + ' \u7684\u503C\u4E0D\u80FD\u4E3A\u7A7A', key: key, value: value }, rule);
        }
    }

    if ((0, _changlinUtil.whatIs)(rule.regexp) === "regexp" && !rule.regexp.test(value)) {
        return (0, _extends3.default)({ errorMsg: '\u8BF7\u6B63\u786E\u8F93\u5165' + (rule.name || key), key: key, value: value }, rule);
    }

    if ((0, _changlinUtil.isNumber)(rule.minLength) && value.length < rule.minLength) {
        return (0, _extends3.default)({ errorMsg: (rule.name || key) + '\u957F\u5EA6\u4E0D\u591F,\u81F3\u5C11' + rule.minLength + '\u4F4D', key: key, value: value }, rule);
    }

    if ((0, _changlinUtil.isNumber)(rule.maxLength) && value.length > rule.maxLength) {
        return (0, _extends3.default)({ errorMsg: (rule.name || key) + '\u957F\u5EA6\u592A\u957F,\u6700\u591A' + rule.maxLength + '\u4F4D', key: key, value: value }, rule);
    }
    return null;
}

function validateAll(obj, rules) {
    if (!(0, _changlinUtil.isObject)(obj) || !(0, _changlinUtil.isObject)(rules)) {
        throw new Error('Parameter type error');
    }

    var result = [];

    for (var each in rules) {
        var r = validate(each, obj[each], rules);
        if (r) {
            result.push(r);
        }
    }

    return result;
}
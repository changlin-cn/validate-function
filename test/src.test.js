import {validate, validateAll} from '../src/index'
import {regex} from 'changlin-util'

const expect = require('chai').expect;

describe('validate', function () {
    it('Parameter type error', function () {
        expect(function(){validate(1234, '31143219781212432x')}).to.throw(Error);
        expect(function(){validate('','',4312)}).to.throw(Error);
    });
    it('rule:undefined', function () {
        const rules = {
            name: {
                required: false,
            }
        }
        expect(validate('tel', '', rules)).to.equal(null);
        expect(validate('tel', undefined, rules)).to.equal(null);
    });
    it('required:false', function () {
        const rules = {
            name: {
                required: false,
            }
        }
        expect(validate('name', '', rules)).to.equal(null);
        expect(validate('name', undefined, rules)).to.equal(null);
    });
    it('required:true', function () {
        const rules = {
            name: {
                required: true,
                errorMsg:'error'
            }
        }
        expect(validate('name', '', rules).errorMsg).to.equal('error');
        expect(validate('name', undefined, rules).errorMsg).to.equal('error');
    });
    it('regexp:regexp', function () {
        const rules = {
            id: {
                regexp: regex.IdCard,
                errorMsg:'error'
            }
        }
        expect(validate('id', '31143219781212432x', rules)).to.equal(null);
        expect(validate('id', undefined, rules).errorMsg).to.equal('error');
        expect(validate('id', '1234', rules).errorMsg).to.equal('error');
    });

});


describe('validateAll', function () {
    it('Parameter type error', function () {
        expect(function(){validateAll('id', '31143219781212432x')}).to.throw(Error);
        expect(function(){validateAll({}, '31143219781212432x')}).to.throw(Error);
        expect(function(){validateAll()}).to.throw(Error);
    });
    it('normal', function () {
        const rules = {
            id: {
                regexp: regex.IdCard,
                errorMsg:'error'
            },
            name:{
                required:true
            }
        }
        expect(validateAll({'id':'31143219781212432x',name:1234}, rules).length).to.equal(0);
        expect(validateAll({'id':'31143219781212432x',}, rules).length).to.equal(1);
        expect(validateAll({name:'123'}, rules).length).to.equal(1);
        expect(validateAll({}, rules).length).to.equal(2);
    });
});
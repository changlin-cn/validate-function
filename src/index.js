import {isString,isObject,isUndefined,whatIs,isNumber,isFunction} from 'changlin-util'
import {warning} from 'changlin-warning'
export  function validate(key,value,rules){
    if(!isString(key)||!isObject(rules)){
        throw new Error('Parameter type error')
    }

    if(isUndefined(rules[key])||!isObject(rules[key])){
        warning(true,  `${key} has no rule`);
        return null
    }

    const rule=rules[key];

    if(rule.required){
        if(value===''||isUndefined(value)){
            return {errorMsg:`${rule.name || key} 的值不能为空`,key,value,...rule}
        }
    }

    if(whatIs(rule.regexp) === "regexp" && !rule.regexp.test(value)){
        return {errorMsg:`请正确输入${rule.name || key}`,key,value,...rule}
    }

    if(isNumber(rule.minLength)&&value.length<rule.minLength){
        return {errorMsg:`${rule.name || key}长度不够,至少${rule.minLength}位`,key,value,...rule}
    }

    if(isNumber(rule.maxLength)&&value.length>rule.maxLength){
        return {errorMsg:`${rule.name || key}长度太长,最多${rule.maxLength}位`,key,value,...rule}
    }
    return null
}

export function validateAll(obj,rules){
    if(!isObject(obj)||!isObject(rules)){
        throw new Error('Parameter type error')
    }

    const result=[]

    for(let each in rules){
       const r= validate(each,obj[each],rules);
       if(r){result.push(r)}
    }

    return result
}
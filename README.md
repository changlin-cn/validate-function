# validate-function
validate 

[![language](https://img.shields.io/badge/language-javascript-orange.svg)](https://github.com/changlin-cn/validate-function.git)     [![npm version](https://img.shields.io/npm/v/validate-function)](https://www.npmjs.com/package/validate-function)     


# Install
npm install validate-function

# Usage
```javascript
import {validate, validateAll} from '../src/index'
//Example 1
 const rules1 = {
            name: {
                required: true,
                errorMsg:'error'
            }
        }
 validate('name', '', rules1) //=>{errorMsg:'error',key:'name',value:'',required:true}






//Example 2
 const rules2 = {
            id: {
                regexp: regex.IdCard,
                errorMsg:'error'
            },
            name:{
                required:true
            }
        }
 validateAll({'id':'31143219781212432x',name:1234}, rules2)  //=>[]     

```
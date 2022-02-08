export function isStringEmpty(value){
    if(value === ''){
        return true
    }else{
        return false
    }
}

export function idGenerator(prefix){
    return Math.random().toString(36).replace('0.',prefix || '');
}
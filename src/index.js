module.exports = function styled(extendedFunction = null) {
    return function (stringValues, ...query) {
        return function(queryValue = {}) {
            let result = `${extendedFunction === null ? '' : extendedFunction(queryValue)}${stringValues[0]}`;
            if(query.length) {
                for(let i = 0; i < query.length; i++) {
                    result += `${query[i](queryValue)}${stringValues[i+1]}`;
                } 
            }
            return result.replace(/\n|\r|\t/g, "");
        }
    }
}

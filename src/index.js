module.exports = function styled(argument = null) {
    return function (str, ...args) {
        return function(last = {}) {
            const first = argument === null ? '' : argument(last);
            
            if(args.length === 0) return `${str}`.replace(/\n|\r|\t/g, "");
            
            let result = `${first}`;
            for(let i = 0; i < args.length; i++) {
                result += `${str[i]}${args[i](last)};`;
            }
            return result.replace(/\n|\r|\t/g, "");
        }
    }
}

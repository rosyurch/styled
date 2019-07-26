function styled(extendedElement) {
    if(!extendedElement) throw new Error('Wrong extended element');
    return function (stringValues, ...query) {
        return function(queryValue = {}) {
            let result = `${typeof extendedElement === 'function' ? extendedElement(queryValue) : ''}${stringValues[0]}`;
        
            function recursion(q) {
                return typeof q === 'function' ? recursion(q(queryValue)) : q || '';
            }

            if(query.length) {
                for(let i = 0; i < query.length; i++) {
                    const queryWithoutUndefined = recursion(query[i]);
                    result += `${queryWithoutUndefined}${stringValues[i+1]}`
                } 
            }
            return unique(result.replace(/\n|\r|\t/g, '').replace(/;;/g, ';'));
        }
    }
}

function unique(str) { //accepts a string converts to obj, which removes duplicating properties, assembles obj back to string
    const hash = {};
    const tmp = str.split(';').map(style =>style.split(':'));
    if(tmp.length > 1) {
        tmp.forEach(style => {
            hash[style[0]] = style[1]
        });
        let arr = [];
        for(prop in hash) {
            arr.push([`${prop}`,`${hash[prop]}`])
        }
        let tmp2 = arr.map(style => style.join(':'))
        return tmp2.join(';').replace(/:undefined/g, '') // undefined may appear somewhere in the string, clear it
    } 
    return str;
}

styled.div = styled('div');
styled.button = styled('button');
styled.a = styled('a');
styled.css = styled('s')

module.exports = styled;

function styled(extendedElement) {
    if(!extendedElement) throw new Error('Wrong extended element');

    return function (stringValues, ...query) {
        return function(queryValue = {}) {
            let result = `${typeof extendedElement === 'function' ? extendedElement(queryValue) : ''}${stringValues[0]}`;
            if(query.length) {
                for(let i = 0; i < query.length; i++) {
                    result += `${query[i](queryValue)}${stringValues[i+1]}`;
                } 
            }
            return result.replace(/\n|\r|\t/g, '').replace(/;;/g, ';');
        }
    }    
}

styled.div = styled('div');
styled.button = styled('button');
styled.a = styled('a');
styled.css = styled('s');

module.exports = styled;

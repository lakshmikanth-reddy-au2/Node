function sum(a) {
    return function (b) {
        return function (c) {
            return a+b+c;
        }
    }
}

console.log(sum(2)(3)(4));

function evaluate(operation) {
    return function(a) {
        return function(b) {
            if( operation === 'sum') return a+b;
            else if (operation === 'multiply') return a*b;
            else if (operation === 'divide') return a/b;
            else if(operation === 'substract') return a-b;
            else return 'Invalid operation';
        }
    }
};

let multiply = evaluate('multiply');

console.log(multiply(2)(3));
console.log(multiply(3)(5)); 

// Infinite currying

function sumInfinite(a) {
    return function (b) {
        if(b) return sumInfinite(a+b);
        else return a;
    }
}

console.log(sumInfinite(2)(3)());
console.log(sumInfinite(2)(3)(4)(5)(6)(7)());
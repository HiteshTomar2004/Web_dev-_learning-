import formatCurrency from "../scripts/utils/money.js";

console.log('test suite: formatCurrency');

console.log('converts cents to dollars');
if (formatCurrency(2095) === '20.95'){//basic test case
    console.log('passed');
} else{
    console.log('failed');
}

console.log('works with 0');
if(formatCurrency(0) === '0.00'){//edge case
    console.log('passed');
} else{
    console.log('failed');
}

console.log('round up to nearest cent [1]');
if(formatCurrency(2000.5) === '20.01'){//edge case
    console.log('passed');
} else{
    console.log('failed');
}

console.log('round up to nearest cent [2]');
if(formatCurrency(2000.4) === '20.00'){//edge case
    console.log('passed');
} else{
    console.log('failed');
}
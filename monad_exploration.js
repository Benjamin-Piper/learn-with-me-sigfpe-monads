const compose = (...fns) => initial =>
    fns.reduceRight((accumulator, nextFn) =>
    nextFn(accumulator), initial);

// -----------------------------------

const debugBind = debugFn => ({value: previousValue, message: previousMessage}) => {
    const {value: nextValue, message: nextMessage} = debugFn(previousValue);
    return {value: nextValue, message: previousMessage + nextMessage};
}

const composeValueMessage = (...valueMessages) => initial =>
    valueMessages.reduceRight((accumulator, nextFn) => 
    debugBind(nextFn)(accumulator), {value: initial, message: ""});

const debugAdd5 = x => ({value: x + 5, message: `${x} + 5 = ${x + 5}.`});
const debugSquare = x => ({value : Math.pow(x,2), message: `${x}^2 = ${Math.pow(x,2)}.`});

const debugLift = fn => x => ({value: fn(x), message: ""});

const debugUnit = x => ({value: x, message: ""});

// -----------------------------------

const multiValueBind = multiValueFn => array => array.map(multiValueFn).flat();

const multiValueUnit = x => [x];

const composeMultiValue = (...multiValueFns) => initial =>
    multiValueFns.reduceRight((accumulator, nextFn) =>
    multiValueBind(nextFn)(accumulator), multiValueUnit(initial));

const not = boolFn => x => !boolFn(x);
const digitList = number => {
    return number.toString().split("").filter(not(isNaN)).map(x => Number.parseInt(x));
}

const first3Multiples = x => [x, x * 2, x * 3];

const multiValueLift = multiValueFn => x => [multiValueFn(x)];


function normal() {
    console.log(this, "In normal");

    const arr = () => {
        this.money = '1000'
        console.log("In arrow", this);
    }
    
    arr();

    function InnerFunc() {
        console.log("Inner func", this);
    }

    InnerFunc();
}

// normal();



setTimeout(() => {
    console.log("In timeout")
},0);

// for(var i=0; i<5; i++) {
//     setTimeout(() => {
//         console.log(i)
//     },i*1000);
// }

console.log("outside");

const sumZero = (arr) => {
    let point1 = 0;
    let point2 = arr.length-1;

    for(let i=point1; i<=point2;) {
        if(arr[point1] + arr[point2] === 0 && arr[point1] !== arr[point2]) {
            return [arr[point1], arr[point2]];
        }
        else if (arr[point1] + arr[point2] >=1) {
            --point2
        } else if(arr[point1] + arr[point2] <=1) {
            ++point1
        }
    }

    return undefined;
}

console.log(sumZero([-2,-1,0,3]));

const arr = [5,1,3,2,6,1];
const user = [
    { firstName:"Akshay", age : 26 },
    { firstName:"Rohan", age : 75 },
    { firstName:"Rohit", age : 50 },
    { firstName:"Sago", age : 26 },
]

// function double(x){
//     return x*2;
// }

// function triple(x){
//     return x*3;
// }

// function binary(x){
//     return x.toString(2);
// }

// const output = arr.map(binary);

// const output = arr.filter((item,index) => {
//     return arr.indexOf(item) !== index;
// });

// console.log(output);

// const output = user.reduce(acc,curr) => {
//     
// },{}

const output = user.reduce((acc,curr) => {
    if(curr.age<30){
        acc.push(curr.firstName);
    }
    return acc;
},[])
console.log(output);
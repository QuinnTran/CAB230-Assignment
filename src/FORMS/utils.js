// import React from "react";
// import namor from "namor";

// const range = len => {
//   const arr = [];
//   for (let i = 0; i < len; i++) {
//     arr.push(i);
//   }
//   return arr;
// };

// const newOffence = () => {
//   return {
//     offence: namor.generate({ words: 1, numbers: 0 }),
//     area: namor.generate({ words: 1, numbers: 0 }),
//     age: Math.floor(Math.random() * 30),
//     year: Math.floor(Math.random() * 100)
//   };
// };

// export function makeData(len = 5553) {
//   return range(len).map(d => {
//     return {
//       ...newOffence(),
//       offence: range(10).map(newOffence)
//     };
//   });
// }

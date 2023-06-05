// const fruits = ['Apple', 'Banana', 'Orange']
// const vegetables = ['Cucumber', 'Radish']

// console.log([...fruits, ...vegetables])

// // ... extracts elements of list and merges them in one new list

// // This is Object
// const developer = {
//   salary: 100000,
//   experience: 4.5,
//   techStack: ['Vue', 'HTML', 'CSS'],
//   lookingForWork: true,
//   //   method below
//   dobleSalary() {
//     this.salary = this.salary * 2
//     this.lookingForWork = false
//   }
// }

// console.log(developer.salary)
// console.log(developer.lookingForWork)

// developer.dobleSalary()

// console.log(developer.salary)
// console.log(developer.lookingForWork)

// export const evenOrOdd = (number) => {
//   if (number % 2 === 0) {
//     return 'Even'
//   } else {
//     return 'Odd'
//   }
// }

// export const multiply = (a, b) => {
//   return a * b
// }

// const numbers = [1, 2, 3, 4, 5]

// const names = ['BOBBY', 'SALLY', 'DEBBIE']

// // an array of squares
// // [1, 4, 9, 16, 25]

// const squares = numbers.map((number) => {
//   return number * number
// })

// const lowercaseNames = names.map((name) => {
//   return name.toLowerCase()
// })

// console.log(squares)

// console.log(lowercaseNames)

//

const favouriteFood = 'sushi'

const goodFoods = {
  [favouriteFood]: true
}

console.log(goodFoods)

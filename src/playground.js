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

// const favouriteFood = 'sushi'

// const goodFoods = {
//   [favouriteFood]: true
// }

// console.log(goodFoods)

// const interval = setInterval(() => {
//   console.log('I will print every 2 seconds')
// }, 2000)

// console.log(interval)

// setTimeout(() => {
//   clearInterval(interval)
//   console.log('Interval cleared')
// }, 10000)

// const axios = require('axios')

// const url = 'http://localhost:3000/jobs'

// const fethJobsV1 = () => {
//   axios.get(url).then((response) => {
//     console.log(response.data)
//   })
// }

// const fethJobsV2 = async () => {
//   const response = await axios.get(url)
//   console.log(response.data)
// }

// fethJobsV2()

// const sushi = ['Tuna', 'Salmon', 'Eel', 'Shrimp', 'Octopus', 'Uni']

// console.log(sushi.slice(2, 4))

// LEARNING SETS BELOW

// Arrays - order
// Objects - association
// Set - uniquness

// const numbers = new Set()
// numbers.add(5)
// numbers.add(10)
// numbers.add(15)
// numbers.add(10)

// console.log(numbers)

// -----------------------------
// FILTER
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 11, 23, 521]

console.log(numbers.filter((number) => number > 6))

const jobs = [
  { title: 'Angular dev', organization: 'Microsoft' },
  { title: 'Programmer', organization: 'Google' },
  { title: 'Developer', organization: 'Microsoft' }
]

console.log(jobs.filter((job) => job.organization === 'Microsoft'))

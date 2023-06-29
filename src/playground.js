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
// // FILTER
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 11, 23, 521]

// console.log(numbers.filter((number) => number > 6))

// const jobs = [
//   { title: 'Angular dev', organization: 'Microsoft' },
//   { title: 'Programmer', organization: 'Google' },
//   { title: 'Developer', organization: 'Microsoft' }
// ]

// console.log(jobs.filter((job) => job.organization === 'Microsoft'))

// --------------------------------------------------
// Reactivity in Vue 3

const { ref, reactive, computed, toRef, toRefs } = require('vue')

let a = ref(1)
let b = ref(2)

console.log(a.value)
console.log(b.value)

let c = computed(() => a.value + b.value)
console.log(c.value)

a.value = 10
console.log(c.value)

const name = ref('Boris')
console.log(name.value)

const title = computed(() => name.value + ' the Great')
console.log(title.value)

name.value = 'Peter'

console.log(title.value)

// Object reactivity

// Reactive for objects !!

// Multiple lvl of reactivity We can chain dependencies
const person = reactive({
  firstName: 'Boris',
  lastName: 'Paskhaver'
})
// Destructuring
// const { firstName, lastName } = person
// // hard workaround below
// const firstName = toRef(person, 'firstName')

// const lastName = toRef(person, 'lastName')

// cooler way shorter one
const { firstName, lastName } = toRefs(person)

const title2 = computed(() => `${firstName.value} ${lastName.value} the Wunderbar`)

// const title2Length = computed(() => title2.value.length)

console.log(title2.value)
// console.log(title2Length.value)

person.firstName = 'Napoleonionon'

// console.log(title2Length.value)
console.log(title2.value)

person.lastName = 'Griffin'
// console.log(title2Length.value)
console.log(title2.value)

const refPreson = toRefs(person)

console.log(person.firstName)
console.log(refPreson.firstName)

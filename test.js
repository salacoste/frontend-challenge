
// let y = new Promise((res,rej)=> {
// console.log('Making a request...')
// var a = Math.random()*10
//  return new Promise(()=> {setTimeout(()=>{
//   console.log('Fetching data from database..', a)  
//   if(a>4) {
//     rej(a)
//   }
//   res(a)
// }, 2000)})
// })
// .then((a)=>{
//   console.log('Second request...', a)
// })
// .catch((e)=>{
//   console.log('Oops, error is ' + e)
// })


// async function asyncFetch() {
//   console.log('Start fetching..')
//   await setTimeout(()=> {
//     console.log('setTimeout is logging..')
//   }, 2000)

//   const request = await new Promise((res)=> {
//     setTimeout(()=> {
//       console.log('Internal console log')
//       res()
//     },1500)
//   })
// }

// asyncFetch()


// let Obj = Object.assign({}, {})
let O = Object.assign({}, {b: 4})
console.log('getOwnProperties', Object.getOwnPropertyDescriptors(O))

Object.defineProperty(O, 
  'a', {enumerable: false, configurable: true, writable:true, value: 666}
  )

console.log(Object.getOwnPropertyDescriptors(O))

Object.defineProperty(O, 
  'a', {
    value: 123,
    enumerable: false
  })
console.log(Object.getOwnPropertyDescriptors(O))
console.log('enum:false property', O.a)

delete O.a
console.log('property a has been deleted', Object.getOwnPropertyDescriptors(O))


// console.log('just console.log', O)


let arr = [2, null, 4, 56, 7]
let it = arr[Symbol.iterator]()
console.log(it.next())

for (let k of arr) {
console.log(k)

}

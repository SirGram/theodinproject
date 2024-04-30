const url = require('url')
const myUrl = new URL('http://mywebsite.com/hello.html?id=100&status=active')

console.log(myUrl.toString())
console.log(myUrl.port)
console.log(myUrl.hostname)
console.log(myUrl.pathname)
console.log(myUrl.searchParams)
myUrl.searchParams.append('abc', '123')
console.log(myUrl.searchParams.forEach((name, value)=> console.log(name, value)))



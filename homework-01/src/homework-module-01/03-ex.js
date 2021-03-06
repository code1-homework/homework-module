
const fp = require('lodash/fp')

import {Maybe, Container} from './support'


// 1.使用fp.add(x,y)和sp.map(f,x)创建一个能让functor里的值增加的函数ex1。

let maybe = Maybe.of([5, 6, 1])
// let maybe = Maybe.of(null)

let ex1 = (x, y) => {
    if(typeof x._value === 'number') {
        return fp.add(x._value, y)
    }
    return x.map(fp.map(v => fp.add(v, y)))
    ._value
}

let er1 = ex1(maybe, 1)
console.log('er1', er1)


// 2.实现一个函数ex2，能够使用fp.first获取列表的第一个元素。

let xs = Container.of([
    'do', 'ray', 'me', 'fa', 'so', 'la', 'ti', 'do'
])

let ex2 = (d) => {
    return d.map(fp.first)
        ._value
}

let er2 = ex2(xs)
console.log('er2,'+ er2)


// 3.实现一个函数ex3，使用safeProp和fp.first找到user的名字的首字母。

let safeProp = fp.curry(function (x, o) {
    return Maybe.of(o[x])  
})

let user = {id: 2, name: 'Albert'}
let ex3 = (d) => {
    return safeProp('name', d)
    .map(fp.first)
    ._value
}

let er3 = ex3(user)
console.log('er3,', er3)


// 4.使用Maybe重写ex4，不要有if语句。

// let ex4 = function(n) {
//     if(n) {
//         return parseInt(n)
//     }
// }

let ex4 = function (n) {
    return Maybe.of(n)
        .map(parseInt)
        ._value
}

let er4 = ex4('3')
// let er4 = ex4(null)

console.log('er4,', er4)

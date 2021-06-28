const fp = require('lodash/fp')

// horsepower 马力
// dollar_value 价格
// in_stock 库存
const cars = [
    {
        name: 'Ferrari FF',
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true
    },
    {
        name: 'Spyker C12 Zagato',
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    },
    {
        name: 'Jaguar XKR-S',
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: 'Audi R8',
        horsepower: 525,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: 'Aston Martin One-77',
        horsepower: 750,
        dollar_value: 185000,
        in_stock: true
    },
    {
        name: 'Pagani Huayra',
        horsepower: 770,
        dollar_value: 1300000,
        in_stock: false
    }
]

// 1.fp.flowRight 获取最后一条数据的in_stock属性值

let isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
let r = isLastInStock(cars)
console.log('isLastInStock', r)


// 2.使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name

let theFirstCarName = fp.flowRight(fp.prop('name') ,fp.first)
let rName = theFirstCarName(cars)
console.log('theFirstCarName', rName)


// 3.使用帮助函数_average重构averageDollarValue，使用函数组合的方式实现。

// let averageDollarValue = function (cars) {
//     let dollar_values = fp.map(function(car) {
//         return car.dollar_value
//     }, cars)
//     return _average(dollar_values)
// }

// let _average = function (xs) {
//     return fp.reduce(fp.add, 0, xs) / xs.length
// }

let _average = fp.flowRight(fp.mean, fp.map(fp.prop('dollar_value')))

let rAverage = _average(cars);
console.log('_average', rAverage)


// 4.使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name转换成这种形式：例：sanitizeNames([“Hello World”}) => [“hello_world”]。

let _underscore = fp.replace(/\W+/g, '_');

let sanitizeNames = fp.map(fp.flowRight(_underscore, fp.lowerCase))

let sanitizeNamesCarName = fp.flowRight(sanitizeNames, fp.map(fp.prop('name')))

let rSanitizeName = sanitizeNames(["Hello World"])
let rSanitizeNamesCarName = sanitizeNamesCarName(cars)

// let sanitizeNamesCarNameNew = fp.flowRight(sanitizeNames, fp.map(fp.set('name', sanitizeNamesCarName)))

console.log('rSanitizeName', rSanitizeName)
console.log('rSanitizeNamesCarName', rSanitizeNamesCarName)
// console.log('sanitizeNamesCarNameNew', sanitizeNamesCarNameNew(cars))

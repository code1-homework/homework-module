
// setTimeout(function () {
//     var a = 'hello'
//     setTimeout(function () {
//         var b = 'lagou'
//         setTimeout(function () {
//             var c = 'I love you'
//             console.log(a + b + c)
//         }, 10)
//     }, 10)
// }, 10)


function PromiseFn(data) {
    let p = new Promise(function (resolve, reject) {
        setTimeout(()=>{
            resolve(data);
        },10)
    });
    return p;
}

!async function () {
    let r = await PromiseFn('Hello,');
    let r1 = await PromiseFn('lagou.');
    let r2 = await PromiseFn('I love you.');
    console.log(r + r1 + r2)
}()





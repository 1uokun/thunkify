# thunkify
thunkify化目的不是为了解决**回调地狱<sup>[注1]</sup>**，而是为了解决Callback的**控制反转**，让结果更加可控

thunkify 适用于 `func(...args,callback)`

比如`$.get`函数是适合thunk化的
```js
$.get("http://example.com/api/a",function(data,status){
  console.log(data,status)
})
```
当宿主函数报错时，回调函数遵循"错误优先风格"(也称"Node风格")
```js
var readFile = require('fs').readFile;

thunkify(readFile)("path","utf-8")(function(err){
  if(err instanceof Error){
    console.log(err.message)
  }
})
```

> 注1：**回调地狱**想表达的不仅仅是嵌套/缩进（也被称为"末日金字塔"），而是[关于顺序和信任问题](https://github.com/getify/You-Dont-Know-JS/blob/1ed-zh-CN/async%20%26%20performance/ch2.md#%E4%BF%A1%E4%BB%BB%E9%97%AE%E9%A2%98)

## example
 - 常规：A请求完再请求B，B请求完再请求C
```js
var getThunkify = thunkify($.get);

getThunkify("http://example.com/api/a")(function(data,status){
  console.log("a",data,status);
  getThunkify("http://example.com/api/b")(function(data,status){
    console.log("b",data,status);
    getThunkify("http://example.com/api/c")(function(data,status){
      console.log("c",data,status)
    })
  })
})
```
 - 并发请求ABC，但是要求顺序输出ABC的结果
```js
//并发请求
var a = thunkify($.get)("http://example.com/api/a");
var b = thunkify($.get)("http://example.com/api/b");
var c = thunkify($.get)("http://example.com/api/c");

//顺序输出
a(function(data,status){
  console.log("a",data,status);
  b(function(data,status){
    console.log("b",data,status);
    c(function(data,status){
      console.log("c",data,status)
    })
  })
})
```

# License

[![LICENSE](https://img.shields.io/badge/license-Anti%20996-blue.svg)](https://github.com/996icu/996.ICU/blob/master/LICENSE)


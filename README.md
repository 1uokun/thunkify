# thunkify
thunkify化目的不是为了解决**回调地狱**，而是为了解决Callback的**控制反转**，让结果更加可控

thunkify 适用于 `func(...args,callback)`

比如`$.get`函数是适合thunk化的
```
$.get("http://example.com/api/a",function(data,status){
  console.log(data,status)
})
```
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


function thunkify(fn){

    return function(){
        var called;
        var callback;
        var args = new Array(arguments.length);

        for(var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        args.push(function(){
            // 回调——信任问题：只允许回调一次
            if (called) return;
            called = true;

            if (callback) callback.apply(null,arguments);
            else callback = arguments
        });

        try{
            fn.apply(null,args);
        }catch (err) {
            // error-first style
            callback = [err]
        }

        return function(done){
            if (callback) done.apply(null,callback);
            else callback = done
        }
    }
}

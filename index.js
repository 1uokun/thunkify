function thunkify(fn){

    return function(){
        var called;
        var args = new Array(arguments.length);

        for(var i = 0; i < args.length; ++i) {
            args[i] = arguments[i];
        }

        args.push(function(){
            if (called) called.apply(null,arguments);
            else called = arguments
        });

        fn.apply(null,args);

        return function(done){
            if (called) done.apply(null,called);
            else called = done
        }
    }
}

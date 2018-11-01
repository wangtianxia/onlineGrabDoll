/*/qhc/*/

/*中央定时器控制*/
var timers = {                                     

    timerID : 0,
    randomKey:'1',  
    /*timers : [],  */  
    timers : {}, 
    add : function (fn,key) {
        /*this.timers.push(fn);*/
        if(key){
            this.timers[key] = fn;
            console.log(key)
        }else{
            this.randomKey+='1';
            this.timers[this.randomKey] = fn;
        }
    },
    start : function (){

        if(this.timerID) return;

        (function runNext(){
            //if(timers.timers.length>0){
                /*for(var i=0;i<timers.timers.length;i++){
                    if(timers.timers[i]() === false){
                        timers.timers.splice(i,1);
                        i--;
                    }
                }*/
                for(var i in timers.timers){
                    if(timers.timers[i]() === false){
                        delete timers.timers[i];
                    }
                }
                timers.timerID = setTimeout(runNext,1000);
            //}
        })();
    },
    del:function(key){
        for(var i in timers.timers){
            if(i == key){
                delete timers.timers[i];
            }
        }
    },
    stop : function(){
        clearTimeout(this.timerID);
        this.timerID = 0;
    }

};

 export default timers;
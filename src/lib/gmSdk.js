if(!window.gameApp){
	var gameApp = {};
	window.gameApp = gameApp;
	try{		
		var iosFunHandler = function(fun){
			return function(){
				var str = "";
				for(var i=0; i<arguments.length; i++){
					str += "@"+(arguments[i]||"")
				}
				if(fun){
					window.webkit.messageHandlers[fun].postMessage(str.substring(1));
				}
			};			
		};
		gameApp["outsideGameBuyGameProp"] = iosFunHandler('iOS_outsideGameBuyGameProp');
		gameApp["gamePageLoadRead"] = iosFunHandler('iOS_gamePageLoadRead');
	}catch(e){
		console.log("gameApp Error",e);
	}
}
window.gameApp.execute = function(fnName){
	if(fnName && arguments.length && this[fnName]){
		var args = [];
		for(var i=1; i<arguments.length; i++){
			args.push(arguments[i]);
		}
		this[fnName].apply(this,args);
	}else{
		console.log("GameApp 方法"+fnName,"不存在");
	}	
};
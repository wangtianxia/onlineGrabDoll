
	function Queue(maxLen,init) {

		this.len = 0;
		this.maxLen = maxLen;
		this.data={};
		// console.log(init)
		this.initData=init||{};
		// this.data = init||{}; //队列{}
		this.len=this.getLen();
		this.init();
	}
	Queue.prototype.init = function() {
		for(var i in this.initData){
			// console.log(i,this.initData[i])
			this.add(i,this.initData[i])
		}
	};
	Queue.prototype.getLen = function(){
		var count=0;
		for(var i in this.data){
			count++;
		}
		return count;
	}
	Queue.prototype.add = function(key,json) {
		if(key in this.data){
			return;
		}
		this.data[key]=json;
		this.len++;
		if (this.len > this.maxLen) {
			this.delNo1();
			this.len=this.maxLen;
		}
	}
	Queue.prototype.del = function(key) {
		for(var i in this.data){
			if(key==i){
				delete this.data[key];
				this.len--;
				return true;
			}
		}
		return false;
	}
	Queue.prototype.delNo1 = function() {
		for(var i in this.data){
			delete this.data[i]
			break;
		}
		return;
	}

 export default Queue;

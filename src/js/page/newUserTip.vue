<template>
	<div id='newUserTip'>
        <div id='mask'></div>
        <img :src="newUserImg" v-on:click.stop.prevent='clickNewUser' style="margin-left:-2.80rem;width:5.6rem;height:5.7rem">
    </div>
</template>
<script>
import CF from '../../router/ind.js'
export default {
    data(){
        return{
            newUserImg:""
        }
    },
    props:['isNewUser'],

    created:function(){
        if(this.isNewUser == 1){
            this.newUserImg = 'static/image/notice/newUser1.png'
        }else if(this.isNewUser == 2){
            this.newUserImg = 'static/image/notice/newUser.png'
        }else{
            this.newUserImg = 'static/image/notice/newUser1.png'
        }
    },
    watch:{
        '$route' (to, from) {

        }
    },
    methods:{
    	clickNewUser:function(){
    		this.$emit('ok')
    	}
    }
}
 

</script>


<style scoped>


    #newUserTip{
        position:fixed;
        /*height:100%;
        width:100%;*/
        top:0rem;
        width:100%;
        z-index: 999;
        text-align: center;
    }
    #newUserTip img{
        position: absolute;
        margin-top:3.00rem;
    }
    #mask{
        position:absolute;
        height:15.00rem;
        width:100%;
        background:black;
        opacity:0.5;
    }


</style>
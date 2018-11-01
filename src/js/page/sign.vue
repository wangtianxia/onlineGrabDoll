<template>
	<div id='sign'>
            <div id='mask'></div>
            <!-- <img src="static/image/notice/newUser.png" v-show='isNewUser' v-on:click='clickNewUser' style="margin-left:-2.28rem">
            <div id='mask' v-show='isShowSign' style="opacity:0.2"></div> -->
            <img src="static/image/notice/sign.png" @click.prevent='clickSign' style="margin-left:-2.80rem;width:5.6rem;height:6.9rem">
    </div>
</template>
<script>
import CF from '../../router/ind.js'
export default {
    data:function(){
        return{

        }    
    },

    created:function(){

    },

    watch:{
        '$route' (to, from) {

        }
    },

    methods:{
    	clickSign:function(){
    		this.$emit('ok')
        }
        
    }
}
 

</script>


<style scoped>


    #sign{
        position:fixed;
        /*height:100%;
        width:100%;*/
        top:0rem;
        width:100%;
        z-index: 999;
        text-align: center;
    }
    #sign img{
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
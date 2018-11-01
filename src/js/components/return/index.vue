<template>
    <div id='return' v-on:click='returnToIndex'>
        <img src="static/image/return.png" style='width:0.56rem;'>
    </div>
</template>

<script>
    export default {
        name: "return",

        methods:{
            returnToIndex(){
                this.$emit('returnToIndex')
            }
        }
    }
</script>

<style scoped>
    #return{
        position: absolute;
        left: 0;
        z-index: 105;
        top: 0;
        width: 1rem;
        height: 1rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #return>img{
        width: 0.56rem;
    }
</style>
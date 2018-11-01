<template>
    <section class="gameLoad">
        <section class="gameLoadDiv">
            <img :src="imgSrc" alt="">
            <p :class="[type==0?'showText2':'showText']" >数据加载中...</p>
        </section>
    </section>
</template>

<script>
    export default {
        data(){
            return {
                imgSrc:''
            }
        },
        name: "index",
        props:['type'],
        mounted(){
            if(this.type == 0){
                this.imgSrc = 'static/image/game/loadImg0.png'
            }else{
                this.imgSrc = 'static/image/game/loadImg.png'
            }
        }
    }
</script>

<style scoped>
    .gameLoad{
        position: absolute;
        left: 0;
        top: 0;
        z-index: 104;
        background-color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .gameLoadDiv{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }
    .gameLoadDiv>img{
        width: 0.7rem;
        height: 0.8rem;
    }
    .gameLoadDiv>p{
        font-size: .32rem;
        width: 100%;
        text-align: center;
    }
    .showText{
        color: #ff8f11;
    }
    .showText2{
        color: #999;
    }

</style>
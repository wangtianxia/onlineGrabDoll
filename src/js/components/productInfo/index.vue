<template>
    <section class="productInfoContent" @click="goProductInfo">
        <img :src="`https://wwjcdn.like000.com/wwjDollImg/${doll_id}.jpg`" alt="">
        <section class="productInfo">商品详情</section>
        <section class="redPoint" v-if="redPoint"></section>
    </section>
</template>

<script>
    export default {
        name: "productInfo",
        data(){
            return {
                redPoint:false,
                hasDoll_show:false
            }
        },
        props:['doll_id','isHasProductRedPoint',"doll_shows"],
        mounted(){
            this.redPoint = this.isHasProductRedPoint;
            this.hasDoll_show = this.doll_shows
        },

        methods:{
            goProductInfo(){
                //{name: 'productInfo', params: {doll_shows: this.hasDoll_show,doll_id:this.doll_id}
                let hasNewDollShow = this.hasDoll_show?1:0
                this.$router.push(`/productInfo/${this.doll_id}/${hasNewDollShow}`)
            }
        },
        watch:{
            isHasProductRedPoint(){
                this.redPoint = this.isHasProductRedPoint
            },
            doll_shows(){
                this.hasDoll_show = this.doll_shows
            }
        }
    }
</script>

<style scoped>
    .productInfoContent{
        position: absolute;
        z-index: 100;
        top: 1rem;
        left: 0.2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        font-size: 0;
        font-weight: bold;
        color: white;
        text-align: center;
        align-content: center;
        width: 1.2rem;
        height: 1.5rem;
    }
    .productInfoContent>img{
        width: 0.92rem;
        height: 0.92rem;
        border-radius: 50%;
        background-color: black;
    }
    .productInfo{
        width: 100%;
        margin-top: 0.1rem;
        font-size: 0.28rem;
        display: inline-block;
    }
    .redPoint{
        position: absolute;
        right: 0;
        top: 0.1rem;
        z-index: 101;
        background-color: red;
        border-radius: 50%;
        border: 2px solid #fff;
        width: 0.24rem;
        height: 0.24rem;
    }
</style>
<template>
    <!--仓储物流图片-->
    <div class="store">
        <section style="width: 100%;height: 0.1rem;background-color: #eee"></section>
        <section class="storageContent">
            <section class="storageContentTitle">关于仓储</section>
            <section class="storageContentImg">
                <section>
                    <img src="https://wwjcdn.like000.com/wwjDollImg/storage1.jpg" alt="">
                    <section>娃娃库房</section>
                </section>
                <section>
                    <img src="https://wwjcdn.like000.com/wwjDollImg/storage2.jpg" alt="">
                    <section>娃娃机库房</section>
                </section>
            </section>
        </section>
        <section style="width: 100%;height: 0.1rem;background-color: #eee"></section>
        <section class="logisticsContent">
            <section class="logisticsContentTitle">关于物流</section>
            <section class="logisticsContentImg">
                <section>
                    <img src="https://wwjcdn.like000.com/wwjDollImg/logistics1.jpg" alt="">
                    <section>合作物流</section>
                </section>
                <section>
                    <img src="https://wwjcdn.like000.com/wwjDollImg/logistics2.jpg" alt="">
                    <section>每天发货</section>
                </section>
                <section>
                    <img src="https://wwjcdn.like000.com/wwjDollImg/logistics3.jpg" alt="">
                    <section>发货说明</section>
                </section>
            </section>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        }
    }
</script>

<style>
    .store{
        font-size: 0;
    }
    .storageContent,.logisticsContent{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        align-content: center;
        position: relative;
    }
    .storageContent>section,.logisticsContent>section{
        width: 100%;
        text-align: center;
    }
    .storageContentImg,.logisticsContentImg{
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .storageContentImg>section>img{
        width: 3.45rem;
        height: 2.76rem;
    }
    .storageContentImg>section>section{
       font-size: 0.28rem;
        color: rgba(50, 50, 50, 0.7);
        text-align: center;
        width: 100%;
        margin: 0.2rem 0;
    }
    .logisticsContentImg>section>img{
        width: 2.3rem;
        height: 3.0rem;
    }
    .logisticsContentImg>section>section{
        font-size: 0.28rem;
        color: rgba(50, 50, 50, 0.7);
        text-align: center;
        width: 100%;
        margin: 0.2rem 0;
    }
    .logisticsContentTitle,.storageContentTitle{
        margin: 0.2rem 0;
        font-size: 0.3rem;
        color: rgba(50, 50, 50, 0.7);
        text-align: center;
        font-weight: bold;
        position: relative;
    }
    /*.logisticsContentTitle::after,.storageContentTitle::after{*/
        /*content: ' ';*/
        /*width: 1.12rem;*/
        /*height: 1px;*/
        /*border-top: 2px dashed #323232;*/
        /*position: absolute;*/
        /*right: 20%;*/
        /*top: 50%;*/
        /*font-weight: bold;*/
    /*}*/
    /*.logisticsContentTitle::before,.storageContentTitle::before{*/
        /*content: ' ';*/
        /*width: 1.12rem;*/
        /*height: 1px;*/
        /*border-top: 2px dashed #323232;*/
        /*position: absolute;*/
        /*left: 20%;*/
        /*top: 50%;*/
        /*font-weight: bold;*/
    /*}*/

</style>
<template>
    <!--商品详情-->
    <section class="productInfoContent">
        <goBack @returnToIndex="returnToIndex"></goBack>
        <section class="title">{{doll_name}}</section>
        <section class="productInfoTop" v-if="doll_desc.length>0">
            <section class="productInfoTopInfo">{{doll_desc}}</section>
        </section>
        <section class="productInfoShowDoll" v-if="dollShowList.length!=0">
            <section class="newDollShow" @click="toDollShow">
                <img src="static/image/newImage/productInfo.png" alt="">
                <section class="dollShowWorm" v-if="hasNewDollShow"></section>
            </section>
            <section class="productInfoShowDollSection">
                <section class="titleProduct">其他玩家抓到的娃娃</section>
                <section class="productInfoShowDollShow">
                    <section class="sectionInfo" v-for="(item,index) in dollShowList" :style="{backgroundImage: 'url(' + item.url + ')'}" :key="index" @click="toDollShow">
                    </section>
                </section>
            </section>
        </section>
        <section style="font-size: 0">
            <section style="width: 100%;height: 0.1rem;background-color: #eee"></section>
            <section v-for="(itemImg,index) in  detailsArr" :key="index">
                <img class="detailInfoImg" :src="itemImg.url" alt="">
            </section>
        </section>
        <!--<storageAndLogistics></storageAndLogistics>-->
    </section>
</template>

<script>
    import CF from '../../router/ind';
    import goBack from '../components/return/index';
    import storageAndLogistics from '../components/storageAndLogistics/storage';
    import {getDetailInfo} from '../../server/getServerData';


    export default {
        name: "productInfo",
        data() {
            return {
                doll_id: '',
                doll_name: '',
                dollShowList: [],
                doll_desc: '',
                hasNewDollShow: false,
                detailsArr: [],
                detailsArrs: []
            }
        },
        mounted() {

            let doll_id = this.$route.params.doll_id;
            this.hasNewDollShow = this.$route.params.hasNewDollShow == 1 ? true : false;
            this.doll_id = doll_id;

            getDetailInfo('doll_details', this.doll_id, (data) => {
                if (data['status'] == 1) {
                    this.doll_desc = data['data']['desc'];
                    this.doll_name = data['data']['doll_name'];
                    this.dollShowList = data['data']['list'];
                    if (this.dollShowList.length > 3) {
                        this.dollShowList.length = 3;
                    }

                    if (data['data']['details'] && data['data']['details'].length > 0) {
                        this.detailsArr = data['data']['details'];
                    }
                }
            });
        },

        methods: {
            returnToIndex() {
                this.$router.go(-1);
            },
            toDollShow() {
                this.$router.push({name: 'dollShowPage', params: {doll_id: this.doll_id}})
            }
        },

        components: {
            goBack, storageAndLogistics
        }

    }
</script>

<style scoped>
    .title {
        height: 1rem;
        width: 100%;
        text-align: center;
        font-size: 0.32rem;
        font-weight: bold;
        color: #323232;
        line-height: 1rem;
    }

    .titleProduct {
        padding: 0.3rem 0.3rem;
        font-size: 0.3rem;
        color: rgba(50, 50, 50, 0.7);
        text-align: left;
        font-weight: bold;
        position: relative;
    }

    .productInfoShowDollSection {
        background-color: white;
        border-radius: 0.2rem;
        position: relative;
    }

    .productInfoShowDoll {
        padding: 0.1rem 0.2rem 0 0.2rem;
        background-color: #eee;
        position: relative;
    }

    .productInfoTop {
        padding: 0 0.2rem;
    }

    .productInfoTopInfo {
        font-size: 0.26rem;
        font-weight: bold;
        color: rgba(50, 50, 50, 0.8);
        border: 1px solid #f1f1f1;
        padding: 0.18rem 0.21rem;
        border-radius: 0.1rem;
        margin-bottom: 0.3rem;
    }

    .dollListImg {
        width: 2.4rem;
        height: 2.4rem;

        /*width: 2rem;*/
        /*height: 100%;*/
        border-radius: 0.15rem;
        /*margin-left: 0.2rem;*/
        position: absolute;
        /*max-height: 2.6rem;*/
    }

    .productInfoShowDollShow {
        font-size: 0;
        padding-bottom: 0.3rem;
        overflow: hidden;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .newDollShow {
        position: absolute;
        right: 0.46rem;
        top: 0.3rem;
        width: 0.43rem;
        height: 0.36rem;
        font-size: 0;
        z-index: 2;
    }

    .newDollShow > img {
        width: 0.43rem;
        height: 0.36rem;
    }

    .dollShowWorm {
        top: -0.1rem;
        right: -0.1rem;
        width: 0.15rem;
        height: 0.14rem;
        border: 2px solid #fff;
        border-radius: 50%;
        position: absolute;
        background-color: red;
    }

    .detailInfoImg {
        width: 7.5rem;
    }

    .sectionInfo {
        width: 2.4rem;
        height: 2.4rem;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        display: inline-block;
        margin-left: 0.2rem;
    }

</style>
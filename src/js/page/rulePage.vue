
<template>
    <div>
        <goBack @returnToIndex="returnBack"></goBack>
        <div id='content' >
            <div v-show="isRouleChange">
                <div  v-for='(item,index) in items' :key="index">
                    <div class="tip">{{item.head}}</div>
                    <div class="text">
                        {{item.text}}
                    </div>
                    <div class="line"></div>
                </div>
            </div>
            <section v-show="!isRouleChange">
                <div class="tip">
                    抓球球玩法就三步：
                </div>
            </section>
            <div v-show="!isRouleChange">
                <div  v-for='(item,index) in ballItems' :key="index">
                    <div class="tip" v-if="item.text">
                        {{item.text}}
                    </div>
                    <div class="BallImg" v-if="item.img">
                        <img :src="item.img" alt="">
                    </div>
                </div>
            </div>
            <div style="text-align:center" v-show='isWx'>
                <img :src="erweiMa">
            </div>
        </div>
    </div>
</template>
<script>

    import CF from '../../router/ind.js';
    import rule from '../../rule';
    import goBack from '../components/return/index'

    export default {
        data:function(){
            return{
                isWx:((CF.user.platform!=1003 && CF.user.platform!=1007 && CF.user.platform!=1013 )?true:false),
                items:[],
                ballItems:[],
                isCloseImg:true,
                isRouleChange:true,
                erweiMa:''
            }
        },

        mounted:function(){
            var type = this.$route.params.type;
            if(type == 1){
                this.isRouleChange = true;
            }else{
                this.isRouleChange = false;
            }
            this.changeItem(type);

            this.erweiMa = `static/image/erweima${CF.user.subscription}.jpg`
        },

        watch:{
            '$route' (to, from) {
                var type = this.$route.params.type
                if(type == 1){
                    this.isRouleChange = true;
                }else{
                    this.isRouleChange = false;
                }
                this.changeItem(type);
            }
        },
        methods:{
            returnBack:function(){
                this.$router.go(-1);
            },

            changeItem(type){
                let commonRule = rule.getBallCommonRule();
                let commonDollRule = rule.getDollCommonRule();
                let rule1758 = rule.get1758Rule();
                let rule248 = rule.get248Rule();
                let rule9G = rule.get9GRule();
                if(CF.user.platform==1003){
                    if(type == 1){
                        commonRule.splice(commonRule.length-1,1);
                        this.items = commonRule.concat(rule1758);
                    }else{
                        commonDollRule.splice(commonDollRule.length-1,1);
                        this.ballItems = commonDollRule.concat(rule1758);
                    }
                }else if(CF.user.platform == 1007){
                    if(type == 1){
                        commonRule.splice(commonRule.length-1,1);
                        this.items = commonRule.concat(rule248);
                    }else{
                        commonDollRule.splice(commonDollRule.length-1,1);
                        this.ballItems = commonDollRule.concat(rule248);
                    }
                }else if(CF.user.platform == 1013){
                    if(type == 1){
                        commonRule.splice(commonRule.length-1,1);
                        this.items = commonRule.concat(rule9G);
                    }else{
                        commonDollRule.splice(commonDollRule.length-1,1);
                        this.ballItems = commonDollRule.concat(rule9G);
                    }
                }else{
                    this.items = commonRule;
                    this.ballItems = commonDollRule;
                }
            },
        },
        components:{
            goBack
        }
    }


</script>


<style scoped>

    #return{
        /*height: .88rem;*/
        /*background:#ffffff;*/
    }
    #return img{
        position: absolute;
        top:.19rem;
        left:.20rem;
        width: 0.62rem;
        height: 0.5rem;
    }
    #content{
        position: absolute;
        top: 1.00rem;
        left: .20rem;
        background: #ffffff;
        width: 7.10rem;
        height: 85%;
        font-size: .54rem;
        overflow-y:scroll;
    }
    .tip{
        font-size: .32rem;
        font-weight: bold;
        color: #000000;
        margin-top:.40rem;
        margin-left:.40rem;
    }
    .text{
        font-size: .26rem;
        color: #979797;
        line-height: .36rem;
        width: 6.30rem;
        margin-left:.40rem;
        margin-top: .30rem;
    }
    .line{
        width: 6.30rem;
        height:0.01rem;
        margin-top:.40rem;
        background: #f0f0f0;
    }
    .BallImg{
        text-align: center;
    }

</style>
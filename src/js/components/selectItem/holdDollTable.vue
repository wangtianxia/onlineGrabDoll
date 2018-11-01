<template>
    <section class="selectItem">
        <swiper :options="swiperOption" ref="tableSelect">
            <swiper-slide class="slideItem" v-for="(item,index) in slideItem" :key="index">
                <section class=" slideItemSec" @click='itemClick(item,index)'>
                    <section class="slideItemTable" ref="itemTable">
                        {{item.label_name}}
                    </section>
                    <section :class="[line]" ref="line"></section>
                </section>
            </swiper-slide>
            <!--占空格的-->
            <swiper-slide class="slideItem" >
                <section class="slideItemTable">
                </section>
            </swiper-slide>
        </swiper>

    </section>
</template>

<script>

    import CF from '../../../router/ind.js';
    import {swiper, swiperSlide} from 'vue-awesome-swiper';
    import {mapState,mapMutations} from 'vuex';

    export default {
        name: "holdDollTable",

        data(){
            return {
                slideItem:[],
                swiperOption: {
                    slidesPerView: 'auto',
                    freeMode: true,
                    observer: true,
                    observeParents: true
                },
                line:"line"
            }
        },

        props:['changeItem'],

        mounted() {
            let self = this;
            (new CF.Ajax()).sendJSON(CF.gameInfo.host + 'label_list', {
                user_id: CF.user.uid,
                sign: CF.M5B({ user_id: CF.user.uid})
            }, (data)=> {
                if(data['status'] == 1){
                    self.slideItem = data['data']['list'];
                    setTimeout(()=> {
                        self.itemClick({label:0},0)
                    },300);
                }
            });
        },

        computed: {
            swiper() {
                return this.$refs.tableSelect.swiper
            },
            ...mapState([
                'changeTable'
            ])
        },
        components: {
            swiper,
            swiperSlide
        },

        methods: {
            ...mapMutations([
                 'changeSelectTable'
            ]),
            itemClick(item,index){
                this.changeSelectTable({state:false});

                let lines = this.$refs.line;
                for(let j in lines){
                    lines[j].style.display = 'none';
                }
                this.$refs.line[index].style.display = 'block';
                if(item.label == 3){
                    this.$emit('holdBall');
                }else{
                    this.$emit('dollTable',item.label);
                }

                let allLabel = this.$refs.itemTable;
                for(let i in allLabel){
                    if(i == index){
                        allLabel[i].style.color='#ff8f11';
                    }else{
                        allLabel[i].style.color='#323232';
                    }
                }
            },

            changeColor(item,index){
                let lines = this.$refs.line;
                for(let j in lines){
                    lines[j].style.display = 'none';
                }
                this.$refs.line[index].style.display = 'block';
                let allLabel = this.$refs.itemTable;
                for(let i in allLabel){
                    if(i == index){
                        allLabel[i].style.color='#ff8f11';
                    }else{
                        allLabel[i].style.color='#323232';
                    }
                }
            }


        },
        watch:{
            changeItem(){

            },
            changeTable(){
                if(this.changeTable){
                    this.itemClick({label:0},0)
                }
            }
        }
    }
</script>

<style scoped>
    .selectItem {
        /*background-color: white;*/
        height: 0.8rem;
        display: flex;
        color: #979797;
        position: relative;
        font-size: 0;
        width: 100%;
        margin-bottom: .2rem;
    }

    .swiper-container {
        width: 100%;
        font-size: 0.3rem;

    }

    .imgItem {
        width: 0.61rem;
        margin-top: 0.1rem;
    }

    .changeStyle {
        font-weight: bold;
        color: #ec4776;
    }

    .resetStyle {
        font-weight: 100;
        color: #979797;
    }

    .selectDoll1 {
        flex-grow: 1
    }

    .selectDoll2 {
        flex-grow: 1;
    }

    .line {
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 50%;
        height: 0.04rem;
        background: #ff8f11;
        transform: translateX(-50%);
        display: none;
    }

    .slideItem {
        width: auto !important;
    }

    .slideItemTable{
        padding:0 0.25rem;
        position: relative;
    }

    .slideItemSec{
        width: 100%;
        height: .8rem;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #323232;
        position: relative;
    }
    /*.slideItemSec::after{*/
        /*content: ' ';*/
        /*width: 50%;*/
        /*height: 2px;*/
        /*background-color: rgb(255, 143, 17);*/
        /*position: absolute;*/
        /*left: 50%;*/
        /*bottom: 0;*/
        /*transform: translateX(-50%);*/
    /*}*/

    .word {
        font-size: 0.3rem;
    }
</style>
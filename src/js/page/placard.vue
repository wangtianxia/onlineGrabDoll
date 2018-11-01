<template>
    <div id='placard' v-bind:style='{height:activeHeight}'>
        <div id='mask' v-disabletouchmove></div>
        <div id='content'>
            <img id='title' src="static/image/notice/title.png">
            <div id='close' v-show='isShowBtn'>
                <img src="static/image/close1.png" v-on:click='clickplacard' style="width:0.7rem;height:0.7rem">
            </div>
            <div id='desc' v-html="placardData.content"></div>
            <div v-show='isShowBtn' id='iknow'>
                <img src="static/image/notice/iknow.png" v-on:click='clickplacard'>
            </div>
            <!-- <div id='close' v-show='isShowBtn'>
                <img src="static/image/close1.png" v-on:click='clickplacard' style="width:0.7rem;height:0.7rem">
            </div> -->
        </div>
    </div>
</template>

<script>
    import CF from '../../router/ind.js';

    export default {
        data: function () {
            return {
                isShowBtn: false,
                activeHeight: window.innerHeight + 'px'
            }
        },

        props: ['placardData'],

        created: function () {
            // console.log(this.placardData.content)
            // this.placardData.content='1<br/>2'
            if (this.placardData.type == 1) {
                this.isShowBtn = true;
            }
        },

        watch: {
            '$route'(to, from) {

            }
        },
        methods: {
            clickplacard: function () {
                this.$emit('close')
            }
        }
    }


</script>


<style scoped>


    #placard {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0rem;
        width: 100%;
        /*height: 100%;*/
        z-index: 998;
        background: rgba(0, 0, 0, 0.5);
    }

    #content {
        /*position: absolute;*/
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        align-content: start;
        width: 5.5rem;
        height: auto;
        background: #ffffff;
        border-radius: 0.2rem;
        z-index: 2;
    }

    #mask {
        position: absolute;
        top: 0rem;
        width: 100%;
        height: 100%;
        opacity: 0.01;
    }

    #desc {
        font-size: 0.3rem;
        width: 4.78rem;
        line-height: 0.46rem;
        display: flex;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        max-height: 5rem;
        /* min-height: 1rem; */
        overflow: auto;
    }

    #title {
        width: 5.5rem;
        height: 1.7rem;
    }

    #iknow {
        display: flex;
        margin-bottom: 0.5rem;
        width: 2.2rem;
        height: 0.7rem;
    }

    #iknow img {
        width: 100%;
        height: 100%;
    }

    #close {
        display: flex;
        margin-top: -2.6rem;
        margin-left: 5rem;
        /* top: 0rem; */
        /* margin-right: 0rem; */
        /* position: absolute; */
        top: -1rem;
        right: 0rem;
        flex-basis: 5rem;
    }
</style>
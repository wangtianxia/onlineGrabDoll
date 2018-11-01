<template>
    <div id="tip">
        <div id='mask'></div>
        <div id='window'>
            <div id='title'>{{title}}</div>
            <div id='tip1' v-html="tip"></div>
            <div class='btn' v-show='type'>
                <div id='leave' v-on:click='leave'>取消</div>
                <div id='line1'></div>
                <div class='goon' v-on:click='goon'>确定</div>
            </div>
            <div class='btn' v-show='!type'>
                <div class='goon' style="width:6rem" v-on:click='goon'>确定</div>
            </div>
        </div>
        <!-- <div id='back'>
            <div id='tip'>恭喜你，抓到了</div>
        </div>
        <div id='leave'>稍后再试</div>
        <div id='goon'>再来一局</div> -->
    </div>
</template>

<script>
    import CF from '../../router/ind.js'

    export default {
        data() {
            return {}
        },
        props: ['title', 'tip', 'type'],
        created: function () {
        },
        methods: {
            leave: function () { //离开下机
                var tip = this.tip;
                this.$emit('close', tip)
            },
            goon: function () {
                var tip = this.tip;
                this.$emit('ok', tip)
            }
        }
    }
</script>

<style scoped>
    #tip {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 999;
        top: 0;
        left: 0;
    }

    #mask {
        position: fixed;
        height: 100%;
        width: 100%;
        background: black;
        opacity: 0.7;
        left: 0;
        top: 0;
    }

    #window {
        position: absolute;
        width: 6.06rem;
        height: 3.28rem;
        background: #ffffff;
        left: 50%;
        top: 3rem;
        /*margin-left: -3.02rem;*/
        /*margin-top: -2.00rem;*/
        border-radius: .25rem;
        text-align: center;
        transform: translateX(-50%);
        display: inline-block;
    }

    #title {
        font-weight: bold;
        font-size: .42rem;
        margin-top: .55rem;
    }

    #tip1 {
        font-size: .30rem;
        margin-top: .31rem;
    }

    #line1 {
        display: flex;
        width: 0.02rem;
        height: .32rem;
        background-color: #f0f0f0;
        /* line-height: 0.92rem; */
        margin-top: .30rem;
    }

    #leave {
        display: flex;
        width: 3rem;
        justify-content: center;
        text-align: center;
        font-size: .30rem;
        color: #cccccc;
        line-height: .92rem;
    }

    .goon {
        display: flex;
        width: 3rem;
        text-align: center;
        font-size: .30rem;
        font-weight: bold;
        justify-content: center;
        color: #50bfff;
        line-height: .92rem;
    }

    .btn {
        position: absolute;
        display: flex;
        justify-content: center;
        top: 2.3rem;
    }

</style>
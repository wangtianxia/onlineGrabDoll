<template>
    <!--微信默认渠道-->
    <section class="follow-and-inivite" v-disabletouchmove @click="hideCommon">
        <section class="btn">
            <img v-show="showFocus" src="static/image/auxiliary/focus.png" @click="focus" alt="">
            <img v-show="share" :src="inviteImg"  @click="invited" alt="">
        </section>
    </section>
</template>

<script>
    import CF from '../../../CF';
    import {behavior_statistics} from "../../../server/getServerData";

    export default {
        name: "follow-and-inivite",
        data(){
            return {
                showFocus:false,
                share:false,
                inviteImg:'static/image/auxiliary/invited.png'
            }
        },
        mounted(){
            this.showFocus = CF.user.sign_in;
            this.share =  CF.user.share;
        },
        methods:{
            focus(){
                CF.channel.focus();
            },
            invited(e){
                e.stopPropagation();
                behavior_statistics('behavior_statistics','share_button',()=>{})
                this.$emit('invite');
            },

            hideCommon(e){
                e.stopPropagation();
                this.$emit('closeComment');
            }
        }
    }
</script>

<style scoped>
    .follow-and-inivite{
        position: fixed;
        z-index: 1000;
        top: 0;
        left: 0;
        background-color: rgba(0,0,0,0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .btn>img{
        width: 2.4rem;
    }
</style>
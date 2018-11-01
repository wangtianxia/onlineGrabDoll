<template>
    <div id="payPage">
        <iframe :src="payUrl" id='frame' scrolling="no" frameborder="0" style="height:1334px"></iframe>
        <component v-bind:is="showPaySucc" :title='title' :tip='tip' :type='type' v-on:close='tipClose'
                   v-on:ok='tipOk'></component>
    </div>
</template>

<script>
    import CF from '../../router/ind.js'
    import tip from './tip1.vue'

    export default {
        data() {
            return {
                payUrl: '',
                tt: 3,
                showPaySucc: 'tip',
                type: false,
                tip: '请等待，正在调起支付',
                title: '支付通知',
            }
        },


        props: ['isSuccess', 'doll_id'],

        mounted() {
            let self = this;
            let u = window.navigator.userAgent;
            let app = window.navigator.appVersion;
            if (u.indexOf('Safari') > -1 || u.indexOf('AppleWebKit') > -1) {
                window.location.href = this.$route.params.url;
                return;
            } else {
                this.payUrl = this.$route.params.url;
            }

            CF.pubsub.$on('clearPayIframe', function () {
                self.payUrl = '';
            });
        },

        watch: {
            '$route'(to, from) {
                if (to.name == 'payIframePage') {

                    if (this.$route.params.url)
                        this.payUrl = this.$route.params.url;
                }
                if (from.name == 'payIframePage') {
                }
            }
        },
        methods: {
            tipOk: function () {
                // alert('1')
                this.$router.replace({name: 'listPage', params: {}})
            },
            tipClose: function () {
                // alert('2')
                this.$router.replace({name: 'listPage', params: {}})
            }
        },
        components: {
            tip: tip

        }
    }

</script>

<style scoped>
    #payPage {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
</style>
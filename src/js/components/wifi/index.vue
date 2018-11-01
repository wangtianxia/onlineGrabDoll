<template>
    <!--wifi钥匙-->
    <section class="wifiContent">
    </section>
</template>

<script>
    import CF from '../../../CF';
    import { wifi_key_get_code } from "../../../server/getServerData";

    export default {
        data() {
            return {
            }
        },
        mounted(){
            var self = this;
            window.wifiCallBack = (code)=>{
                self.keyLogin(code);
            };
            wifi_key_get_code('wifi_key_get_code',(data)=>{
                if(data && data.status==1) {
                    let params = {
                        thirdAppId:data['data']['appId'],
                        scope:data['data']['scope'],
                        appName:data['data']['appName'],
                        appIcon:data['data']['appIcon'],
                        onResult:'wifiCallBack'
                    };
                    try {
                        WiFikey.login(JSON.stringify(params));
                    }catch (err){
                        alert("err"+JSON.stringify(err))
                    }
                }
            });
        },

        methods:{
            keyLogin(code){
                (new CF.Ajax()).sendJSON(CF.gameInfo.host+'wifi_key_code',{
                    code:code,
                    sign:CF.M5B({code:code})
                },(data)=>{
                    window.location.href = data['data']['url'];
                })
            },
        }
    }
</script>

<style scoped>
    .wifiContent{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        font-size: 0.3rem;
        padding-top: 2rem;
        background-color: white;
    }
</style>
<template>
    <section class="withdrawList">
        <goBack @returnToIndex="returnToIndex"/>
        <p class="withdrawListTitle">提现明细</p>
        <section class="list">
            <section class="listItem" v-for="(item,index) in list" :key="index">
                <section class="listTime">{{item['create_time']|formatTime}}</section>
                <section class="listStatus">{{item['status']|status}}</section>
                <section class="listMoney">{{item['money']}}元</section>
            </section>
        </section>
        <section v-if="list.length==0" class="listNot">
            暂无提现明细
        </section>
    </section>
</template>

<script>
    import goBack from '../components/return/index'
    import {withdraw_record} from "../../server/getServerData";

    export default {
        name: "withdrawList",

        data() {
            return {
                list: []
            }
        },

        filters: {
            status(status) {
                if (status == 0) {
                    return '等待审核'
                }
                if (status == 1) {
                    return '提现完成'
                }
            },

            formatTime(time) {
                let tempTime1 = time * 1000;
                let tempTime = new Date(tempTime1);
                let year = tempTime.getFullYear();
                let month = tempTime.getMonth() + 1 >= 10 ? tempTime.getMonth() + 1 : "0"  + parseInt(tempTime.getMonth() + 1);
                let date = tempTime.getDate() >= 10 ? tempTime.getDate() : "0" + tempTime.getDate();
                let hour = tempTime.getHours() >= 10 ? tempTime.getHours() : "0" + tempTime.getHours();
                let mine = tempTime.getMinutes() >= 10 ? tempTime.getMinutes() : "0" + tempTime.getMinutes();
                let second = tempTime.getSeconds() >= 10 ? tempTime.getSeconds() : "0" + tempTime.getSeconds();
                return `${year}-${month}-${date} ${hour}:${mine}:${second}`
            }
        },

        mounted() {
            this.withdrawList()
        },

        methods: {
            returnToIndex() {
                this.$router.go(-1);
            },
            withdrawList() {
                withdraw_record('withdraw_record', (res) => {
                    if (res['status'] == 1) {
                        this.list = res['data']['list']
                    }
                })
            }
        },

        components: {
            goBack
        }
    }
</script>

<style lang="less" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .box-shadow {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .withdrawList {
        background-color: #f7f7f7;
        min-height: 100%;
        max-height: unset;
        .withdrawListTitle {
            padding: .47rem 0 0.4rem 0;
            text-align: center;
            font-size: 0.36rem;
            font-weight: normal;
            font-stretch: normal;
            line-height: 1;
            letter-spacing: 0rem;
            color: #323232;
        }
        .list {
            background-color: #f7f7f7;
            padding: 0 0.2rem;
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            flex-wrap: wrap;
            .listItem {
                width: 7.1rem;
                height: 0.9rem;
                background-color: #ffffff;
                border-radius: 0.1rem;
                margin-bottom: 0.1rem;
                padding: 0 0.19rem;
                .box-shadow;

                .listTime {
                    font-size: 0.3rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.48rem;
                    letter-spacing: 0.02rem;
                    color: #323232;
                }
                .listStatus {
                    font-size: 0.3rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.48rem;
                    letter-spacing: 0.02rem;
                    color: #323232;
                }
                .listMoney {
                    font-size: 0.3rem;
                    font-weight: normal;
                    font-stretch: normal;
                    line-height: 0.48rem;
                    letter-spacing: 0.02rem;
                    color: #f30000;
                }
            }
        }

        .listNot{
            text-align: center;
            margin: 0.5rem 0;
            color: #323232;
            font-size: 0.28rem;
        }
    }
</style>
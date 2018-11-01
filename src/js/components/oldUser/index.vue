<template>
    <div class="oldUser" v-disabletouchmove>
        <div class="oldUserContent">
            <div>
                此QQ号已绑定其他账号，请更换QQ号
            </div>
            <div class="oldUserBtn">
                <span @click="closeBtn">知道了</span>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        methods: {
            closeBtn() {
                this.$emit('closeOldUser');
            }
        }
    }
</script>
<style scoped>
    .oldUser {
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1000;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.3rem;
        color: black;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .oldUserContent {
        background-color: white;
        padding: 0.5rem 0.3rem;
        border-radius: 0.2rem;
        text-align: center;
    }

    .oldUserBtn {
        display: inline-block;
        background-color: rgb(0, 233, 205);
        padding: 0.2rem 0.4rem;
        border-radius: 0.2rem;
        margin-top: 0.5rem;
    }

</style>
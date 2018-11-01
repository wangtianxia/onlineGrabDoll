<template>
    <div class="qqLogin">
    </div>
</template>

<script>
import CF from './../../CF.js'
export default {
    created(){
        CF.Vue.prototype.$login({
            isClose:false
        });
    }
   
}
</script>

<style scoped>
    .qqLogin{
        width: 100%;
        height: 100%;
    }
</style>

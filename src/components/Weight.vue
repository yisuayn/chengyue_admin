<template>
    <div class="content">
        <slot></slot>
    </div>
</template>
<script>
export default{
    name:"Weight",
    data(){
        return{
        }
    }
}
</script>
<style lang="scss">
.content{
    background: #fff;
    max-width: 100%;
    max-height: 100%;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
}
</style>
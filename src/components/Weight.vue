<template>
    <div class="content">
        <slot></slot>
    </div>
</template>
<script>
export default{
    name:"Weight",
}
</script>
<style lang="scss">
.content{
    background: #fff;
    max-width: 100%;
    padding: 20px;
    border-radius: 10px;
}
</style>
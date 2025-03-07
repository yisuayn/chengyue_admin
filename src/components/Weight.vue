<template>
  <div class="content">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "Weight",
  data() {
    return {};
  },
};
</script>
<style lang="scss">
.content {
  background: #fff;
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1),
  0 8px 16px rgba(0, 0, 0, 0.1);;
}
</style>

<template>
  <div class="svg-item">
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0">
      <rect-item v-if="item.type === 'rect'" :item="item"/>
      <arrow-pair
        :p1="item.p1"
        :p2="item.p2"
        :item="item"
      />
    </svg>
  </div>
</template>

<script>
import RectItem from '@/components/rect.vue'
import ArrowPair from '@/components/arrow-pair.vue'
export default {
  name: 'svgItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    RectItem,
    ArrowPair
  }
}
</script>

<style lang="less" scoped>
.svg-item {
  width: 300px;
  height: 300px;
  border-top: 1px solid;
  border-left: 1px solid;
  border-color: rgba(0, 0, 0, 0.3);
  margin-right: 150px;
  margin-bottom: 100px;
  svg {
    overflow: visible;
  }
}
</style>

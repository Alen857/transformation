<template>
  <g>
    <path
      :d="drawRect(item)"
      stroke="#ff4500"
      fill="#ff4500"
      :stroke-width="1"
      stroke-linecap="round"/>
  </g>
</template>

<script>
export default {
  name: 'Rect-item',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  // 坐标点的格式
  // pointerObj: {
  //  b1: [a, b]
  //  b2: [c, d]
  //  b3: [e, f]
  //  b4: [g, h]
  // }
  // b1 ____________b2
  //    |          |
  //    |          |
  //    |          |
  // b4 |__________| b3
  methods: {
    drawRect (pointObj) {
      return `
        M${pointObj.b1[0]},${pointObj.b1[1]}  L${pointObj.b2[0]},${pointObj.b2[1]}
        M${pointObj.b1[0]},${pointObj.b1[1]}  L${pointObj.b4[0]},${pointObj.b4[1]}
        M${pointObj.b3[0]},${pointObj.b3[1]}  L${pointObj.b2[0]},${pointObj.b2[1]}
        M${pointObj.b3[0]},${pointObj.b3[1]}  L${pointObj.b4[0]},${pointObj.b4[1]}
        `
    }
  }
}
</script>

<style scoped>

</style>

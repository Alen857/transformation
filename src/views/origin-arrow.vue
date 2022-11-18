<template>
  <div class="origin-arrow">
    <div class="content">
      <svg-item :item="rectItem" />
<!--      <svg-item :item="translateItem" />-->
<!--      <svg-item :item="rotateItem" />-->
      <svg-item :item="allRotateItem" />
<!--      <svg-item :item="scaleItem" />-->
<!--      <svg-item :item="originItem" />-->
<!--      <svg-item :item="originRotateItem" />-->
<!--      <svg-item :item="translateCenterItem" />-->
    </div>
  </div>
</template>

<script>
import svgItem from '@/components/svgItem.vue'
// import { translateToOrigin, translateFn, rotate, scale, m} from '@/utils/transform.js'
import { translateFn, m, rotateFn, scaleFn, translateToOriginFn } from '@/utils/transform.js'
export default {
  name: 'origin-arrow',
  components: {
    svgItem
  },
  data () {
    return {
      rectItem: {
        type: 'rect',
        b1: [0, 0],
        b2: [200, 0],
        b3: [200, 200],
        b4: [0, 200]
      },
      // rectItem: {
      //   type: 'rect',
      //   b1: [20, 20],
      //   b2: [220, 20],
      //   b3: [220, 220],
      //   b4: [20, 220]
      // },
      translateItem: {
        type: 'rect',
        b1: [],
        b2: [],
        b3: [],
        b4: []
      },
      rotateItem: {
        type: 'rect',
        b1: [],
        b2: [],
        b3: [],
        b4: []
      },
      scaleItem: {
        type: 'rect',
        b1: [],
        b2: [],
        b3: [],
        b4: []
      },
      allRotateItem: {
        type: 'rect',
        b1: [],
        b2: [],
        b3: [],
        b4: []
      },
      originItem: {
        type: 'rect',
        b1: [],
        b2: [],
        b3: [],
        b4: []
      },
      originRotateItem: {
        type: 'rect',
        b1: [],
        b2: [],
        b3: [],
        b4: []
      },
      translateCenterItem: {
        type: 'rect',
        b1: [],
        b2: [],
        b3: [],
        b4: []
      },
      center: []
    }
  },
  created () {
    this.outToOrigin()
    this.translatePointer()
    this.rotatePointer()
    this.scalePointer()
    this.finalRotatePointer()
    this.translateToOrigin()
    this.originRotate()
    this.translateToCenter()
  },
  methods: {
    outToOrigin () {
      const num = 50
      this.rectItem.b1[0] += num
      this.rectItem.b2[0] += num
      this.rectItem.b3[0] += num
      this.rectItem.b4[0] += num
      this.rectItem.b1[1] += num
      this.rectItem.b2[1] += num
      this.rectItem.b3[1] += num
      this.rectItem.b4[1] += num
      this.center = [(this.rectItem.b2[0] + this.rectItem.b4[0]) / 2, (this.rectItem.b2[1] + this.rectItem.b4[1]) / 2]
    },
    translatePointer () {
      const b1 = this.rectItem.b1
      const b2 = this.rectItem.b2
      const b3 = this.rectItem.b3
      const b4 = this.rectItem.b4

      this.translateItem.b1 = this.translate(b1, this.center)
      this.translateItem.b2 = this.translate(b2, this.center)
      this.translateItem.b3 = this.translate(b3, this.center)
      this.translateItem.b4 = this.translate(b4, this.center)
    },
    translateToOrigin () {
      const b1 = this.rectItem.b1
      const b2 = this.rectItem.b2
      const b3 = this.rectItem.b3
      const b4 = this.rectItem.b4

      this.originItem.b1 = this.translateToOri(b1, this.center)
      this.originItem.b2 = this.translateToOri(b2, this.center)
      this.originItem.b3 = this.translateToOri(b3, this.center)
      this.originItem.b4 = this.translateToOri(b4, this.center)
    },
    originRotate () {
      const b1 = this.originItem.b1
      const b2 = this.originItem.b2
      const b3 = this.originItem.b3
      const b4 = this.originItem.b4

      this.originRotateItem.b1 = this.rotate(b1)
      this.originRotateItem.b2 = this.rotate(b2)
      this.originRotateItem.b3 = this.rotate(b3)
      this.originRotateItem.b4 = this.rotate(b4)
    },
    translateToCenter () {
      const b1 = this.originRotateItem.b1
      const b2 = this.originRotateItem.b2
      const b3 = this.originRotateItem.b3
      const b4 = this.originRotateItem.b4

      this.translateCenterItem.b1 = this.translate(b1, this.center)
      this.translateCenterItem.b2 = this.translate(b2, this.center)
      this.translateCenterItem.b3 = this.translate(b3, this.center)
      this.translateCenterItem.b4 = this.translate(b4, this.center)
      console.log(this.translateCenterItem)
    },
    scalePointer () {
      const b1 = this.rectItem.b1
      const b2 = this.rectItem.b2
      const b3 = this.rectItem.b3
      const b4 = this.rectItem.b4

      this.scaleItem.b1 = this.scale(b1)
      this.scaleItem.b2 = this.scale(b2)
      this.scaleItem.b3 = this.scale(b3)
      this.scaleItem.b4 = this.scale(b4)
    },
    rotatePointer () {
      const b1 = this.rectItem.b1
      const b2 = this.rectItem.b2
      const b3 = this.rectItem.b3
      const b4 = this.rectItem.b4

      this.rotateItem.b1 = this.rotate(b1)
      this.rotateItem.b2 = this.rotate(b2)
      this.rotateItem.b3 = this.rotate(b3)
      this.rotateItem.b4 = this.rotate(b4)
    },
    finalRotatePointer () {
      const b1 = this.rectItem.b1
      const b2 = this.rectItem.b2
      const b3 = this.rectItem.b3
      const b4 = this.rectItem.b4

      this.allRotateItem.b1 = this.finalRotate(b1, this.center)
      this.allRotateItem.b2 = this.finalRotate(b2, this.center)
      this.allRotateItem.b3 = this.finalRotate(b3, this.center)
      this.allRotateItem.b4 = this.finalRotate(b4, this.center)
    },
    translate (pointer, center) {
      const p = m(pointer)
      let m1 = []
      if (center) {
        m1 = translateFn(center)
      } else {
        m1 = translateFn([50, 50])
      }

      const result = m1.multiply(p).elements
      return [result[0], result[1]]
    },
    translateToOri (pointer, center) {
      const p = m(pointer)
      const m1 = translateToOriginFn(center)

      const result = m1.multiply(p).elements
      return [result[0], result[1]]
    },
    rotate (pointer) {
      const p = m(pointer)
      const originDegree = 45
      const degree = (originDegree / 180) * Math.PI
      const m2 = rotateFn(degree)

      const result = m2.multiply(p).elements
      return [result[0], result[1]]
    },
    scale (pointer) {
      const scaleNum = 1.5
      const p = m(pointer)
      const m3 = scaleFn(scaleNum)

      const result = m3.multiply(p).elements
      return [result[0], result[1]]
    },
    finalRotate (pointer, center) {
      const originDegree = 45
      const degree = (originDegree / 180) * Math.PI
      const p = m(pointer)
      const m1 = translateToOriginFn(center)
      const m2 = rotateFn(degree)
      const m3 = translateFn(center)

      const result = m3.multiply(m2).multiply(m1).multiply(p).elements
      return [result[0], result[1]]
    }
  }
}
</script>

<style lang="less" scoped>
.origin-arrow {
  width: 100%;
  height: 100%;
  background: #eee;
  .content {
    width: 100%;
    height: 100%;
    //padding: 100px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
}
</style>

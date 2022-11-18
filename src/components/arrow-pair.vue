<template>
  <g>
    <path
      :d="bleedsForSvg(item)"
      stroke="#ff4500"
      fill="#ff4500"
      :stroke-width="arrowWidth"
      stroke-linecap="round"
    ></path>
  </g>
</template>

<script>
/*
         / / a1                                    a5 \ \
p1(a0) / /  a2 ______   ______   ______   ______ a6   \ \ p2(a10)
      \ \  a3 /_____/  /_____/  /_____/  /_____/ a7   / /
       \_\ a4                                    a8  /_/
1. 假定座标水平放置， 以为a0, a10中点为原点根据a0-a10的距离计算出左侧的位置
2. 右侧的位置镜像出来
3. 旋转到最终的位置

         / / a1                                     a3 \ \
p1(a0) / /   ______   ______         ______   ______    \ \ p2(a5)
      \ \   /_____/  /_____/ center /_____/  /_____/    / /
       \_\ a2                                      a4 /_/
1. 假定座标水平放置， 以为a0, a5中点为原点根据a1-a4的距离计算出左侧的位置
2. 右侧的位置镜像出来
3. 旋转到最终的位置
          key: 0,
          value: "代码",
          key: 1,
          value: "参数",
          key: 2,
          value: "代码+参数",
          key: 3,
          value: "无标注",
*/
/*
    * props: {
      lineType: length（长度）/radius（半径）/angle（角度）
    },

    外长度：
    {
      lineType: outerArrow,
      p1: {x: y:},
      p2: {x:,y:},
    }

    内长度/角度:{
      lineType: innerArrow,
      p1: {x: y:, rotate: },
      p2: {x:,y:, rotate: },
    }

    半径：{
      lineType: arcArrow,
      center: {x, y}
      radius: 10,
      rotate: 30
    }
*  */

import { Matrix, Vector } from 'sylvester-es6'

export default {
  props: {
    p1: {
      type: [Object, String],
      default: null
    },
    p2: {
      type: [Object, String],
      default: null
    },
    item: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      arrowDegree: (45 / 180) * Math.PI,
      b0: null,
      b1: null,
      b2: null,
      b3: null,
      b4: null,
      b5: null,
      rectOpacity: 0,
      arrowLength: 1.3,
      arrowWidth: 0.2
    }
  },
  computed: {},
  methods: {
    bleedsForSvg (item) {
      if (item.lineType === 'outerArrow') {
        return this.bleedsForOutLine(item)
      } else if (item.lineType === 'innerArrow') {
        if (item.p1.rotate || item.p2.rotate) {
          return this.bleedsForDegreeLine(item)
        } else {
          return this.bleedsForInnerLine(item)
        }
      } else if (item.lineType === 'arcArrow') {
        return this.bleedsForArcLine(item)
      }
    },
    bleedsForOutLine (item) {
      const pointArr = this.doOutPath(item)
      return `
            M${pointArr.b0[0]},${pointArr.b0[1]} L${pointArr.b1[0]},${pointArr.b1[1]} \
            M${pointArr.b0[0]},${pointArr.b0[1]} L${pointArr.b2[0]},${pointArr.b2[1]} \
            M${pointArr.b0[0]},${pointArr.b0[1]} L${pointArr.b5[0]},${pointArr.b5[1]} \
             M${pointArr.b5[0]},${pointArr.b5[1]} L${pointArr.b3[0]},${pointArr.b3[1]} \
            M${pointArr.b5[0]},${pointArr.b5[1]} L${pointArr.b4[0]},${pointArr.b4[1]} \
           `
    },
    bleedsForDegreeLine (item) {
      const pointArr = this.doDegreePath(item)
      return `
            M${pointArr.b1[0]},${pointArr.b1[1]} L${pointArr.b0[0]},${pointArr.b0[1]} \
            M${pointArr.b2[0]},${pointArr.b2[1]} L${pointArr.b0[0]},${pointArr.b0[1]} \
            M${pointArr.b3[0]},${pointArr.b3[1]} L${pointArr.b0[0]},${pointArr.b0[1]} \
            M${pointArr.b4[0]},${pointArr.b4[1]} L${pointArr.b5[0]},${pointArr.b5[1]} \
            M${pointArr.b7[0]},${pointArr.b7[1]} L${pointArr.b6[0]},${pointArr.b6[1]} \
            M${pointArr.b8[0]},${pointArr.b8[1]} L${pointArr.b6[0]},${pointArr.b6[1]} \
            M${pointArr.b9[0]},${pointArr.b9[1]} L${pointArr.b6[0]},${pointArr.b6[1]} \
            M${pointArr.b10[0]},${pointArr.b10[1]} L${pointArr.b11[0]},${pointArr.b11[1]} \
           `
    },
    bleedsForInnerLine (item) {
      const pointArr = this.doInnerPath(item)
      return `
            M${pointArr.b1[0]},${pointArr.b1[1]} L${pointArr.b0[0]},${pointArr.b0[1]} \
            M${pointArr.b2[0]},${pointArr.b2[1]} L${pointArr.b0[0]},${pointArr.b0[1]} \
            M${pointArr.b6[0]},${pointArr.b6[1]} L${pointArr.b0[0]},${pointArr.b0[1]} \
            M${pointArr.b8[0]},${pointArr.b8[1]} L${pointArr.b9[0]},${pointArr.b9[1]} \
            M${pointArr.b3[0]},${pointArr.b3[1]} L${pointArr.b5[0]},${pointArr.b5[1]} \
            M${pointArr.b4[0]},${pointArr.b4[1]} L${pointArr.b5[0]},${pointArr.b5[1]} \
            M${pointArr.b7[0]},${pointArr.b7[1]} L${pointArr.b5[0]},${pointArr.b5[1]} \
            M${pointArr.b10[0]},${pointArr.b10[1]} L${pointArr.b11[0]},${pointArr.b11[1]} \
           `
    },
    bleedsForArcLine (item) {
      const pointArr = this.doArcPath(item)
      return `
            M${pointArr.b0[0]},${pointArr.b0[1]} L${pointArr.b1[0]},${pointArr.b1[1]} \
            M${pointArr.b0[0]},${pointArr.b0[1]} L${pointArr.b2[0]},${pointArr.b2[1]} \
            M${pointArr.b0[0]},${pointArr.b0[1]} L${pointArr.b3[0]},${pointArr.b3[1]} \
            M${pointArr.b0[0]},${pointArr.b0[1]} L${pointArr.b4[0]},${pointArr.b4[1]} \
            M${pointArr.b4[0]},${pointArr.b4[1]} L${pointArr.b5[0]},${pointArr.b5[1]} \
           `
    },
    doOutPath (item) {
      const length = this.sqrt(item.p1, item.p2)
      const a0 = [-length / 2, 0]
      const arrowLength = this.arrowLength
      const center = [(item.p1.x + item.p2.x) / 2, (item.p1.y + item.p2.y) / 2]
      let degree = (90 / 180) * Math.PI
      if (item.p1.x !== item.p2.x) {
        degree = Math.atan((item.p1.y - item.p2.y) / (item.p1.x - item.p2.x))
      }
      let a1 = []
      a1 = [
        Math.cos(this.arrowDegree) * arrowLength + a0[0],
        Math.sin(this.arrowDegree) * arrowLength
      ]
      const a2 = [a1[0], -a1[1]]
      const a3 = [-a1[0], a1[1]]
      const a4 = [-a1[0], -a1[1]]
      const a5 = [-a0[0], 0]
      const b0 = this.rotate(this.translate(a0, center), center, degree)
      const b1 = this.rotate(this.translate(a1, center), center, degree)
      const b2 = this.rotate(this.translate(a2, center), center, degree)
      const b3 = this.rotate(this.translate(a3, center), center, degree)
      const b4 = this.rotate(this.translate(a4, center), center, degree)
      const b5 = this.rotate(this.translate(a5, center), center, degree)
      // 5是上 右
      return {
        b0,
        b1,
        b2,
        b3,
        b4,
        b5
      }
    },
    doDegreePath (item) {
      const p1 = [item.p1.x, item.p1.y]
      const p2 = [item.p2.x, item.p2.y]
      const p1Rotate = (item.p1.rotate / 180) * Math.PI
      const p2Rotate = (item.p2.rotate / 180) * Math.PI
      const arrowLength = this.arrowLength
      const a0 = [0, 0]
      const a1 = [
        Math.cos(this.arrowDegree) * arrowLength,
        Math.sin(this.arrowDegree) * arrowLength
      ]
      const a2 = [a1[0], -a1[1]]
      const a3 = [3 * arrowLength, 0]
      const a4 = [0, a1[1] + 0.6 / this.scale]
      const a5 = [a4[0], -a4[1]]
      const b0 = this.translate(this.rotate(a0, a0, p1Rotate), p1)
      const b1 = this.translate(this.rotate(a1, a0, p1Rotate), p1)
      const b2 = this.translate(this.rotate(a2, a0, p1Rotate), p1)
      const b3 = this.translate(this.rotate(a3, a0, p1Rotate), p1)
      const b4 = this.translate(this.rotate(a4, a0, p1Rotate), p1)
      const b5 = this.translate(this.rotate(a5, a0, p1Rotate), p1)
      const b6 = this.translate(this.rotate(a0, a0, p2Rotate), p2)
      const b7 = this.translate(this.rotate(a1, a0, p2Rotate), p2)
      const b8 = this.translate(this.rotate(a2, a0, p2Rotate), p2)
      const b9 = this.translate(this.rotate(a3, a0, p2Rotate), p2)
      const b10 = this.translate(this.rotate(a4, a0, p2Rotate), p2)
      const b11 = this.translate(this.rotate(a5, a0, p2Rotate), p2)
      return {
        b0,
        b1,
        b2,
        b3,
        b4,
        b5,
        b6,
        b7,
        b8,
        b9,
        b10,
        b11
      }
    },
    doInnerPath (item) {
      const length = this.sqrt(item.p1, item.p2)
      const arrowLength = this.arrowLength
      const center = [(item.p1.x + item.p2.x) / 2, (item.p1.y + item.p2.y) / 2]
      let degree = (90 / 180) * Math.PI
      if (item.p1.x !== item.p2.x) {
        degree = Math.atan((item.p1.y - item.p2.y) / (item.p1.x - item.p2.x))
      }
      const a0 = [-length / 2, 0]
      const a1 = [
        a0[0] - Math.cos(this.arrowDegree) * arrowLength,
        Math.sin(this.arrowDegree) * arrowLength
      ]

      const a2 = [a1[0], -a1[1]]
      const a3 = [-a1[0], a1[1]]
      const a4 = [-a1[0], -a1[1]]
      const a5 = [-a0[0], 0]
      const a6 = [-length / 2 - 3 * arrowLength, 0]
      const a7 = [length / 2 + 3 * arrowLength, 0]
      const a8 = [a0[0], Math.sin(this.arrowDegree) * arrowLength + 0.6 / this.scale]
      const a9 = [a0[0], -Math.sin(this.arrowDegree) * arrowLength - 0.6 / this.scale]
      const a10 = [-a0[0], Math.sin(this.arrowDegree) * arrowLength + 0.6 / this.scale]
      const a11 = [-a0[0], -Math.sin(this.arrowDegree) * arrowLength - 0.6 / this.scale]
      const b0 = this.rotate(this.translate(a0, center), center, degree)
      const b1 = this.rotate(this.translate(a1, center), center, degree)
      const b2 = this.rotate(this.translate(a2, center), center, degree)
      const b3 = this.rotate(this.translate(a3, center), center, degree)
      const b4 = this.rotate(this.translate(a4, center), center, degree)
      const b5 = this.rotate(this.translate(a5, center), center, degree)
      const b6 = this.rotate(this.translate(a6, center), center, degree)
      const b7 = this.rotate(this.translate(a7, center), center, degree)
      const b8 = this.rotate(this.translate(a8, center), center, degree)
      const b9 = this.rotate(this.translate(a9, center), center, degree)
      const b10 = this.rotate(this.translate(a10, center), center, degree)
      const b11 = this.rotate(this.translate(a11, center), center, degree)

      return {
        b0,
        b1,
        b2,
        b3,
        b4,
        b5,
        b6,
        b7,
        b8,
        b9,
        b10,
        b11
      }
    },
    doArcPath (item) {
      const length = 3 / this.scale
      const arrowLength = this.arrowLength
      const rotatePoint = [item.center.x, item.center.y]
      const rotate = (item.rotate / 180) * Math.PI
      const a0 = [0, 0]
      const a1 = [-length, 0]
      const a2 = [
        0 - Math.cos(this.arrowDegree) * arrowLength,
        Math.sin(this.arrowDegree) * arrowLength
      ]
      const a3 = [a2[0], -a2[1]]
      const a4 = [3 * arrowLength, 0]
      // 平移+旋转
      const b0 = this.translate(this.rotate(a0, a0, rotate), rotatePoint)
      const b1 = this.translate(this.rotate(a1, a0, rotate), rotatePoint)
      const b2 = this.translate(this.rotate(a2, a0, rotate), rotatePoint)
      const b3 = this.translate(this.rotate(a3, a0, rotate), rotatePoint)
      const b4 = this.translate(this.rotate(a4, a0, rotate), rotatePoint)
      let b5 = []
      if (
        (rotate <= Math.PI / 2 && rotate >= 0) ||
        (rotate >= (Math.PI * 3) / 2 && rotate <= 2 * Math.PI)
      ) {
        b5 = [b4[0] + 5 * arrowLength, b4[1]]
      } else if (
        (rotate >= Math.PI / 2 && rotate <= Math.PI) ||
        (rotate <= (Math.PI * 3) / 2 && rotate >= Math.PI)
      ) {
        b5 = [b4[0] - 5 * arrowLength, b4[1]]
      }
      return {
        b0,
        b1,
        b2,
        b3,
        b4,
        b5
      }
    },
    sqrt (p1, p2) {
      return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y))
    },
    rotate (origin, center, degree) {
      const m3 = new Matrix([
        [1, 0, center[0]],
        [0, 1, center[1]],
        [0, 0, 1]
      ])

      const m2 = new Matrix([
        [Math.cos(degree), -Math.sin(degree), 0],
        [Math.sin(degree), Math.cos(degree), 0],
        [0, 0, 1]
      ])

      const m1 = new Matrix([
        [1, 0, -center[0]],
        [0, 1, -center[1]],
        [0, 0, 1]
      ])

      const m = new Vector([[origin[0]], [origin[1]], [1]])

      const result = m3.multiply(m2).multiply(m1).multiply(m).elements
      return [result[0] || 0, result[1] || 0]
    },
    translate (origin, center) {
      return [origin[0] + center[0], origin[1] + center[1]]
    }
  }
}
</script>
<style lang="less" scoped></style>

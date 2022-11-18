import { Matrix, Vector } from 'sylvester-es6'

// 平移回原点的矩阵
export const translateToOriginFn = (pointer) => {
  return new Matrix([
    [1, 0, -pointer[0]],
    [0, 1, -pointer[1]],
    [0, 0, 1]
  ])
}

// 平移到特定点位的矩阵
export const translateFn = (pointer) => {
  return new Matrix([
    [1, 0, pointer[0]],
    [0, 1, pointer[1]],
    [0, 0, 1]
  ])
}

// 旋转矩阵
export const rotateFn = (degree) => {
  return new Matrix([
    [Math.cos(degree), -Math.sin(degree), 0],
    [Math.sin(degree), Math.cos(degree), 0],
    [0, 0, 1]
  ])
}

// 缩放矩阵
export const scaleFn = (scaleNum) => {
  return new Matrix([
    [scaleNum, 0, 0],
    [0, scaleNum, 0],
    [0, 0, 1]
  ])
}

// 自身矩阵
export const m = (pointer) => {
  return new Vector([[pointer[0]], [pointer[1]], [1]])
}

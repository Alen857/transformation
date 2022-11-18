<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app {
  height: 100%;
}
html,
body {
  height: 100%;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  background: #eee;
}
div {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  outline: none;
  :focus {
    outline: none;
  }
}
</style>

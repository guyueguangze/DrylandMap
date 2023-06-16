<template>
  <div :style="{ 'min-height': pageHeight }" id="mymap" class="imap"></div>
  <!-- 注意：div必需指定高度，否则加载不出来 -->
</template>
<script setup>
import { onMounted, ref } from "vue"
import TileLayer from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"
import { ScaleLine, MousePosition } from "ol/control" // openlayers控件
import { Map, View, Overlay } from "ol"
import { fromLonLat, transform } from "ol/proj"

onMounted(() => {
  initMap()
})
// 监听页面高度
const pageHeight = ref(window.innerHeight - 60 + "px")
window.addEventListener("resize", () => {
  pageHeight.value = window.innerHeight - 60 + "px"
})
const initMap = () => {
  const layer1 = new TileLayer({
    title: "底图",
    source: new XYZ({
      url: "http://t4.tianditu.com/DataServer?T=ter_w&x={x}&y={y}&l={z}&tk=d0cf74b31931aab68af181d23fa23d8d",
    }),
  })
  const layer2 = new TileLayer({
    title: "标注",
    source: new XYZ({
      url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      // 谷歌url:  "http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}"
    }),
  })

  // 添加地图控件
  const icontrols = [
    new ScaleLine(),
    new MousePosition({
      //   coordinateFormat: createStringXY(6), // 设置数据格式
      projection: "EPSG:4326", // 设置空间参考系统为'EPSG:4326'
    }),
  ]
  // 创建一个地图
  const map = new Map({
    layers: [layer1, layer2], // 加载的图层
    target: "mymap", // 绑定div
    controls: icontrols, // 设置要显示的控件
    view: new View({
      center: fromLonLat([146.7, -42]), // 中心位置
      zoom: 8, // 缩放登级
      // maxZoom: 18,
      // projection: "EPSG:4326", // 使用坐标系
    }),
  })
}
</script>
<style scoped>
.imap {
  min-width: 800px;
  height: 800px;
}
</style>

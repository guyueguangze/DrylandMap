<template>
  <div class="upload">
    <el-upload v-model:file-list="fileList" class="upload-demo" multiple>
      <el-button type="primary">上传数据</el-button>
      <template #tip> </template>
    </el-upload>
  </div>
  <div :style="{ 'min-height': pageHeight }" id="mymap" class="imap"></div>
  <!-- 注意：div必需指定高度，否则加载不出来 -->
</template>
<script setup>
import { onMounted, ref } from "vue"
// import TileLayer from "ol/layer/Tile"
import XYZ from "ol/source/XYZ"
import {
  ScaleLine,
  MousePosition,
  ZoomToExtent,
  //   ZoomSlider,
  FullScreen,
} from "ol/control" // openlayers控件
import ZoomSlider from "ol/control/ZoomSlider.js"
import { Map, View, Overlay, Feature } from "ol"
import { fromLonLat, transform } from "ol/proj"
import Point from "ol/geom/Point.js"
import { Circle, Fill, Stroke, Style } from "ol/style.js"
import { OSM, Vector, Vector as VectorSource } from "ol/source.js"
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer.js"
import { GPX, GeoJSON, IGC, KML, TopoJSON } from "ol/format.js"
const pageHeight = ref(window.innerHeight - 60 + "px")
window.addEventListener("resize", () => {
  pageHeight.value = window.innerHeight - 60 + "px"
})
const initMap = () => {
  const layer1 = new TileLayer({
    title: "底图",
    source: new XYZ({
      //   url: "http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
      url: "https://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}",
    }),
  })
  const layer2 = new TileLayer({
    title: "标注",
    source: new XYZ({
      // url: "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
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
    new ZoomToExtent({
      extend: [110, 30, 160, 30],
    }),
    new ZoomSlider(),
    new FullScreen(),
  ]
  // 创建一个地图
  const map = new Map({
    layers: [layer1, layer2], // 加载的图层
    target: "mymap", // 绑定div
    controls: icontrols, // 设置要显示的控件
    view: new View({
      center: [114.3, 30.5], // 中心位置
      zoom: 14, // 缩放登级
      // maxZoom: 18,
      projection: "EPSG:4326", // 使用坐标系
    }),
  })

  let data = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [114.3, 30.5],
            [116, 30.5],
          ],
        },
      },
    ],
  }
  let source = new VectorSource({
    features: new GeoJSON().readFeatures(data),
  })
  let layer = new VectorLayer({
    source,
  })
  let style = new Style({
    image: new Circle({
      radius: 10,
      fill: new Fill({
        color: "#ff2d51",
      }),
      stroke: new Stroke({
        width: 2,
        color: "#333",
      }),
    }),
  })
  // layer.setStyle(style)
  map.addLayer(layer)
  map.on("click", (e) => {
    console.log(e)
  })
}
onMounted(() => {
  initMap()
})
</script>
<style scoped>
.upload {
  height: 50px;
  /* background-color: aquamarine; */
}
.imap {
  min-width: 800px;
  height: 800px;
}
.ol-zoomslider {
  top: 50px;
}
</style>

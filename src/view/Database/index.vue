<template>
  <div class="home">
    <div class="searchpanel">
      <input type="text" class="searchTerm" placeholder="Search" />
      <button type="submit" class="searchButton">
        <i class="fa fa-search"></i>
      </button>
    </div>
    <div class="card">
      <div class="row card-row">
        <div class="col-sm-12">
          <div class="title" data-test="list-card-title">
            <div id="ember390" class="ember-view">
              <router-link to="upload"
                >Hong Kong Population Distribution in 2021</router-link
              >
            </div>
          </div>
          <div class="owner-source" data-test="owner-source">
            Esri China (Hong Kong) Ltd. | esrichinahk
          </div>
        </div>
      </div>
      <div
        class="row card-row description-row hidden-xs"
        data-test="description"
      >
        <div class="col-xs-12">
          <div class="description">
            This layer shows the Hong Kong population distribution in 2021
            Population Census.&nbsp;It is a subset of the census data 2021 made
            available by the Census and Statistics Department under the
            Government of Hong Kong Special Administrative Region (the
            “Government”) at https://DATA.GOV.HK/ (“DATA.GOV.HK”).&nbsp;The
            source data is in XLSX format and has been processed and converted
            into Esri File Geodatabase format and then uploaded to Esri’s ArcGIS
            Online platform for sharing and reference purpose. The objectives
            are to facilitate our Hong Kong ArcGIS Online users to use the data
            in a spatial ready format and save their data conversion effort.For
            details about the data, source format and terms of conditions of
            usage, please refer to the website of DATA.GOV.HK
            at&nbsp;https://data.gov.hk.
          </div>
        </div>
      </div>

      <div class="divider hidden-xs"></div>

      <div class="row card-row metadata-row">
        <div class="col-xs-12 col-sm-6">
          <ul class="metadata-list">
            <li class="metadata-item">
              <strong>类型</strong>:
              <span
                data-test="metadata-col-1-item-0"
                aria-describedby="tooltip_vuyy2plx2n"
              >
                <span id="ember393" class="hub-tooltip__target"><!----></span>
                Feature Layer
              </span>
            </li>
            <li class="metadata-item">
              <strong>最近更新</strong>:
              <span
                data-test="metadata-col-1-item-1"
                aria-describedby="tooltip_4rapmohz18"
              >
                <span id="ember395" class="hub-tooltip__target"><!----></span>
                2022年5月31日
              </span>
              <div
                class="hub-tooltip"
                role="tooltip"
                id="tooltip_4rapmohz18"
                aria-hidden="true"
                x-placement="top"
                style="
                  position: fixed;
                  visibility: hidden;
                  will-change: transform;
                  top: 0px;
                  left: 0px;
                  transform: translate3d(393px, 426px, 0px);
                "
              >
                <div class="tooltip__arrow" style="left: 25px"></div>
                <div class="tooltip__inner" id="ember395-render-target">
                  <span></span> 更新日期
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="col-xs-12 col-sm-6 second-column">
          <ul class="metadata-list metadata-list-2">
            <li class="metadata-item">
              <strong>行</strong>:
              <span
                data-test="metadata-col-2-item-0"
                aria-describedby="tooltip_0d944gmo0n"
              >
                <span id="ember397" class="hub-tooltip__target"><!----></span>
                18
              </span>
            </li>
            <li class="metadata-item">
              <strong>标签</strong>:
              <span
                data-test="metadata-col-2-item-1"
                aria-describedby="tooltip_wuf1xkqmao"
              >
                <span id="ember399" class="hub-tooltip__target"><!----></span>
                census, C&amp;SD, Population distribution, 2021, Hong Kong
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { open } from "shapefile"
import JsZip from "jszip"

export default {
  data() {
    return {
      shpFile: {},
      upList: {},
    }
  },
  methods: {
    selectShpFile() {
      var that = this
      this.shpFile = document.getElementById("uploadFileInput").files[0]
      const fileName = this.shpFile.name
      const isZip = fileName.indexOf("zip") !== -1
      const isShp = fileName.indexOf("shp") !== -1
      if (!(isZip || isShp)) {
        that.$message.error("只能上传zip、shp格式!")
        that.abortLoad() //因为手动上传，所以这里是取消上传
        return false
      } else {
        isZip ? that.openZip(this.shpFile) : that.toGeo(this.shpFile)
      }
    },
    // 为zip时，读取压缩包，选取shp文件
    openZip(data) {
      var that = this
      var newZip = new JsZip()
      newZip
        .loadAsync(data)
        .then(function (file) {
          // 压缩包里的内容file.files
          console.log(file)
          const fileList = Object.keys(file.files)
          const pattern = new RegExp(/\S\.shp$/)
          that.shpFile = fileList.find((i) => pattern.test(i))
          newZip
            .file(that.shpFile)
            .async("arraybuffer") // 此处是压缩包中的shp文件,arraybuffer(此时在回调的参数中已经可以获取到上传的zip压缩包下的所有文件)
            .then(function (content) {
              // 这个就是文件中的内容
              that.shapefileOpen(content)
            })
        })
        .catch((err) => {
          // 是否是合法的zip包，解决rar包改后缀zip
          console.log(err)
          that.$message.error("请上传正确格式的文件")
        })
    },
    // 转ArrayBuffer
    toGeo(data) {
      var that = this
      const reader = new FileReader()
      reader.readAsArrayBuffer(data)
      reader.onload = function (e) {
        that.shapefileOpen(this.result)
      }
    },
    // shapefile插件 shp转geo
    shapefileOpen(content) {
      var that = this
      open(content)
        .then((source) =>
          source.read().then(function log(result) {
            console.log(result)
            if (result.done) {
              if (that.upList.length > 1) {
                //这部分纯粹为了把很多平面拼在一起，你也可以根据自己的需求拼接
                const cList = that.upList.map((ele) => {
                  return ele.geometry.coordinates
                })
                const geojson = {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "MultiPolygon",
                    coordinates: cList,
                  },
                }
                //上传接口
              } else {
                //上传接口
              }
              return
            }
            // that.upList.push(result.value) //多个面时，会打印每一个，这样就先把他们放在一个集合里
            return source.read().then(log)
          })
        )
        .catch((error) => console.error(error.stack))
    },
  },
}
</script>
<style scoped>
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css);
a {
  color: #42b983;
}
.home {
  display: flex;
}
.searchpanel {
  flex: 2;
  border-right: solid 1px #33a571;
  display: flex;
  padding: 2vw;
}
.searchTerm {
  width: 100%;
  border: 2px solid #33a571;
  border-right: none;
  padding: 5px;
  height: 3vw;
  border-radius: 5px 0 0 5px;
  outline: none;
  color: #9dbfaf;
}

.searchTerm:focus {
  color: #33a571;
}

.searchButton {
  width: 40px;
  height: 3vw;
  border: 1px solid #33a571;
  background: #33a571;
  text-align: center;
  color: #fff;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  font-size: 20px;
}
.card {
  flex: 3;
  padding: 3vw;
}
</style>

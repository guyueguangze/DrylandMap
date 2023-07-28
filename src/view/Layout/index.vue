<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="20"
        ><div class="grid-content ep-bg-purple">
          <el-menu
            :default-active="activeIndex"
            mode="horizontal"
            @select="handleSelect"
            :router="true"
            background-color=""
            active-text-color="red"
            text-color=""
          >
            <template v-for="(item, index) in menuLists">
              <el-menu-item
                @click="click(item.link)"
                :key="index"
                v-if="index < visibleNumber"
              >
                {{ item.title }}</el-menu-item
              >
            </template>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="4"
        ><div class="grid-content ep-bg-purple">
          <div class="auth">
            <div class="login" @click="handleClickLogin">
              登录 &nbsp; |&nbsp; 注册
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-dialog v-model="dialogTableVisible">
      <Login />
    </el-dialog>
  </div>
  <router-view></router-view>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import Login from "./components/Login/index.vue"
const dialogTableVisible = ref(false)

const menuLists = [
  {
    title: "Database",
    link: "/database",
  },
  {
    title: "Upload",
    link: "/upload",
  },
  {
    title: "Engine",
    link: "/engine",
  },
]
const router = useRouter()
const visibleNumber = ref(4)
const activeIndex = ref("1")
const handleSelect = (value) => {
  console.log(value, 55)
}
const click = (value) => {
  router.push(value)
}
const handleClickLogin = () => {
  dialogTableVisible.value = true
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
  padding: 0px !important;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;

  .auth {
    cursor: pointer;
    width: 100%;
    height: 59px;
    line-height: 59px;
    border-bottom: 1px solid rgb(225, 236, 278);

    .login:hover {
      color: skyblue;
    }
  }
}
</style>

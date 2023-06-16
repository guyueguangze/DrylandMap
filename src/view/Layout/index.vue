<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      :router="true"
      background-color="#33A571"
      active-text-color="#ffffff"
      text-color="#ffffff"
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
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
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
const bg = ref("#33A571")
const handleSelect = (value) => {
  console.log(value, 55)
}
const click = (value) => {
  router.push(value)
}
</script>

<style lang="scss" scoped></style>

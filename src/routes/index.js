import { createRouter, createWebHistory } from "vue-router"
import Home from "../view/Home/index.vue"
import Layout from "@/view/Layout/index.vue"
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: Home,
      },
      { path: "/upload", component: () => import("@/view/Upload/index.vue") },
      { path: "/engine", component: () => import("@/view/Engine/index.vue") },
      {
        path: "/database",
        component: () => import("@/view/Database/index.vue"),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
export default router

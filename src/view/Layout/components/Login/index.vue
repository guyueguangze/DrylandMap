<template>
  <div>
    <template v-if="islogin">
      <div class="login_from">
        <el-form
          ref="ruleFormRef"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="pass">
            <el-input autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button class="login_button" type="primary" size="large"
              >登录</el-button
            >
          </el-form-item>
          <el-form-item>
            <div class="to_register">
              没有账号？<el-button @click="handleRegister" type="text"
                >注册账号</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </template>

    <template v-if="islogin ? false : true">
      <div class="register_from">
        <el-form
          ref="ruleFormRef"
          status-icon
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="pass">
            <el-input autocomplete="off" />
          </el-form-item>
          <el-form-item label="密码" prop="checkPass">
            <el-input type="password" autocomplete="off" />
          </el-form-item>

          <el-form-item>
            <el-button class="login_button" type="primary" size="large"
              >注册</el-button
            >
          </el-form-item>
          <el-form-item>
            <div class="to_register">
              已有账号？<el-button @click="handleClickLogin" type="text"
                >去登录</el-button
              >
            </div>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, watchEffect } from "vue"
const islogin = ref(true)
const handleRegister = () => {
  islogin.value = false
}
const handleClickLogin = () => {
  islogin.value = true
}

// const { dialogTableVisible } = defineProps()
</script>

<style lang="scss" scoped>
.login_button {
  width: 100%;
}
</style>

<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import Vue from 'vue'
import { ref, onMounted } from 'vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()


</script>

<template>
  <el-main>
    <div class="header-div">
      <h3>{{ t('test') }}</h3>
    </div>
   
    <div class="main-div">
      <el-card class="box-card">

      </el-card>
    </div>
  </el-main>
</template>

<style>
.box-card {
  width: 680px;
  height: 500px;
}

.progress-div {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 5px;
  right: 5px;
}

.main-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.footer-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}

.header-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}
</style>

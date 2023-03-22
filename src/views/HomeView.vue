<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import Vue from 'vue'
import { ref, onMounted } from 'vue'

import { useI18n } from 'vue-i18n'

// import docSVG from '@/assets/logo.svg'
import docSVG from '@/assets/undraw_doctors.svg'

const { t } = useI18n()


</script>

<template>
  <el-main>
    <div class="header-div">
      <h3>{{ t('test') }}</h3>
    </div>

    <div class="main-div">

      <el-row :gutter="20">
        <el-col :span="8" class="hidden-sm-and-down">
          <div class="svg-div"><docSVG :height="540" :width="630"/></div>
          
        </el-col>
        <el-col :md="24" :lg="16">

          <el-card class="box-card" :body-style="{ 'min-width': '100px' }"
          >

          </el-card>
        </el-col>
      </el-row>


    </div>
  </el-main>
</template>

<style>
.box-card {
  min-height: calc(100vh - 200px);
  height: 100%;
  background-color: rgba(255,255,255,0.1) !important;
  background-image: radial-gradient(transparent 1px, #ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}


html.dark .box-card {
  background-image: radial-gradient(transparent 1px, #111111 1px);
}




/* .main-div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
} */

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

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}

.ep-bg-purple {
  background: #d3dce6;
}

/* .svg-div > svg {
  width: 480px;
  height: 480px;
} */


</style>

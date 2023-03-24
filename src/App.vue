<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useDark, useToggle } from '@vueuse/core'

import dayIcon from '@/assets/svg/day.svg?component'
import darkIcon from '@/assets/svg/dark.svg?component'
// import HelloWorld from './components/HelloWorld.vue'

// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// @ts-ignore
import en from 'element-plus/dist/locale/en.mjs'

const localeELement = ref(en)

const { locale: i18nLang } = useI18n()
const region = ref(i18nLang.value)
console.log('i18nLang.value', i18nLang.value)

const isDark = useDark()

const toggleDark = () => {
  useToggle(isDark)
}

const changeLang = (lang: string) => {
  i18nLang.value = lang

  if (lang === 'zh') {
    localeELement.value = zhCn
  } else if (lang === 'en') {
    localeELement.value = en
  }
}
</script>

<template>
  <el-header class="navbar">
    <div class="vertical-header-left">
      <img alt="logo" class="logo" src="@/assets/pills-64.png" width="32" height="32" />
    </div>
    <div class="vertical-header-right">
      <el-form :inline="true">
        <el-form-item label="" style="color: white !important">
          <div style="color: #E5EAF3; margin-right: 10px; display: flex; align-items: center;">
            <svg preserveAspectRatio="xMidYMid meet"  viewBox="0 0 24 24" height="24" width="24">
            <path fill="currentColor"
              d="m18.5 10l4.4 11h-2.155l-1.201-3h-4.09l-1.199 3h-2.154L16.5 10h2zM10 2v2h6v2h-1.968a18.222 18.222 0 0 1-3.62 6.301a14.864 14.864 0 0 0 2.336 1.707l-.751 1.878A17.015 17.015 0 0 1 9 13.725a16.676 16.676 0 0 1-6.201 3.548l-.536-1.929a14.7 14.7 0 0 0 5.327-3.042A18.078 18.078 0 0 1 4.767 8h2.24A16.032 16.032 0 0 0 9 10.877a16.165 16.165 0 0 0 2.91-4.876L2 6V4h6V2h2zm7.5 10.885L16.253 16h2.492L17.5 12.885z">
            </path>
          </svg>
          </div>
          <el-select v-model="region" @change="changeLang(region)" style="width: 64px">
            <el-option value="zh">中文</el-option>
            <el-option value="en">English</el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-switch @change="toggleDark()" v-model="isDark" inline-prompt :active-icon="darkIcon"
            :inactive-icon="dayIcon" />
        </el-form-item>
      </el-form>
    </div>
  </el-header>
  <el-config-provider :locale="localeELement">
    <RouterView />
  </el-config-provider>
</template>

<style>
.navbar .el-form-item {
  margin-bottom: unset;
  margin-right: 10px;
}

.navbar {
  height: 48px !important;
  overflow: hidden;
  width: 100%;
  /* background-image: radial-gradient(transparent 1px, #ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px); */
  background-color: #409EFF;
  border-bottom: 1px solid #337ecc;
  display: flex;

}

.navbar .vertical-header-left {
  align-items: center;
  display: flex;
  height: 48px;
  min-width: 48px;
  flex-grow: 1;
}


.navbar .vertical-header-right {
  align-items: center;
  color: #000000d9;
  display: flex;
  height: 48px;
  justify-content: flex-end;
  min-width: 280px;
  margin-left: auto;
}

/* .navbar .el-form-item__label {
  color: white !important;
} */

@media only screen and (max-width: 480px) {
  .navbar {
    padding-left: 10px !important;
    padding-right: 10px !important;
  }

  .navbar .vertical-header-right .el-form-item {
    margin-right: 12px !important;
  }
}
</style>

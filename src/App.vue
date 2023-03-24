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
        <el-form-item label="Lang" style="color: white !important">
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

<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import Vue from 'vue'
import { ref, onMounted } from 'vue'
import { reactive } from 'vue'

import { useI18n } from 'vue-i18n'

// import docSVG from '@/assets/logo.svg'
import docSVG from '@/assets/undraw_doctors.svg'

const { t } = useI18n()



const form = reactive({
  name: '',
  id: '',
  tel: '',
  gender: '',
  age: '',
  height: '',
  weight: '',
  primary_tumor_diagnosis: '',
  pain_type: '',
  pain_nature: [],
  cs_drugs: "",
  bmi: [],
  smoking_history: "",
  kps: "",
  opiate_tolerant: "",
  serum_creatinine: "",
  rs1074287: "", 
})


</script>

<template>
  <el-main>
    <!-- <div class="header-div">
      <h3>{{ t('test') }}</h3>
    </div> -->

    <div class="main-div">

      <el-row :gutter="20">
        <el-col :span="8" class="hidden-sm-and-down">
          <div class="svg-div">
            <docSVG :height="540" :width="630" />
          </div>

        </el-col>
        <el-col :md="24" :lg="16">

          <el-card class="box-card" :body-style="{ 'min-width': '200px' }">
            <div style="height: 24px;"></div>
            <el-scrollbar style="height: calc(100vh - 240px);">
            <el-form class="m-form" :model="form" label-width="128px">
              <el-row :gutter="5">
                <el-col :span="6">
                  <el-form-item label="姓名">
                    <el-input v-model="form.name" />
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="ID">
                    <el-input v-model="form.id" />
                  </el-form-item>
                </el-col>
                <el-col :span="9">
                  <el-form-item label="联系电话">
                    <el-input v-model="form.tel" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="性别">
                    <el-input v-model="form.gender" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="年龄">
                    <el-input v-model="form.id" />
                  </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="身高">
                  <el-input v-model="form.height" />
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="体重">
                    <el-input v-model="form.weight" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="原发肿瘤诊断">
                    <el-input v-model="form.primary_tumor_diagnosis" />
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="疼痛类型">
                    <!-- 躯体痛、内脏痛、神经痛、爆发痛 -->
                    <el-radio-group v-model="form.pain_type">
                      <el-radio label="1">躯体痛</el-radio>
                      <el-radio label="2">内脏痛</el-radio>
                      <el-radio label="3">神经痛</el-radio>
                      <el-radio label="4">爆发痛</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="24">
                  <el-form-item label="疼痛性质">
                    <!-- 酸痛	刺痛	跳痛	钝痛
                      绞痛	胀痛	坠痛	钻顶样痛
                      爆裂样痛	撕裂样痛	牵拉样痛	压榨样痛
                      放电样痛	烧灼样痛	麻木样痛	刀割样痛
                      轻触痛	无名痛	隐痛	尖锐痛 -->
                    <el-checkbox-group v-model="form.pain_nature">
                      <el-checkbox label="1">酸痛</el-checkbox>
                      <el-checkbox label="2">刺痛</el-checkbox>
                      <el-checkbox label="3">跳痛</el-checkbox>
                      <el-checkbox label="4">钝痛</el-checkbox>
                      <el-checkbox label="5">绞痛</el-checkbox>
                      <el-checkbox label="6">胀痛</el-checkbox>
                      <el-checkbox label="7">坠痛</el-checkbox>
                      <el-checkbox label="8">钻顶样痛</el-checkbox>
                      <el-checkbox label="9">爆裂样痛</el-checkbox>
                      <el-checkbox label="10">撕裂样痛</el-checkbox>
                      <el-checkbox label="11">牵拉样痛</el-checkbox>
                      <el-checkbox label="12">压榨样痛</el-checkbox>
                      <el-checkbox label="13">放电样痛</el-checkbox>
                      <el-checkbox label="14">烧灼样痛</el-checkbox>
                      <el-checkbox label="15">麻木样痛</el-checkbox>
                      <el-checkbox label="16">刀割样痛</el-checkbox>
                      <el-checkbox label="17">轻触痛</el-checkbox>
                      <el-checkbox label="18">无名痛</el-checkbox>
                      <el-checkbox label="19">隐痛</el-checkbox>
                      <el-checkbox label="20">尖锐痛</el-checkbox>
                    </el-checkbox-group>

                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="疼痛强度">
                    <el-input v-model="form.id">
                      <template #prepend>
                        NRS评分
                      </template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="24"></el-col>
                <!-- // 心脑血管系统药物（单选）：是、否
                // BMI（单选)：＜18.5、18.5~23.9、≥24
                // 吸烟史(单选)：是、否
                // KPS (体能状况) (单选) ：100、90、80、70、60
                // 阿片类耐受(单选)：是、否
                // 血肌酐 (单选) ：低于正常值、正常值、高于正常值
                // rs1074287 (单选) ：AA、AG、GG -->
                <el-col :span="8">
                  <el-form-item label="心脑血管系统药物">
                    <el-radio-group v-model="form.cs_drugs">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="BMI">
                    <el-radio-group v-model="form.bmi">
                      <el-radio label="1">＜18.5</el-radio>
                      <el-radio label="2">18.5~23.9</el-radio>
                      <el-radio label="3">≥24</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="吸烟史(体能状况)">
                    <el-radio-group v-model="form.smoking_history">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="KPS">
                    <el-radio-group v-model="form.kps">
                      <el-radio label="1">100</el-radio>
                      <el-radio label="2">90</el-radio>
                      <el-radio label="3">80</el-radio>
                      <el-radio label="4">70</el-radio>
                      <el-radio label="5">60</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="阿片类耐受">
                    <el-radio-group v-model="form.opiate_tolerant">
                      <el-radio label="1">是</el-radio>
                      <el-radio label="0">否</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="血肌酐">
                    <!-- 低于正常值、正常值、高于正常值 -->
                    <el-radio-group v-model="form.serum_creatinine">
                      <el-radio label="1">低于正常值</el-radio>
                      <el-radio label="2">正常值</el-radio>
                      <el-radio label="3">高于正常值</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
                <el-col :span="16">
                  <el-form-item label="rs1074287">
                    <!-- AA、AG、GG  -->
                    <el-radio-group v-model="form.rs1074287">
                      <el-radio label="1">AA</el-radio>
                      <el-radio label="2">AG</el-radio>
                      <el-radio label="3">GG</el-radio>
                    </el-radio-group>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-scrollbar>
          </el-card>
        </el-col>
      </el-row>


    </div>
  </el-main>
</template>

<style>
.box-card {
  min-height: calc(100vh - 110px);
  /* height: 100%; */
  background-color: rgba(255, 255, 255, 0.1) !important;
  background-image: radial-gradient(transparent 1px, #ffffff 1px);
  background-size: 4px 4px;
  backdrop-filter: saturate(50%) blur(4px);
}


html.dark .box-card {
  background-image: none;
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


.el-radio__label,
.el-checkbox__label {
  font-weight: normal;
}
.el-form-item__label {
  font-weight: bold;
}

.svg-div {
  display: flex;
  height: 100%;
  align-items: center;
}

.m-form {
  padding-right: 40px;
}
</style>

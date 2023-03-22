<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import Vue from 'vue'
import { ref, onMounted, watchEffect } from 'vue'
import { reactive } from 'vue'

import { useI18n } from 'vue-i18n'

// import docSVG from '@/assets/logo.svg'
import docSVG from '@/assets/undraw_doctors.svg'
import type { FormInstance, FormRules } from 'element-plus'

const { t } = useI18n()

const ruleFormRef = ref<FormInstance>()
const labelPosition = ref('right')

const screenWidth = ref(window.innerWidth);
if (screenWidth.value < 480) {
  labelPosition.value = 'top'
}

window.addEventListener('resize', () => {
  screenWidth.value = window.innerWidth;
});

watchEffect(
  () => {
    if (screenWidth.value < 480) {
      labelPosition.value = 'top'
    } else {
      labelPosition.value = 'right'
    }
  }
)

const ruleForm  = reactive({
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
  pain_level: '',
  cs_drugs: "",
  bmi: "",
  smoking_history: "",
  kps: "",
  opiate_tolerant: "",
  serum_creatinine: "",
  rs1074287: "",
})

const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Activity name', trigger: 'blur' },
    { min: 2, max: 32, message: 'Length should be 2 to 32', trigger: 'blur' },
  ],
})

const resetForm = (formEl: FormInstance | undefined) => {
  console.log('resetForm')
  if (!formEl) return
  formEl.resetFields()
}

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}

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
          <el-card class="box-card"  :body-style="{ 'min-width': '200px' }">
            <template #header >{{ t('card_title') }}</template>
            <div style="height: 24px;"></div>
            <el-scrollbar style="height: calc(100vh - 300px); max-height: 600px;">
              <el-form class="m-form" ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon
                :label-position="labelPosition" label-width="140px">
                <el-row :gutter="5">
                  <el-col :md="8">
                    <el-form-item label="姓名" required prop="name">
                      <el-input v-model="ruleForm.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="ID" required prop="id">
                      <el-input v-model="ruleForm.id" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="联系电话" prop="tel">
                      <el-input v-model="ruleForm.tel" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="性别" required prop="gender">
                      <el-input v-model="ruleForm.gender" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="年龄" required prop="age">
                      <el-input v-model="ruleForm.age" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="身高" prop="height">
                      <el-input v-model="ruleForm.height" />
                    </el-form-item>
                </el-col>
                <el-col :md="8">
                  <el-form-item label="体重" prop="weight">
                    <el-input v-model="ruleForm.weight" />
                  </el-form-item>
                </el-col>
                  <el-col :md="16">
                    <el-form-item label="原发肿瘤诊断" required prop="primary_tumor_diagnosis">
                      <el-input v-model="ruleForm.primary_tumor_diagnosis" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item label="疼痛类型" prop="pain_type">

                      <el-radio-group v-model="ruleForm.pain_type">
                        <el-radio label="1">躯体痛</el-radio>
                        <el-radio label="2">内脏痛</el-radio>
                        <el-radio label="3">神经痛</el-radio>
                        <el-radio label="4">爆发痛</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item label="疼痛性质" prop="pain_nature">

                      <el-checkbox-group v-model="ruleForm.pain_nature">
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
                  <el-col :md="8">
                    <el-form-item label="疼痛强度" prop="pain_level">
                      <el-input v-model="ruleForm.pain_level">
                        <template #prepend>
                          NRS评分
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24"></el-col>

                  <el-col :md="8">
                    <el-form-item label="心脑血管系统药物" required prop="cs_drugs">
                      <el-radio-group v-model="ruleForm.cs_drugs">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item label="BMI" required prop="bmi">
                      <el-radio-group v-model="ruleForm.bmi">
                        <el-radio label="1">＜18.5</el-radio>
                        <el-radio label="2">18.5~23.9</el-radio>
                        <el-radio label="3">≥24</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="吸烟史(体能状况)" required prop="smoking_history">
                      <el-radio-group v-model="ruleForm.smoking_history">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item label="KPS" required prop="kps">
                      <el-radio-group v-model="ruleForm.kps">
                        <el-radio label="1">100</el-radio>
                        <el-radio label="2">90</el-radio>
                        <el-radio label="3">80</el-radio>
                        <el-radio label="4">70</el-radio>
                        <el-radio label="5">60</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item label="阿片类耐受" required prop="opiate_tolerant">
                      <el-radio-group v-model="ruleForm.opiate_tolerant">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item label="血肌酐" required prop="serum_creatinine">

                      <el-radio-group v-model="ruleForm.serum_creatinine">
                        <el-radio label="1">低于正常值</el-radio>
                        <el-radio label="2">正常值</el-radio>
                        <el-radio label="3">高于正常值</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item label="rs1074287" required prop="rs1074287">

                      <el-radio-group v-model="ruleForm.rs1074287">
                        <el-radio label="1">AA</el-radio>
                        <el-radio label="2">AG</el-radio>
                        <el-radio label="3">GG</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-scrollbar>
            <div class="m-button-div">
              <el-button @click="submitForm(ruleFormRef)" type="primary" >提交</el-button>
              <el-button @click="resetForm(ruleFormRef)" >清空</el-button>
            </div>

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
.m-button-div {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
}


@media only screen and (max-width: 480px) {
  .el-main {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .el-card__body {
    padding: 0 !important;
  }

  .m-form {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>

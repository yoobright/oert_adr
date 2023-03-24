<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import Vue from 'vue'
import { ref, onMounted, watchEffect } from 'vue'
import { reactive } from 'vue'

import { useI18n } from 'vue-i18n'

// import docSVG from '@/assets/logo.svg'
import docSVG from '@/assets/undraw_doctors.svg?component'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'

// onnx model
import { InferenceSession, Tensor, env as ort_env } from 'onnxruntime-web'

const { t } = useI18n()

const ruleFormRef = ref<FormInstance>()
const labelPosition = ref<"top" | "right" | "left">('right')

let modelSession: InferenceSession

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

interface formData {
  name: string;
  id: string;
  tel: string;
  gender: string;
  age: number | string;
  height: number | string;
  weight: number | string;
  primary_tumor_diagnosis: string;
  pain_type: string;
  pain_nature: string[];
  pain_level: number;
  cs_drugs: string;
  bmi: string;
  smoking_history: string;
  kps: string;
  opiate_tolerant: string;
  serum_creatinine: string;
  rs1074287: string;
}

const ruleForm: formData = reactive({
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
  pain_level: 0,
  cs_drugs: '',
  bmi: '',
  smoking_history: '',
  kps: '',
  opiate_tolerant: '',
  serum_creatinine: '',
  rs1074287: '',
})

const checkAge = (rule: any, value: any, callback: any) => {
  console.log('checkAge', value)
  if (!value) {
    return callback(new Error('Please input the age'))
  }

  if (!Number.isInteger(value)) {
    callback(new Error('Please input digits'))
  } else {
    if (value < 18) {
      callback(new Error('Age must >= 18'))
    } else {
      callback()
    }
  }
}


const rules = reactive<FormRules>({
  name: [
    { required: true, message: 'Please input Name', trigger: 'blur' },
    { min: 2, max: 32, message: 'Length should be 2 to 32', trigger: 'blur' },
  ],
  age: [{ validator: checkAge, trigger: 'blur' }],
  pain_level: [
    { type: 'number', min: 0, max: 10, message: 'Number be 0 to 10', trigger: 'blur' },
  ],
  height: [
    { type: 'number', min: 0, max: 250, message: 'Number be 0 to 250', trigger: 'blur' },
  ],
  weight: [
    { type: 'number', min: 0, max: 500, message: 'Number be 0 to 500', trigger: 'blur' },
  ],
})

const resetForm = (formEl: FormInstance | undefined) => {
  console.log('resetForm')
  if (!formEl) return
  formEl.resetFields()
}

function genFeat(): number[] {
  const feat = []
  feat.push(parseFloat(ruleForm.bmi))
  feat.push(parseFloat(ruleForm.kps))
  feat.push(parseFloat(ruleForm.opiate_tolerant))
  feat.push(parseFloat(ruleForm.smoking_history))
  feat.push(parseFloat(ruleForm.serum_creatinine))
  feat.push(parseFloat(ruleForm.cs_drugs))
  feat.push(parseFloat(ruleForm.rs1074287))
  return feat
}

async function initModel() {
  // create a session
  console.log("init onnx");
  ort_env.wasm.wasmPaths = `${import.meta.env.BASE_URL}`
  // const session = await InferenceSession.create("model.onnx");
  modelSession = await InferenceSession.create(`${import.meta.env.BASE_URL}model.onnx`)
  console.log("init model done");

}

async function runModel(feat: number[]) {

  if (!modelSession) {
    console.log("model not init")
    ElMessageBox.alert(t('model_not_loaded'), 'info', {
      confirmButtonText: 'OK',
    })
    return
  }

  console.log("run onnx")
  const inputDim = [1, 7]

  const input0 = new Tensor(
    new Float32Array(feat) /* data */,
    inputDim /* dims */
  );

  const outputs = await modelSession.run({ input0: input0 }, {})
  console.log("output", outputs)
  const proba = outputs.probabilities.data[1] as number * 100

  const outstr = `${t('result_statement')}${proba.toFixed(2)}%`
  console.log(outstr)

  ElMessageBox.alert(outstr, t('result_title'), {

    confirmButtonText: 'OK',
    callback: (action: Action) => {
      ElMessage({
        type: 'info',
        message: `action: ${action}`,
      })
    },
  })
}

initModel();

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      const feat = genFeat()
      runModel(feat)

    } else {
      console.log('error submit!', fields)

      // @ts-ignore
      const firstField = Object.keys(fields)[0]
      formEl.scrollToField(firstField)
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

      <el-row>
        <el-col :span="8" class="hidden-md-and-down">
          <div class="svg-div">
            <docSVG height="540" width="630" />
          </div>

        </el-col>
        <el-col :md="24" :lg="16">
          <el-card class="box-card" :body-style="{ 'min-width': '200px' }">
            <template #header>
              <div style="display: flex; align-items: center;">
                <el-icon :size="24" style="margin-right: 10px;">
                  <i-ep-edit />
                </el-icon>
                {{ t('card_title') }}
              </div>
            </template>
            <div style="height: 24px;"></div>
            <el-scrollbar style="height: calc(100vh - 300px); max-height: 600px; min-height: 300px;">
              <el-form class="m-form" ref="ruleFormRef" :model="ruleForm" :rules="rules" status-icon
                :label-position="labelPosition" label-width="160px">
                <el-row :gutter="5">
                  <el-col :sm="12" :md="8">
                    <el-form-item :label="t('name')" required prop="name">
                      <el-input v-model="ruleForm.name" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="12" :md="8">
                    <el-form-item label="ID" required prop="id">
                      <el-input v-model="ruleForm.id" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="12" :md="8">
                    <el-form-item :label="t('tel')" prop="tel">
                      <el-input v-model="ruleForm.tel" />
                    </el-form-item>
                  </el-col>
                  <el-col :sm="12" :md="8">
                    <el-form-item :label="t('gender')" required prop="gender">
                      <el-radio-group v-model="ruleForm.gender">
                        <el-radio label="1">{{ t('gender_p1') }}</el-radio>
                        <el-radio label="0">{{ t('gender_p2') }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="12" :md="8">
                    <el-form-item :label="t('age')" required prop="age">
                      <el-input type="number" min=0 max=120 v-model.number="ruleForm.age">
                        <template #append>{{ t('year') }}</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="12" :md="8">
                    <el-form-item :label="t('height')" prop="height">
                      <el-input type="number" min=0 max=230 v-model.number="ruleForm.height">
                        <template #append>cm</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :sm="12" :md="8">
                    <el-form-item :label="t('weight')" prop="weight">
                      <el-input type="number" min=0 max=400 v-model.number="ruleForm.weight">
                        <template #append>kg</template>
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item :label="t('primary_tumor_diagnosis')" required prop="primary_tumor_diagnosis">
                      <el-input v-model="ruleForm.primary_tumor_diagnosis" />
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item :label="t('pain_type')" prop="pain_type">

                      <el-radio-group v-model="ruleForm.pain_type">
                        <el-radio label="1">{{ t('pain_type_p1') }}</el-radio>
                        <el-radio label="2">{{ t('pain_type_p2') }}</el-radio>
                        <el-radio label="3">{{ t('pain_type_p3') }}</el-radio>
                        <el-radio label="4">{{ t('pain_type_p4') }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="24">
                    <el-form-item :label="t('pain_nature')" prop="pain_nature">
                      <el-checkbox-group v-model="ruleForm.pain_nature">
                        <el-checkbox label="1">{{ t('pain_nature_p1') }}</el-checkbox>
                        <el-checkbox label="2">{{ t('pain_nature_p2') }}</el-checkbox>
                        <el-checkbox label="3">{{ t('pain_nature_p3') }}</el-checkbox>
                        <el-checkbox label="4">{{ t('pain_nature_p4') }}</el-checkbox>
                        <el-checkbox label="5">{{ t('pain_nature_p5') }}</el-checkbox>
                        <el-checkbox label="6">{{ t('pain_nature_p6') }}</el-checkbox>
                        <el-checkbox label="7">{{ t('pain_nature_p7') }}</el-checkbox>
                        <el-checkbox label="8">{{ t('pain_nature_p8') }}</el-checkbox>
                        <el-checkbox label="9">{{ t('pain_nature_p9') }}</el-checkbox>
                        <el-checkbox label="10">{{ t('pain_nature_p10') }}</el-checkbox>
                        <el-checkbox label="11">{{ t('pain_nature_p11') }}</el-checkbox>
                        <el-checkbox label="12">{{ t('pain_nature_p12') }}</el-checkbox>
                        <el-checkbox label="13">{{ t('pain_nature_p13') }}</el-checkbox>
                        <el-checkbox label="14">{{ t('pain_nature_p14') }}</el-checkbox>
                        <el-checkbox label="15">{{ t('pain_nature_p15') }}</el-checkbox>
                        <el-checkbox label="16">{{ t('pain_nature_p16') }}</el-checkbox>
                        <el-checkbox label="17">{{ t('pain_nature_p17') }}</el-checkbox>
                        <el-checkbox label="18">{{ t('pain_nature_p18') }}</el-checkbox>
                        <el-checkbox label="19">{{ t('pain_nature_p19') }}</el-checkbox>
                        <el-checkbox label="20">{{ t('pain_nature_p20') }}</el-checkbox>
                      </el-checkbox-group>

                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item :label="t('pain_level')" prop="pain_level">
                      <!-- <el-input type="number" min=0 max=10 v-model="ruleForm.pain_level">
                          <template #prepend>
                            NRS
                          </template>
                        </el-input> -->

                      <el-slider style="margin-left: 10px;" :max=10 v-model="ruleForm.pain_level" show-input />
                    </el-form-item>
                  </el-col>
                  <el-col :md="24"></el-col>

                  <el-col :md="8">
                    <el-form-item :label="t('cardiovascular_system_drugs')" required prop="cs_drugs">
                      <el-radio-group v-model="ruleForm.cs_drugs">
                        <el-radio label=1>{{ t('yes') }}</el-radio>
                        <el-radio label=0>{{ t('no') }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item label="BMI" required prop="bmi">
                      <el-radio-group v-model="ruleForm.bmi">
                        <el-radio label=1>＜18.5</el-radio>
                        <el-radio label=2>18.5~23.9</el-radio>
                        <el-radio label=3>≥24</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item :label="t('smoking_history')" required prop="smoking_history">
                      <el-radio-group v-model="ruleForm.smoking_history">
                        <el-radio label=1>{{ t('yes') }}</el-radio>
                        <el-radio label=0>{{ t('no') }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item label="KPS" required prop="kps">
                      <el-radio-group v-model="ruleForm.kps">
                        <el-radio label=1>100</el-radio>
                        <el-radio label=2>90</el-radio>
                        <el-radio label=3>80</el-radio>
                        <el-radio label=4>70</el-radio>
                        <el-radio label=5>60</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="8">
                    <el-form-item :label="t('opiate_tolerant')" required prop="opiate_tolerant">
                      <el-radio-group v-model="ruleForm.opiate_tolerant">
                        <el-radio label=1>{{ t('yes') }}</el-radio>
                        <el-radio label=0>{{ t('no') }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item :label="t('serum_creatinine')" required prop="serum_creatinine">

                      <el-radio-group v-model="ruleForm.serum_creatinine">
                        <el-radio label=1>{{ t('serum_creatinine_p1') }}</el-radio>
                        <el-radio label=2>{{ t('serum_creatinine_p2') }}</el-radio>
                        <el-radio label=3>{{ t('serum_creatinine_p3') }}</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                  <el-col :md="16">
                    <el-form-item label="rs1074287" required prop="rs1074287">

                      <el-radio-group v-model="ruleForm.rs1074287">
                        <el-radio label=1>AA</el-radio>
                        <el-radio label=2>AG</el-radio>
                        <el-radio label=3>GG</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </el-scrollbar>
            <div class="m-button-div">
              <el-button @click="submitForm(ruleFormRef)" type="primary">{{ t('submit') }}</el-button>
              <el-button @click="resetForm(ruleFormRef)"> {{ t('reset') }}</el-button>
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

.box-card .el-form-item__label {
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


.box-card .el-form-item__label {
  height: 24px;
  line-height: 24px;
}

.box-card .el-card__header {
  font-weight: bold !important;
}


@media only screen and (max-width: 480px) {
  .el-main {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .el-card__body {
    padding: 0 !important;
  }

  .box-card {
    min-height: calc(100vh - 100px);
  }

  .main-div .el-row {
    margin-left: 10px;
    margin-right: 10px;
  }

  .m-form {
    padding-left: 24px;
    padding-right: 24px;
  }
}
</style>

<template>
  <q-page padding>
    <h2 header>Forms</h2>

    <div class="sample-id" style="margin-top: -3.5em; display: block;">
      <q-btn
        @click="handleCopyProgramId"
        size="md"
        class="q-mb-xl q-pa-sm copy-btn"
        label="Sample Program ID"
      >
        <q-badge color="primary" floating> Copy</q-badge>
      </q-btn>
    </div>

    <q-input
      ref="sampleProgramIdInput"
      class="sample-id-input"
      v-model="sampleProgramId"
    />

    <div class="row q-mb-sm justify-around">
      <section class="left-side form-controls col-md-5 col q-pr-lg">
        <q-select
          class="q-mb-lg"
          filled
          v-model="selectedSchool"
          :options="formsData"
          label="Select A School"
          @input="handleSelectedSchool"
        />
        <q-slide-transition>
          <div v-show="selectedSchool">
            <q-select
              filled
              v-model="selectedTemplate"
              :options="formTemplates"
              label="Select A Template"
            />

            <q-toggle
              class="q-mt-xl"
              v-model="useCustomFormId"
              label="Use A Custom Form ID"
              left-label
            />

            <q-input
              v-if="useCustomFormId"
              label="Custom ID To Use"
              v-model="customFormId"
            />
            <div class="button-wrapper">
              <q-btn
                class="q-mt-lg q-mb-sm"
                color="primary"
                label="Load Form"
                @click="loadForm"
              />
            </div>
          </div>
        </q-slide-transition>
      </section>

      <section class="right-side form-preview col-md-5">
        <div id="tlh-form"></div>
      </section>
    </div>
  </q-page>
</template>

<script>
import formsData from "data/forms.json";
import fetchInject from "fetch-inject";
const baseFormURL = `https://forms.learninghouse.com/embed`;
/**
 * Use for reference
 * @link https://github.com/thelearninghouse/tlh-forms/blob/master/src/admin/js/components/FormSettings.vue
 */
export default {
  data: () => ({
    formsData,
    selectedSchool: null,
    selectedTemplate: null,
    formTemplates: [],
    useCustomFormId: false,
    customFormId: null,
    sampleProgramId: "ba4bc33f-747e-487d-8998-f360b7e164f1"
  }),

  methods: {
    handleCopyProgramId() {
      const inputEl = this.$refs.sampleProgramIdInput;
      inputEl.select();
      document.execCommand("copy");
    },

    async handleSelectedSchool({ ghDirectory }) {
      this.selectedTemplate = null;
      this.formTemplates = [];
      const { data } = await this.$axios.get(`/contents/${ghDirectory}`);
      this.formTemplates = data.map(template => template.name);
    },

    loadForm() {
      fetchInject([this.formScript]);
    }
  },

  computed: {
    formScript() {
      const { ghDirectory, id } = this.selectedSchool;
      let formId;
      let idType;

      if (this.useCustomFormId) {
        formId = this.customFormId;
        idType = "program_id";
      } else {
        formId = id;
        idType = "account_id";
      }
      return `${baseFormURL}/${ghDirectory}/${this.selectedTemplate}?${idType}=${formId}`;
    }
  }
};
</script>

<style scoped>
.left-side.form-controls {
  border-right: 1px solid rgba(175, 175, 175, 0.418);
}

.button-wrapper {
  width: 100%;
}

.copy-btn {
  text-transform: capitalize !important;
  font-weight: 400;
}
.sample-id-input {
  opacity: 0;
}
/* .q-select {
  max-width: 400px;
} */
</style>

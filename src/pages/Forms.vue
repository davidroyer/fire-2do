<template>
  <q-page padding>
    <h2 header>Forms</h2>
    <q-badge color="secondary" multi-line>
      Model: "{{ selectedSchool }}"
    </q-badge>

    <q-select
      class="q-mb-xl"
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
      </div>
    </q-slide-transition>

    <q-btn
      class="q-mt-lg q-mb-sm"
      color="primary"
      label="Load Form"
      @click="loadForm"
    />
    <hr class="q-my-lg" />
    <div id="tlh-form"></div>
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
  // meta: {
  //   script: [{ src: "https://cdn.jsdelivr.net/npm/vue" }]
  // },
  data: () => ({
    formsData,
    selectedSchool: null,
    selectedTemplate: null,
    formTemplates: []
  }),

  methods: {
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
      return `${baseFormURL}/${ghDirectory}/${this.selectedTemplate}?account_id=${id}`;
    }
  }
};
</script>

<style scoped>
.q-select {
  max-width: 400px;
}
</style>

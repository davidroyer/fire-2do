<template>
  <div class="fixed-center text-center">
    <p>
      <img src="~assets/sad.svg" style="width:30vw;max-width:150px;" />
    </p>
    <strong class="text-faded">
      Sorry, nothing here...
      <strong>(404)</strong>
    </strong>
    <q-btn color="secondary" style="width:200px;" @click="$router.push('/')"
      >Go back</q-btn
    >
  </div>
</template>

<script>
export default {
  name: "Error404"
};
</script>

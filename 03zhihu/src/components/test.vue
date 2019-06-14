<template>
  <div class="wrapper">
    test
    test
    test
    test
    test
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../common/js/API";
export default {
  components: {},
  props: {},
  data() {
    return {
    };
  },
  watch: {},
  computed: {},
  methods: {},
  mounted() {
    console.log(API)
    this.$http({
      // url: API.view
      // url: API.news
      // url: API.PreviousNerws
      // url:API.obtain
      // url:API.addNews
    })
      .then(d => {
        console.log(d);
      })
  }
};
</script>
<style lang='stylus' scoped>
.wrapper {
}
</style>

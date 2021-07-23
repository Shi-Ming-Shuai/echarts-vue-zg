<template>
  <div class="Map"></div>
</template>

<script>
import axios from "axios"

export default {
  name: "Map",
  data() {
    return {}
  },
  async created() {
    const res = await axios("http://localhost:8080/static/test/test.json")
    console.log(res)
  },
  components: {},
  methods: {},
}
</script>

<style lang="less" scoped></style>

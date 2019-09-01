<template>
  <div class="wrapper">
    <div class="collect_top">
      <div class="top_left iconfont icon-gengduocaidanxianxing" @touchstart="toindex()"></div>
      <div class="top_right">{{length}}条收藏</div>
    </div>
    <!-- 内容 -->
    <div class="content">
      <ul class="cont_list">
        <!-- 循环 -->
        <li v-for="item in arr" v-on:click="toDetails(item.id)" :key="item.id">
          <p>{{item.title}}</p>
          <div>
            <img :src="item.images">
          </div>
        </li>
        <div>我是标题001</div>
        <!-- <li>
          <p>我也是标题</p>
          <div>
            <img>
          </div>
        </li>-->
      </ul>
    </div>
    <!-- 结束 -->
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  components: {},
  props: {},
  data() {
    return {
      arr: [],
      length: ""
    };
  },
  watch: {},
  computed: {},
  methods: {
    toindex() {
      this.$router.push("/index");
    },
    toDetails(id) {
      // console.log(Number(id))
      this.$router.push("/details/" + id);
    }
  },
  mounted() {
    // 无关内容：
    alert('无关内容');
    //  显示滚动条
    document.documentElement.style.position = "static";
    document.body.style.overflow = "";

    var arr = JSON.parse(localStorage.getItem("arr"));
    this.arr = arr;
    if (this.arr == null) {
      this.length = "0";
    } else {
      this.length = this.arr.length;
    }
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.collect_top {
  width: 100%;
  height: 1rem;
  background: $mainColor;
  display: flex;

  .top_left {
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.4rem;
    color: white;
  }

  .top_right {
    flex: 1;
    line-height: 1rem;
    font-size: 0.3rem;
    color: white;
  }
}

.content {
  background: $gwColor;
  // width: 100%;
  margin: 0;

  .cont_tit {
    font-size: 0.2rem;
    color: $grayColor;
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.2rem;
  }

  .cont_list {
    font-size: 0.3rem;
    color: $lightBlackColor;
    margin: 0 0.2rem;
    padding: 0 !important;
    overflow: hidden;

    li {
      border-radius: 0.1rem;
      height: 1.6rem;
      background: white;
      margin-top: 0.2rem;
      box-shadow: 0 0.01rem gray;
    }
  }
}

.cont_list {
  li {
    display: flex;
    padding: 0.2rem;

    p {
      flex: 1;
      margin: 0 !important;
    }

    div {
      width: 1.6rem;

      img {
        width: 1.6rem;
        heighht: 1.6rem;
        margin: 0 !important;
      }
    }
  }
}
</style>

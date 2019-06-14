<template>
  <div class="wrapper">
    <div class="comment_top">
      <div class="comment_top_left iconfont icon-fanhui" @touchstart="back()"></div>
      <div class="comment_top_center">{{date.length+shortdate.length}} 条点评</div>
      <div class="comment_top_right iconfont icon-edit"></div>
    </div>
    <p class="num">{{date.length}}条长评</p>
    <div class="sofa" v-if="date.length==0?true:false">
      <!-- <img src="../common/pic/sofa.jpg" alt=""> -->
    </div>
    <!-- 循环 长评论-->
    <div class="comment_cont" v-for="(item,index) in date" :key="index">
      <div class="comment_cont_pic">
        <img :src="item.avatar">
      </div>
      <div class="comment_cont_main">
        <h3 class="clearfix">
          <span>{{item.author}}</span>
          <i class="iconfont icon-dianzan3">&nbsp;{{item.likes}}</i>
        </h3>
        <p>{{item.content}}</p>
        <span class="comment_cont_main_time">{{item.time|timeFilter02}}</span>
      </div>
    </div>
    <!-- 循环 段评论 -->
    <div class="short_wrap">
      <p @touchstart="show()" class="short">{{shortdate.length}}条短评</p>
      <div v-if="isShow">
        <!--  -->
        <div class="comment_cont" v-for="(item,index) in shortdate" :key="index">
          <div class="comment_cont_pic">
            <img :src="item.avatar">
          </div>
          <div class="comment_cont_main">
            <h3 class="clearfix">
              <span>{{item.author}}</span>
              <i class="iconfont icon-dianzan3">&nbsp;{{item.likes}}</i>
            </h3>
            <p>{{item.content}}</p>
            <span class="comment_cont_main_time">{{item.time|timeFilter02}}</span>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
export default {
  components: {},
  props: {},
  data() {
    return {
      date: [],
      shortdate: [],
      isShow: false
    };
  },
  watch: {},
  computed: {},
  methods: {
    back() {
      this.$router.replace("/details/" + this.$route.params.id);
    },
    show() {
      this.isShow = !this.isShow;
    },
    pic() {}
  },
  mounted() {
    //  /8997528/long-comments
    // /4232852/short-comments

    var id = this.$route.params.id;

    // 长评论
    this.$http({
      url: API.addNews + "/" + id + "/long-comments"
    }).then(d => {
      this.date = d.data.comments;
      console.log(this.date.length)
    });
    // 短评论
    this.$http({
      url: API.addNews + "/" + id + "/short-comments"
    }).then(s => {
      this.shortdate = s.data.comments;
      console.log(this.shortdate.length)
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.sofa {
  width: 100%;
  height: 9rem;
  background: url('../common/pic/sofa.jpg') center center;
  background-size: 100%;
  border-bottom .01rem solid #c3c3c3
}

.comment_top {
  width: 100%;
  height: 1rem;
  background: $mainColor;
  display: flex;
  line-height: 1rem;
  font-size: 0.4rem;
  color: white;

  .comment_top_left {
    width: 1rem;
    height: 1rem;
    font-size: 0.3rem;
    text-align: center;
  }

  .comment_top_center {
    padding-left: 0.3rem;
    line-height 1rem
    flex: 1;
  }

  .comment_top_right {
    width: 1rem;
    hieght: 1rem;
    font-size: 0.4rem;
    text-align: center;
  }
}

.num {
  // width: 100%;
  height: 0.8rem;
  padding: 0 0.2rem;
  line-height: 0.8rem;
  margin: 0 auto;
  font-size: 0.3rem;
  border-bottom: 1px solid #c3c3c3;
}

.comment_cont {
  display: flex;
  border-bottom: 1px solid #c3c3c3;
  padding: 0.2rem;

  .comment_cont_pic {
    width: 1rem;
    text-align: center;

    img {
      width: 0.6rem;
      height: 0.6rem;
      border-radius: 0.3rem;
    }
  }

  .comment_cont_main {
    flex: 1;

    h3 {
      height: 0.5rem;
      line-height: 0.5rem;

      span {
        float: left;
        font-size: 0.3rem;
        color: #000;
        font-weight: bold;
      }

      i {
        float: right;
        font-size: 0.2rem;
        color: $grayColor;
      }
    }

    p {
      font-size: 0.3rem;
      color: #000;
      line-height: 0.4rem;
      padding-bottom: 0.2rem;
    }

    .comment_cont_main_time {
      font-size: 0.2rem;
      color: #c3c3c3;
    }
  }
}

.short_wrap {
  .short {
    // width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #000;
    padding: 0 0.2rem;
    border-bottom: 1px solid #c3c3c3;
    margin 0 !important
  }
}
</style>

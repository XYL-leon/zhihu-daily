<template>
  <div class="wrapper">
    <div>我是标题002</div>
    <!-- 分享弹框 -->
    <div v-if="isShow" class="share_wrap" @click="hide()">
      <div class="share clearfix">
        <p>分享</p>
        <ul>
          <li>
            <p class="iconfont icon-weibo"></p>
            <span>新浪微博</span>
          </li>
          <li>
            <p class="iconfont icon-weixindenglu"></p>
            <span>微信</span>
          </li>
          <li>
            <p class="iconfont icon-pengyouquan"></p>
            <span>朋友圈</span>
          </li>
          <li>
            <p class="iconfont icon-fenxiang_yinxiangbiji"></p>
            <span>印象笔记</span>
          </li>
          <li>
            <p class="iconfont icon-youdaoyunbiji"></p>
            <span>有道云笔记</span>
          </li>
          <li>
            <p class="iconfont icon-qq"></p>
            <span>QQ</span>
          </li>
          <li>
            <p class="iconfont icon-gengduo"></p>
            <span>更多平台</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 蓝色导航 -->
    <div class="details_top clearfix">
      <div class="details_top_back iconfont icon-fanhui" @touchstart="back()"></div>
      <ul class="details_top_menu">
        <!-- 分享 -->

        <li @touchstart="share()" class="iconfont icon-fenxiang"></li>
        <li
          :class="[iscollect?'iconfont icon-shoucang color':'iconfont icon-shoucang']"
          :iscollect="iscollect"
          @touchstart="color()"
        ></li>
        <li class="iconfont icon-pinglun" @touchstart="toComment()">&nbsp;<span>{{mes.comments}}</span>
        </li>
        <li class="iconfont icon-dianzan3">&nbsp;<span>{{mes.popularity}}</span>
        </li>
      </ul>
    </div>
    <!-- pic -->
    <div class="details_pic">
      <!-- <img src="http://pic43.nipic.com/20140702/3822951_125854430000_2.jpg" alt=""> -->
      <img :src="contents.image" alt>
      <p class="details_pic_tit">{{contents.title}}</p>
    </div>

    <!-- content -->
    <div class="details_cont">
      <div class="details_content">
        <div v-html="contents.body">{{contents.body}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";

// 分割线
export default {
  components: {},
  props: {},
  data() {
    return {
      iscollect: false,
      title: "",
      img: "",

      contents: [],
      idx: "",
      mes: [],
      isShow: false,
      classN: "iconfont icon-shoucang"
    };
  },
  watch: {},
  computed: {},
  methods: {
    color() {
      // if (this.classN == "iconfont icon-shoucang color") {
      //   this.classN = "iconfont icon-shoucang";
      // } else {
      //   this.classN = "iconfont icon-shoucang color";
      // }

      var arr = localStorage.getItem("arr")
        ? JSON.parse(localStorage.getItem("arr"))
        : [];

      if (arr.some(item => item.id == this.$route.params.id)) {
        this.iscollect = false;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == this.$route.params.id) {
            arr.splice(i, 1);
            break;
          }
        }
      } else {
        this.iscollect = true;
        arr.push({
          title: this.title,
          images: this.img,
          id: this.$route.params.id
        });
      }
      localStorage.setItem("arr", JSON.stringify(arr));
    },
    share() {
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },

    back() {
      this.$router.go(-1);
    },
    toComment() {
      var id = this.$route.params.id;
      this.$router.replace("/comment/" + id);
    }
  },
  mounted() {
    alert('686868')
    console.log('新增002')
    console.log('新增002')
    console.log('新增002')
    console.log('新增002')
    console.log('新增002')
    // 一进来就判断是否收藏了
    var arr = localStorage.getItem("arr")
      ? JSON.parse(localStorage.getItem("arr"))
      : [];
    if (arr.some(item => item.id == this.$route.params.id)) {
      this.iscollect = true;
    } else {
      this.iscollect = false;
    }
    // ----------------
    var id = this.$route.params.id;

    this.$http({
      url: API.obtain + id
    }).then(d => {
      this.title = d.data.title;
      this.img = d.data.images[0];

      this.contents = d.data;
      // var link = document.createElement("link");
      // // console.log(d);
      // link.href = this.contents.css;
      // link.rel = "stylesheet";
      // document.body.insertBefore(link, document.body.firstChild);
    });

    // 请求新闻额外消息
    this.$http({
      url: API.addmes + "/" + id
    }).then(d => {
      this.mes = d.data;
    });
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.color {
  color: yellow;
}

.share {
  width: 70%;
  height: 50%;
  background: white;
  margin: 40% auto;
  padding: 0.3rem;

  p {
    margin: 0 !important;
    font-size: 0.3rem;
    font-weight: bold;
    padding: 0.15rem 0;
  }

  li {
    float: left;
    width: 33.333%;
    text-align: center;

    p {
      font-size: 1rem;
    }

    .icon-weibo {
      color: red;
    }

    .icon-pengyouquan {
      color: #72CF28;
    }

    .icon-weixindenglu {
      color: #60C84D;
    }

    .icon-fenxiang_yinxiangbiji {
      color: #5AB53E;
    }

    .icon-youdaoyunbiji {
      color: #30A1ED;
    }

    .icon-qq {
      color: #216AC6;
    }

    .icon-gengduo {
      color: #7F7F7F;
    }

    span {
      color: gray;
      // background #5AB53E
    }
  }
}

.wrapper >>> .share_wrap {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  // background red
  background: rgba(0, 0, 0, 0.4);
}

html, body {
  width: 100%;
  height: 100vh;
}

.details_cont >>> .headline {
  width: 0;
  height: 0;
}

// 
.details_top {
  width: 100%;
  height: 1rem;
  overflow: hidden;
  background: $mainColor;

  .details_top_back {
    float: left;
    width: 1rem;
    hiehgt: 1rem;
    color: white;
    font-size: 0.3rem;
    line-height: 1rem;
    text-align: center;
  }

  .details_top_menu {
    float: right;
    width: 78%;
    heihgt: 1rem;
    display: flex;
    line-height: 1rem;
    text-align: center;
    color: white;

    li {
      flex: 1;
      display: inline-block;
      font-size: 0.4rem;
    }

    .icon-pinglun, .icon-dianzan3 {
      span {
        font-size: 0.3rem;
        text-align: left;
      }
    }
  }
}

.details_pic {
  width: 100%;
  height: 4rem;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 4rem;
  }

  .details_pic_tit {
    margin: 0 !important;
    position: absolute;
    left: 0;
    bottom: 0.4rem;
    color: white;
    font-size: 0.4rem;
    padding: 0 0.3rem;
  }
}

.details_cont_tit {
  width: 100%;
  height: 1rem;
  line-height: 1rem;

  img {
    width;
    heihgt;
  }
}
</style>

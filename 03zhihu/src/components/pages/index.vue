<template>
  <div class="wrapper">
    <div class="nav">
      <div class="nav_left iconfont icon-gengduocaidanxianxing" @touchstart="show()"></div>
      <div class="nav_main">{{name}}</div>
      <div class="nav_right">
        <div class="nav_l iconfont icon-gonggaotongzhi"></div>
        <div class="nav_r iconfont icon-gengduozhanshi"></div>
      </div>
    </div>
    <div class="banner">
      <mt-swipe :auto="2000">
        <mt-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.image" v-on:click="toDetails(item.id)">
          <p class="banner_tit" v-on:click="toDetails(item.id)">{{item.title}}</p>
        </mt-swipe-item>
      </mt-swipe>
    </div>

    <!-- 内容分割线 -->
    <div
      class="content"
      id="content"
      v-for="(item,index) in mes"
      :key="index"
    >
      <h2 class="cont_tit">{{item.title}}</h2>
      <ul class="cont_list">
        <!--  -->
        <li v-on:click="toDetails(subItem.id)" v-for="(subItem,i) in item.data" :key="i">
          <p>{{subItem.title}}</p>
          <div>
            <img :src="subItem.images">
          </div>
        </li>
      </ul>
    </div>
    <!-- 内容分割线  -->
    <!-- 右滑显示 -->
    <transition name="menu1">
      <div :class="classN" v-if="isShow" @touchstart.self.prevent="hide()">
        <div class="menu_left">
          <div class="menu_top">
            <div class="menu_mes">
              <span class="mes_pic">
                <img
                  src="http://m.360buyimg.com/pop/jfs/t23434/230/1763906670/10667/55866a07/5b697898N78cd1466.jpg"
                  alt
                >
              </span>
              <span>请登录</span>
            </div>
            <div class="menu_menu">
              <p @touchstart.prevent="tocollect()">
                <span class="iconfont icon-shoucang"></span>
                <i>我的收藏</i>
              </p>
              <p>
                <span class="iconfont icon-download-img"></span>
                <i>离线下载</i>
              </p>
            </div>
          </div>
          <div class="menu_tit">
            <span class="iconfont icon-shouye4"></span>
            <i>首页</i>
          </div>
          <div class="menu_cont"></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
import API from "../../common/js/API";
import { Swipe, SwipeItem } from "mint-ui";
Date.prototype.getWeek = function() {
  var arr = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  var day = this.getDay();
  return arr[day];
};
var aaa = true;
if(aaa == false){
  alert('888')
}
console.log('哈哈哈');
console.log('嘻嘻嘻');
// 获取时间
function getDate(num) {
  var date = new Date().getTime();
  //1 params=20190610 title=06月09日 星期日

  var newDate = new Date(date - (num - 1) * 24 * 60 * 60 * 1000);

  var year1 = newDate.getFullYear();
  var month1 =
    newDate.getMonth() + 1 < 10
      ? "0" + (newDate.getMonth() + 1)
      : newDate.getMonth() + 1;
  var day1 =
    newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();
  var params = year1 + "" + month1 + "" + day1;
  // title
  var newDate2 = new Date(date - num * 24 * 60 * 60 * 1000);
  var month2 =
    newDate2.getMonth() + 1 < 10
      ? "0" + (newDate2.getMonth() + 1)
      : newDate2.getMonth() + 1;
  var day2 =
    newDate2.getDate() < 10 ? "0" + newDate2.getDate() : newDate2.getDate();
  var week = newDate2.getWeek();
  var title = month2 + "月" + day2 + "日" + " " + week;
  return {
    params: params,
    title: title
  };
}
var num =0;
// ------------------------------
export default {
  components: {
    Swipe,
    SwipeItem
  },
  props: {},
  data() {
    return {
      name:'首页',
      classN: "menu",
      isShow: false,
      banner: [],
      startX: 0,
      endX: 0,
      mes: [],
      isload: true
    };
  },
  watch: {},
  computed: {},
  methods: {
    getNewData() {
      if (this.isload) {
        this.isload = false;
        num++;
        this.$http({
          url: API.PreviousNerws + getDate(num).params
        }).then(d => {
          this.isload = true;
          this.mes.push({
            title: getDate(num).title,
            data: d.data.stories
          });
        });
      }
    },

    toDetails(id) {
      // console.log(id)
      this.$router.push("/details/" + id);
    },
    tocollect() {
      this.$router.push("/collect");
    },

    // 通过点击菜单显示弹框
    show() {
      this.isShow = !this.isShow;
      this.classN = "menu show";
      // 实现点击显示左侧菜单之后就不能上下滚动
      document.documentElement.style.position = "fixed";
      document.body.style.overflow = "hidden"; //隐藏滚动条
    },
    hide() {
      this.classN = "menu";
      document.documentElement.style.position = "static";
      document.body.style.overflow = "";
    }
  },
  mounted() {
    // 发动第一次请求
    this.$http({
      url: API.news
    }).then(d => {
      this.banner = d.data.top_stories;
    });

    // ----------------
    this.$http({
      url: API.news
    }).then(z => {
      this.mes.push({
        title: "今日新闻",
        data: z.data.stories
      });
      this.getNewData();
    });

    var that = this;
    // 滑到底部时发动又一次请求
    window.onscroll = function() {
      //窗口的高度
      var wh =
        document.documentElement.clientHeight || document.body.clientHeight;
      // 上卷的高度
      var st = document.documentElement.scrollTop || document.body.scrollTop;
      // 文档高度
      var dh =
        document.documentElement.offsetHeight || document.body.offsetHeight;
      // 判断是否满足滑到文档底部
      if (wh + st + 30 >= dh) {
        // console.log('到底了')
        that.getNewData();
      } else {
        // console.log('离开了')
      }

      // 改变底部
      if (st < 180) {
        that.name = "首页";
        that.$emit("change", that.name);
        // console.log(that.name)
      } else {
        var times = document.querySelectorAll(".cont_tit");
        // console.log(times)
        for (var i = 0; i < times.length; i++) {
          if (times[i].getBoundingClientRect().top + st < st + wh) {
            that.name = times[i].innerHTML;
          }
        }
      }
    };
  }
};
</script>
<style lang='stylus' scoped>
@import '../../common/stylus/index.styl';

.wrapper >>> .mint-swipe-indicator {
  opacity: 0.6;
}

body {
  overflow: hidden;
}

.nav {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 10;
  background: $mainColor;
  height: 1rem;
  width: 100%;
  font-size: 0.4rem;
  line-height: 1rem;
  display: flex;

  .nav_left {
    width: 1.2rem;
    height: 1rem;
    text-align: center;
    color: white;
    font-size: 0.4rem;
  }

  .nav_main {
    flex: 1;
    color: $whiteColor;
    padding-left: 0.2rem;
    font-size: 0.33rem;
  }

  .nav_right {
    width: 30%;
    height: 1rem;
    display: flex;
    color: white;

    .nav_l {
      flex: 1;
      font-size: 0.4rem;
    }

    .nav_r {
      flex: 1;
      font-size: 0.5rem;
    }
  }
}

.banner {
  width: 100%;
  height: 4rem;
  position: relative;
  margin-top: 1rem;

  img {
    width: 100%;
    height: 4rem;
  }
}

.banner_tit {
  padding: 0 0.4rem 0.5rem;
  margin: 0 !important;
  position: absolute;
  left: 0;
  bottom: 0;
  font-size: 0.4rem;
  color: white;
  // text-align
}

.cont_list {
  li {
    display: flex;
    padding: 0.2rem;

    p {
      flex: 1;
    }

    div {
      width: 1.6rem;

      img {
        width: 1.6rem;
        heighht: 1.6rem;
      }
    }
  }
}

html, body, .menu {
  width: 100%;
  height: 100%;
}

.show {
  left: 0 !important;
  overflow: hidden;
}

.menu {
  // margin-left: -100%;
  position: fixed;
  left: -100%;
  top: 0;
  z-index: 10;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.4);

  .menu_left {
    width: 80%;
    background: white;
    height: 100vh;

    .menu_top {
      height: 2rem;
      background: $mainColor;

      .menu_mes {
        padding-top: 0.2rem;
        height: 0.8rem;
        span {
          line-height: 0.7rem;
          font-size: 0.3rem;
          color: white;
        }

        .mes_pic {
          vertical-align: middle;
          display: inline-block;
          width: 0.7rem;
          height: 0.7rem;
          border-radius: 0.35rem;
          overflow: hidden;
          margin-left: 0.2rem;
          margin-right: 0.2rem;
          line-height: 0.7rem;

          img {
            width: 0.7rem;
            height: 0.7rem;
          }
        }
      }
    }

    .menu_menu {
      color: white;
      height: 1rem;
      display: flex;
      line-height: 1rem;
      font-size: 0.2rem;

      p {
        flex: 1;
        margin: 0 !important;

        span {
          display: inline-block;
          width: 1rem;
          height: 1rem;
          text-align: center;
        }
      }
    }

    .menu_tit {
      height: 1rem;
      background: $gwColor;
      color: $mainColor;
      line-height: 1rem;
      font-size: 0.3rem;

      span {
        width: 1rem;
        hiehgt: 1rem;
        font-size: 0.4rem;
        text-align: center;
        display: inline-block;
      }
    }

    .menu_cont {
      background: white;
    }
  }
}

// ---------------------
.content {
  background: $gwColor;
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
      margin-bottom: 0.2rem;
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

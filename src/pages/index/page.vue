<template>
  <d2-container class="page">
<!--    <d2-page-cover
        title="Music Recommendation System"
      sub-title="基于微服务架构的音乐推荐系统">
      <d2-icon-svg
        class="page__logo"
        name="d2-admin"/>



&lt;!&ndash;      <template slot="footer">&ndash;&gt;
&lt;!&ndash;        <div class="page__btn-group">&ndash;&gt;
&lt;!&ndash;          <span @click="$open('https://github.com/wxiaoqi/Spring-Cloud-Platform')">Github</span>&ndash;&gt;
&lt;!&ndash;        </div>&ndash;&gt;
&lt;!&ndash;      </template>&ndash;&gt;
    </d2-page-cover>-->


<!--      &lt;!&ndash;轮播图1&ndash;&gt;
      <div class="index">
      &lt;!&ndash; 跑马灯  &ndash;&gt;
      <div>
        <el-carousel :interval="4000" type="card" height="300px">
          <el-carousel-item v-for="item in imgList" :key="item.id">
            <img :src="item.idView" class="image">
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>-->


    <!--轮播图2-->
    <el-carousel class="swiper-container" type="card" height="175px" :interval="4000">
      <el-carousel-item v-for="item in imgList" :key="item.id">
        <img :src="item.idView" class="image">
      </el-carousel-item>
    </el-carousel>

    <!-- 个性推荐 -->
    <div class="recommend">
      <m-recommend></m-recommend>
    </div>

    <!-- 个性推荐 -->
<!--    <div class="recommend">
      <m-recommend></m-recommend>
    </div>-->


  </d2-container>



</template>

<script>
import { mapState } from 'vuex'
import Recommend from '@/components/music/Recommend.vue'

export default {
  computed: {
    ...mapState('d2admin/releases', [
      'version'
    ])
  },
  name: 'index',
  data(){
    return {
      imgList: [
/*        //image中的url，当为当前项目的静态文件时，在本项目下的静态图片。
        {id:0,idView:'./static/image/monster/dog.jpg'},
        //为动态路径时
        {id:0,idView:require("@/assets/images/fk.jpg")},
        */
        // {id:0,idView:require('@/assets/swiper/swiper0.jpg')},
        // {id:1,idView:require('@/assets/swiper/swiper1.jpg')},
        // {id:2,idView:require('@/assets/swiper/swiper2.jpg')},
        // {id:3,idView:require('@/assets/swiper/swiper3.jpg')}

        {id:0,idView: 'http://p1.music.126.net/g5s2lovhPHitl2rg5y-UMg==/109951167220990974.jpg?imageView&quality=89'},
        {id:1,idView: 'http://p1.music.126.net/QW62pPFBnh3TkUmJsCYROw==/109951167217511960.jpg?imageView&quality=89'},
        {id:2,idView: 'http://p1.music.126.net/mr1OpWpgauqgAGvP5-wesg==/109951167217987524.jpg?imageView&quality=89'},
        {id:3,idView: 'http://p1.music.126.net/pm0sIEB8GKP0VZcxNMh_DQ==/109951167217521773.jpg?imageView&quality=89'}
      ],
      songList : [], // 歌单列表
      singerList : [] // 歌手列表
    };
  },
  components: {
    'm-recommend': Recommend,
    // 'm-newmusic': NewSongs
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/public.scss';
.page {
  .page__logo {
    width: 120px;
  }
  .page__btn-group {
    color: $color-text-placehoder;
    font-size: 12px;
    margin-top: -10px;
    margin-bottom: 20px;
    span {
      color: $color-text-sub;
      &:hover {
        color: $color-text-main;
      }
    }
  }
}

/*轮播图1*/
 .index{
   background: #c8cfd8;
   width: 90%;
   text-align: center;
   //margin-left: 60px;
   margin-left: 5%;
   //width: 80.6%;

 }
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

/*轮播图2*/
.swiper-container {
  width: 90%;
  margin: auto;
  //padding-top: 100px;
  img {
    width: 100%;
  }
}

.swiper-container:deep(.el-carousel__indicators.el-carousel__indicators--outside) {
  display: inline-block;
  transform: translateX(30vw);
}

.section {
  width: 100%;
  margin-top: 20px;
  padding: 0 8% 20px 8%;;
  background-color: #ffffff;
  box-sizing: border-box;
}

</style>

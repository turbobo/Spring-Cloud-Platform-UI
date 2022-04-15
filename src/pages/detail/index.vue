<template>
  <d2-container>
    <el-card shadow="never">
      <div class="box">
        <div class="left">
          <el-image :src="songVo.albumPic" @error.once="topSrcError(item, i)">
            <div slot="placeholder">
              <i class="el-icon-picture-outline" style="font-size:162.5px;color:#f1f1f1"></i>
            </div>
          </el-image>
        </div>
        <div class="right">
          <el-descriptions class="margin-top" :title="songVo.title" :column="4" direction="vertical" :colon="false"
                           style="font-size: 18px;"
                           :labelStyle="{'color': '#f56c6c','font-size':'14px','font-weight':'500'} "
                           :contentStyle="{'font-size':'15px','font-weight':'600'}">
            <el-descriptions-item label="艺术家" >{{songVo.artistName}}</el-descriptions-item>
            <el-descriptions-item label="时长">{{durationFormatter(songVo.duration)}}</el-descriptions-item>
            <el-descriptions-item label="专辑" :span="2">{{songVo.release}}</el-descriptions-item>
            <el-descriptions-item label="发布日期">{{songVo.publicTime}}</el-descriptions-item>
            <el-descriptions-item label="播放量">{{songVo.playcount}}</el-descriptions-item>
            <el-descriptions-item label="听众数量">{{songVo.listeners}}</el-descriptions-item>

          </el-descriptions>

      </div>
      </div>

    </el-card>

    <!--相似推荐-->
    <div class="">
      <ul class="">
        <li>相关歌曲</li>
      </ul>
    </div>
    <div class="disc-box" style="height:100px;">
      <el-row :gutter="30">
        <el-col :span="6" v-for="(item,i) in similarList" :key="i" class="disc-box-item">
          <el-card shadow="never">
<!--            <el-image :src="item.albumPic" @error.once="topSrcError(item, i)" @click="linksongsDisc(item.id)">-->
            <template slot-scope="scope">
              <el-image :src="item.albumPic"  @error.once="similarImgSrcError(item, i)">
                <div slot="placeholder">
                  <i class="el-icon-picture-outline" style="font-size:162.5px;color:#f1f1f1"></i>
                </div>
              </el-image>
            </template>
          </el-card>
          <div class="recommend-name">
            <span >{{item.title}}</span>
            <br />
            <span class="author">{{item.artistName}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
  </d2-container>
</template>

<script>
import {GetSimilarListBootJs} from "@/api/admin/music";
import axios from "axios";

export default {
  name: 'detail',
  data() {
    return {
      songVo: this.$route.params,
      similarList: [],
      // listLoading: true,
    }
  },
  created() {
    // debugger
    this.getSimilarListBoot();
    // console.log(this.songVo);
  },
  methods: {
    async getSimilarList() {
      // console.log("this.songVo");
      // console.log(this.songVo);
      let loading = this.$loading({
        lock: true,//lock的修改符--默认是false
        text: "加载中，请稍候...",//显示在加载图标下方的加载文案
        background: "rgba(0,0,0,0.8)",//遮罩层颜色
        spinner: "el-icon-loading",//自定义加载图标类名
      });
      // then异步执行
      await axios.get('http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&artist='+ this.songVo.artistName + '&track=' + this.songVo.title + '&api_key=7537459f592d916b49e697b8a0fb53df&format=json')
          .then(async (success) => {
            debugger
            if (success.data.similartracks.track.length == 0) {
              //未找到相似歌曲，则查找该艺术家的热门歌曲
              await axios.get('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist='+ this.songVo.artistName + '&api_key=7537459f592d916b49e697b8a0fb53df&format=json')
                  .then(async function (success) {
                    // debugger
                    var similarSongs = success.data.toptracks.track.slice(0, 5);
                    for (var i = 0; i < 5; i++) {
                      var tempObj = {};
                      var songTemp2 = similarSongs[i];
                      tempObj.title = songTemp2.name;
                      tempObj.artistName = songTemp2.artist.name;
                      // var title = URLEncoder.encode(tempObj.title, "utf-8");
                      await axios.get("/qq/client_search_cp?p=1&n=10&w=" + tempObj.title + "&format=json&t=8", { // 这里会匹配到前面我们设置的/proxy，代替为https://www.tianqiapi.com
                        // params: {
                        //   version: 'v6',
                        //   cityid: XXX,
                        //   appid: XXX,
                        //   appsecret: 'XXX'
                        // }
                      }).then(async function (success) {
                        var songList3 = success.data.data.album.list
                        if (songList3.length == 0) {
                          tempObj.albumPic = require('@/assets/logo/MusicRec.png')
                        } else {
                          tempObj.albumPic = songList3[0].albumPic
                        }
                      }).catch(function (error) {
                        console.log(error)
                      })
                      this.similarList.push(tempObj);
                    }
                  }).catch(function (error) {
                  console.log(error)
                })
            } else {
              var similarSongs = success.data.similartracks.track.slice(0, 5);
              for (var i = 0; i < 5; i++) {
                var tempObj = {};
                var songTemp2 = similarSongs[i];
                tempObj.title = songTemp2.name;
                tempObj.artistName = songTemp2.artist.name;
                // var title = URLEncoder.encode(tempObj.title, "utf-8");
                await axios.get("/qq/client_search_cp?p=1&n=10&w=" + tempObj.title + "&format=json&t=8", { // 这里会匹配到前面我们设置的/proxy，代替为https://www.tianqiapi.com
                  // params: {
                  //   version: 'v6',
                  //   cityid: XXX,
                  //   appid: XXX,
                  //   appsecret: 'XXX'
                  // }
                }).then(function (success) {
                  var songList3 = success.data.data.album.list
                  if (songList3.length == 0) {
                    tempObj.albumPic = require('@/assets/logo/MusicRec.png')
                  } else {
                    tempObj.albumPic = songList3[0].albumPic
                  }
                }).catch(function (error) {
                  console.log(error)
                })
                this.similarList.push(tempObj);
              }
            }
          }, (error) => {
            console.log(error);
          })
        // this.similarList = response.rows.slice(0,5)
        loading.close();
      // });
    },

    // 后台获取热门歌曲
    async getSimilarListBoot() {
      // 开始加载
      let loading = this.$loading({
        lock: true,//lock的修改符--默认是false
        text: "加载中，请稍候...",//显示在加载图标下方的加载文案
        background: "rgba(0,0,0,0.8)",//遮罩层颜色
        spinner: "el-icon-loading",//自定义加载图标类名
      });
      GetSimilarListBootJs(this.songVo)
          .then(response => {
            // console.log("GetTopSongList***********")
            // console.log(response)
            this.similarList = response.rows.slice(0,5)
            loading.close();
          })
    },

    similarImgSrcError(item, index) {
      //没有图片，加载系统图片
      this.$set(this.similarList[index], "albumPic", require('@/assets/logo/MusicRec.png'))
    },
    goDetailPage(row) {
      debugger
      this.$router.push({
        name: 'detail',
        params: row,
      })
    },

    /**
     * 将秒转换为 分:秒
     * s int 秒数
     * 不需要 async修饰
     */
    durationFormatter(duration) {
      if (duration != null && duration != "") {
        //计算分钟
        //算法：将秒数除以60，然后下舍入，既得到分钟数
        var sec = duration;
        var h;
        h = Math.floor(sec / 60);
        //计算秒
        //算法：取得秒%60的余数，既得到秒数
        sec = sec % 60;
        //将变量转换为字符串
        h += '';
        sec += '';
        //如果只有一位数，前面增加一个0
        h = (h.length == 1) ? '0' + h : h;
        sec = (sec.length == 1) ? '0' + sec : sec;
        return h + ':' + sec;
      }
      return "未知";
    },

  },

}
</script>

<style lang="scss" scoped>
.el-image {
  cursor: default !important;
}
.el-card {
  border: none;
}
.box {
  height: 190px;
  width: 98%;
  margin: 0 auto;
  display: flex;
  .left {
    max-width: 190px;
    min-width: 190px;
    justify-content: center;
    flex: 1;
    display: flex;
    align-items: center;
    cursor: pointer;
    .left-box {
      height: 140px;
      width: 140px;
      border-radius: 4px;
      align-items: center;
      display: flex;
      justify-content: center;
      flex-direction: column;
      background-size: 100% 100%;
      position: relative;
      i {
        font-style: normal;
        font-size: 12px;
        color: #fff;
        position: absolute;
        bottom: 25px;
      }
    }
  }
  .right {
    margin-top: 4px;
    margin-left: 28px;
    flex: 1;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    .right-table {
      margin-top: 20px;
      width: 100%;
      height: 150px;
    }
    .right-table::before {
      width: 0 !important;
    }
    .right-more {
      position: absolute;
      bottom: -5px;
      left: 0;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.7);
      height: 32px;
      line-height: 32px;
      cursor: pointer;
      i {
        margin-left: 5px;
      }
    }
    .right-more:hover {
      text-decoration: underline;
    }
  }


}
.disc-box {
  padding: 0px 30px 0 20px;
  box-sizing: border-box;
  .el-image:hover{cursor: pointer;}
  .main-page {
    width: 350px;
    margin: 0 auto;
    height: 50px;
    padding: 10px 0;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .disc-box-item {
    height: 240px;
  }
  .recommend-name {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10%;   //歌名、作者往左移动
    //span:hover {cursor: pointer;}  //歌名、作者不可点击
    .author {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
    }
    //作者不可点击
    //.author:hover {
    //  color: rgba(0, 0, 0, 0.9);
    //  cursor: pointer;
    //}
  }
  //自定义
  .el-col-6 {
    width: 20%;
  }
  //.d2-layout-header-aside-group .d2-layout-header-aside-content .d2-theme-container .d2-theme-container-main .d2-theme-container-main-body .container-component .d2-container-full .d2-container-full__body {
  //  padding: 20px 50px;
  //}
}
/*.my-label{
  font-size: 24px;
  font-weight: 700;
  color: #666060;

}
.my-content{
  color: #f56c6c;
}*/
.el-descriptions {
  color: #606266 !important;
}
.el-descriptions__title {
  font-size: 26px !important;
  font-weight: 700 !important;;
}
ul{
  list-style: none;
  color: rgba(0, 0, 0, 0.6);
  /*:hover {
    color: rgba(0, 0, 0, 0.9);
    color: #0969da;
    cursor: pointer;
    }*/
}
</style>
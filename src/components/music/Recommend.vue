<template>
  <div>
    <!--个性推荐-->
    <div class="">
      <ul class="" >
        <li>个性推荐<span @click="goPersonalizedRec" class="songMore">查看更多>></span></li>
<!--        <li
            v-for="(item,i) in typeList"
            :key="i"
            :class="listIndex === i ? 'select' : ''"
            @click="listchange(i)"
        >{{item.name}}</li>-->
      </ul>
    </div>
    <div class="disc-box" style="height:100px;">
      <el-row :gutter="30">
        <el-col :span="6" v-for="(item,i) in personalizedList" :key="i" class="disc-box-item">
          <el-card shadow="never">
            <el-image :src="item.albumPic" @error.once="personnalizedSrcError(item, i)" @click="linksongsDisc(item.id)">
              <div slot="placeholder">
                <i class="el-icon-picture-outline" style="font-size:162.5px;color:#f1f1f1"></i>
              </div>
            </el-image>
          </el-card>
          <div class="recommend-name">
            <span>{{item.title}}</span>
            <br />
            <span class="author">{{item.artistName}}</span>
          </div>
        </el-col>
      </el-row>

<!--      页码-->
<!--      <div class="main-page">
        <el-pagination
            @current-change="handleCurrentChange"
            :current-page="(queryData.offset/queryData.limit) + 1"
            :page-size="queryData.limit"
            layout="total, prev, pager, next"
            :total="total"
            background
            :small="true"
        ></el-pagination>
      </div>-->
    </div>

    <!--热门推荐-->
    <div class="">
      <ul class="">
        <li>热门推荐<span @click="goTopRec" class="songMore">查看更多>></span></li>
      </ul>
    </div>
    <div class="disc-box" style="height:100px;">
      <el-row :gutter="30">
        <el-col :span="6" v-for="(item,i) in topList" :key="i" class="disc-box-item">
          <el-card shadow="never">
            <el-image :src="item.albumPic" @error.once="topSrcError(item, i)" @click="linksongsDisc(item.id)">
              <div slot="placeholder">
                <i class="el-icon-picture-outline" style="font-size:162.5px;color:#f1f1f1"></i>
              </div>
            </el-image>
          </el-card>
          <div class="recommend-name">
            <span >{{item.title}}</span>
            <br />
            <span class="author">{{item.artistName}}</span>
          </div>
        </el-col>
      </el-row>

      <!--      页码-->
      <!--      <div class="main-page">
              <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="(queryData.offset/queryData.limit) + 1"
                  :page-size="queryData.limit"
                  layout="total, prev, pager, next"
                  :total="total"
                  background
                  :small="true"
              ></el-pagination>
            </div>-->
    </div>
  </div>
</template>

<script>
import {GetPersonalizedSongList,GetTopSongList} from "@/api/admin/music";
import axios from 'axios'

export default {
  data() {
    return {
      listIndex: 0,
      typeList: [
        { name: '个性推荐', type: 0 }
      ],
      personalizedList: [],
      queryData: {
        type: 0,
        offset: 0,
        limit: 8
      },
      total: 0,
      recommendData: [],

      // listIndex: 0,

      musiclist: [],
      topList: [],
      musicdata: [],
      queryNum: 10,
      scrollStatus: false,
      musicQuery: {
        page: 1,
        limit: 20,
      },
      listLoading: true,
    }
  },
  created() {
    // this.getRecommendData()
    // this.getMusicList()
    this.getPersonalizedList()
    // this.getTopList()
    this.getTopMusicList()
  },
  methods: {

    // ...mapActions("d2admin/account", ["getMusicList"]),
    // listchange(item) {
    //   this.listIndex = item
    //   this.queryData.type = this.typeList[item]
    //   this.getpersonalizedList()
    // },

    async getPersonalizedList() {
      // then异步执行
      await GetPersonalizedSongList().then(response => {
        response.rows.forEach(item => {
          axios.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=7537459f592d916b49e697b8a0fb53df&artist='+item.artistName+'&album='+item.release+'&format=json')
              .then((success) => {
                item.albumPic = success.data.album.image[2]['#text'];
                // console.log(success.image[2].text);
                // this.albumPicMap.set(item.id, success.data.album.image[2]['#text'])
              }, (error) => {
                console.log(error);
              })
        })
        this.personalizedList = response.rows
        // this.total = response.total
        // console.log("this.personalizedList");
        // console.log(this.personalizedList);
        // 遍历获取专辑封面
        // if (this.personalizedList != undefined){
        //   if (this.personalizedList.length != 0) {
        //   }
        // }
           /* this.personalizedList.forEach(item => {
              let query_release = item.release
              let query_artistName = item.artistName
              //查询图片
              // item.albumPic = this.getAlbumPic(query_release, query_artistName)
              // console.log("   ---"+this.getAlbumPic(query_release, query_artistName))
              // this.albumPicMap.set(item.trackId, this.getAlbumPic(query_release, query_artistName))
              //http://ws.audioscrobbler.com/2.0/?method=album.getinfo
              // &api_key=7537459f592d916b49e697b8a0fb53df&artist=Taylor Swift&album=Fearless&format=json
              // arrData.push(arr)

              axios.get('http://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=7537459f592d916b49e697b8a0fb53df&artist='+query_artistName+'&album='+query_release+'&format=json')
                  .then((success) => {
                    // item.albumPic = success.image[2].text;
                    // console.log(success.image[2].text);
                    this.albumPicMap.set(item.id, success.data.album.image[2]['#text'])
                  }, (error) => {
                    console.log(error);
                  })
            })*/
      });
    },

    //前端获取热门歌曲
    async getTopList() {
      // then异步执行  await同步执行
      await axios.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=7537459f592d916b49e697b8a0fb53df&format=json')
          .then(async (success) => {
            // console.log(success.data.tracks.track);
            // this.topList = success.data.tracks.track
            // this.total = 5;
            // console.log("lastfm---")
            // console.log(success)
            var tempAry = success.data.tracks.track;
            // console.log(tempAry.length)
            for (var i = 0; i < 5; i++) {
              var tempObj = {};
              tempObj.title = tempAry[i].name
              tempObj.artistName = tempAry[i].artist.name
              // tempObj.albumPic = tempAry[i].album.image[2]['#text']  //tempAry[i].image[2]['#text']
              //获取last.fm专辑图片  -- await同步请求
              await axios.get('http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=7537459f592d916b49e697b8a0fb53df&artist=' + tempObj.artistName + '&track=' + tempObj.title + '&format=json')
                  .then(async (success) => {
                    console.log("---album----")
                    console.log(success)
                    var loadQQImage = true;
                    // console.log(success.data.track.album.image[2]['#text'])
                    if (success.data.track != null) {
                      if (success.data.track.album != null) {
                        if (success.data.track.album.image != null) {
                          if (success.data.track.album.image[2]['#text'] != ''){
                            tempObj.albumPic = success.data.track.album.image[2]['#text'];
                            loadQQImage = false;
                          }
                        }
                      }
                    }
                    // debugger
                    //加载QQ图片
                    if (loadQQImage){
                      //没有专辑图片，请求QQ 接口：根据歌曲名搜索专辑
                      /*await axios({
                        url: "https://c.y.qq.com/soso/fcgi-bin/client_search_cp??client_search_cp?p=1&n=10&w="+tempObj.title+"&format=json&t=8",
                        baseURL: '',
                        method:'GET'
                      }).*/
                      // 1
                      /*await axios.get("https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n=10&w="+tempObj.title+"&format=json&t=8")
                      .then((success) => {
                            console.log(success)
                            //匹配歌手
                            var songList = success.data.list
                            for (var i = 0; i < 10; i++) {
                              if (tempObj.artistName == songList[i].singerName){
                                //匹配到则推出循环
                                tempObj.albumPic = songList[i].albumPic
                                break;
                              }
                              //匹配不到，则使用一张图片
                              if (i == 10){
                                tempObj.albumPic = songList[0].albumPic
                              }
                            }
                            //匹配不到歌手，就用第一张图片
                          }, (error) => {
                            console.log(error);
                          })*/
                      // 2
                      await axios.get("/qq/client_search_cp?p=1&n=10&w="+tempObj.title+"&format=json&t=8", { // 这里会匹配到前面我们设置的/proxy，代替为https://www.tianqiapi.com
                        // params: {
                        //   version: 'v6',
                        //   cityid: XXX,
                        //   appid: XXX,
                        //   appsecret: 'XXX'
                        // }
                      }).then(function (success) {
                        // console.log("qq--success")
                        // console.log(success)
                        //匹配歌手
                        var songList = success.data.data.album.list
                        // console.log("songList------")
                        // console.log(songList)
                        for (var i = 0; i < songList.length; i++) {
                          if (tempObj.artistName === songList[i].singerName){
                            //匹配到则推出循环
                            tempObj.albumPic = songList[i].albumPic
                            break;
                          }
                          //匹配不到，则使用一张图片：已经最后一张，还没break
                          if (i == songList.length){
                            tempObj.albumPic = songList[0].albumPic
                          }
                        }
                      }).catch(function (error) {
                        console.log(error)
                      })
                    }
                  }, (error) => {
                    console.log(error);
                  })
              // tempObj.albumPic = tempAry[i].image[2]['#text']
              console.log(tempObj)
              this.topList.push(tempObj)
              // console.log("this.topLis")
              // console.log(this.topList)
            }
          }, (error) => {
            console.log(error);
          })
    },

    // @error.once：图片项目error方法绑定once，为避免同一个失败链接无限触发error
    personnalizedSrcError(item, index) {
      // if (/^err/.test(this.personalizedList[index]["albumPic"])) {
      // this.$set(target, key, value)：target为需要添加属性的对象，key是要添加的属性名，value为属性key对应的值。
      this.$set(this.personalizedList[index], "albumPic", this.personalizedList[index]["albumPic"])
      // } else {
      //   // if (!this.errobj[item]) {
      //   //   this.errobj[item] = 1
      //   // } else {
      //   //   if (this.errobj[item] > 2) {
      //   //     return
      //   //   } else {
      //   //     this.errobj[item] += 1
      //   //   }
      //   // }
      //   // this.$set(this.personalizedList, index, 'err' + item)
      // }
    },

    topSrcError(item, index) {
      console.log("topSrcError")
      console.log(item)
      // if (/^err/.test(this.personalizedList[index]["albumPic"])) {
      // this.$set(target, key, value)：target为需要添加属性的对象，key是要添加的属性名，value为属性key对应的值。
      this.$set(this.topList[index], "albumPic", this.topList[index]["albumPic"])
      // } else {
      //   // if (!this.errobj[item]) {
      //   //   this.errobj[item] = 1
      //   // } else {
      //   //   if (this.errobj[item] > 2) {
      //   //     return
      //   //   } else {
      //   //     this.errobj[item] += 1
      //   //   }
      //   // }
      //   // this.$set(this.personalizedList, index, 'err' + item)
      // }
    },

/*    getRecommendData() {
      // const { data: res } = await this.$request.get('/personalized?limit=7')
      // this.recommendData = res.result
    },
    getSongList() {
      this.$router.push('songlist')
    },
    getPlayList(id) {
      window.sessionStorage.setItem('playListId', id)
      this.$router.push('playlist')
    },*/

    // async getMusicList() {
    /*getMusicList() {
      // then异步执行
      IndexGetMusicList().then(response => {
        // console.log(response.rows)
        this.musiclist = response.rows
        // res = response;
      });

    },*/

    //跳转个性推荐页面
    goPersonalizedRec() {
      //替换页面，无法退回之前页面
      this.$router.replace('/demo/page1')
    },
    goTopRec(){
      //替换页面，无法退回之前页面
      this.$router.replace('/demo/page2')
    },

    getArrayData(data, start, num) {
      const res = []
      const length =
          start + num - 1 > data.length ? data.length : start + num - 1
      for (var i = start - 1; i < length; i++) {
        res.push(data[i])
      }
      return res
    },

    // 后台获取热门歌曲
    async getTopMusicList() {
      // this.listLoading = true
      GetTopSongList()
          .then(response => {
            // console.log("GetTopSongList***********")
            // console.log(response)
            this.topList = response.rows.slice(0,5)
            // this.list = response.rows
            // this.total = response.total
            // this.listLoading = false
          })
    },
    handleCurrentChange(pagenum) {
      // this.queryData.offset = (pagenum - 1) * this.queryData.limit
      // this.getpersonalizedList()
    },

  },

}
</script>
<!--<style lang="less" scoped>-->
<style lang="scss" scoped>
.el-card {
  border: none;
}
.new-list {
  position: relative;
  height: 40px;
  line-height: 40px;
  .new-header-list {
    display: block;
    list-style-type: none;
    .select {
      font-weight: 600;
      color: #000;
    }
    li {
      float: left;
      margin-right: 15px;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      cursor: pointer;
    }
    li:hover {
      color: rgba(0, 0, 0, 0.9);
    }
  }
  .el-button {
    position: absolute;
    right: 20px;
    border-radius: 20px;
    top: 5px;
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

//.el-card__body {
//  padding: 0px;
//}
ul{
  list-style: none;
  color: rgba(0, 0, 0, 0.6);
  /*:hover {
    color: rgba(0, 0, 0, 0.9);
    color: #0969da;
    cursor: pointer;
    }*/
}
.songMore{
  font-size: 10px;
  padding-left: 10px;
  color: rgba(0, 0, 0, 0.6);
  //:hover {
  //  color: rgba(0, 0, 0, 0.9);
  //  color: #0969da;
  //  cursor: pointer;
  //}
}
.songMore:hover {
  color: rgba(0, 0, 0, 0.9);
  color: #0969da;
  cursor: pointer;
}
</style>

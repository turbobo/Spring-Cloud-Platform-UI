<template>
  <d2-container>
    <div>
      <!--    <div class="new-list">
            <ul class="new-header-list">
              <li
                  v-for="(item,i) in typeList"
                  :key="i"
                  :class="listIndex === i ? 'select' : ''"
                  @click="listchange(i)"
              >{{item.name}}</li>
            </ul>
            <el-button type="danger" size="mini" @click="playMusicAtonce(musiclist)">立即播放</el-button>
          </div>-->
      <div>
        <template>
          <el-table
              :data="topList.slice((currentPage - 1) * pageSize, currentPage * pageSize)"
              stripe
              style="width: 100%">
            <el-table-column
                type="index"
            >
              <template slot-scope="scope">
                {{ scope.$index + (currentPage - 1) * pageSize + 1 }}
              </template>
            </el-table-column>
            <el-table-column
                prop="title"
                label="歌曲名"
                width="250"
            >
            </el-table-column>
            <el-table-column
                prop="artistName"
                label="作者"
            >
            </el-table-column>
            <el-table-column
                prop="release"
                label="专辑"
                width="280"
            >
            </el-table-column>
            <el-table-column
                prop="duration"
                label="时长"
                :formatter="Formatter"
            >
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
              <template slot-scope="scope">
                <el-button class="handleDetail" @click="goDetailPage(scope.row)" type="text" size="small">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <div class="main-page">
          <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total,prev,pager,next"
              :total="topList.length" >
          </el-pagination>
        </div>

      </div>
    </div>
  </d2-container>
</template>

<script>
import axios from 'axios'

export default {
  //前端获取热门歌曲
  name: 'page2',
  created() {
    this.getTopList()
  },
  data() {
    return {
      // topList: [],
      currentPage: 1,  // 当前页码
      pageSize: 10,  // 每页显示的行数
      topList: [],  // 表格数据
    }
  },
  methods: {
    async getTopList() {
      // async异步执行  await或者不加修饰为同步执行
      await axios.get('http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=7537459f592d916b49e697b8a0fb53df&format=json')
          .then(async (success) => {
            // console.log(success.data.tracks.track);
            // this.topList = success.data.tracks.track
            this.total =success.data.tracks.track.length;
            var tempAry = success.data.tracks.track;
            for (var i = 0; i < tempAry.length; i++) {
              var tempObj = {};
              tempObj.title = tempAry[i].name
              tempObj.artistName = tempAry[i].artist.name
              // tempObj.artistName = tempAry[i].artist.name
              // tempObj.artistName = tempAry[i].artist.name
              // tempObj.albumPic = tempAry[i].album.image[2]['#text']  //tempAry[i].image[2]['#text']
              //获取qq专辑名称和时长 -- await同步请求
              await axios.get('/qq/client_search_cp?p=1&n=2&w=' + tempObj.title + '&format=json')
                  .then(async (success) => {
                    // console.log("---qq----")
                    // console.log(success)
                    //匹配歌手
                    if (success.data.data != null){
                      if (success.data.data.song != null){
                        var songList = success.data.data.song.list
                        // console.log("songList------")
                        // console.log(songList)
                        for (var i = 0; i < songList.length; i++) {  //匹配歌曲
                          for (var j = 0; j < songList[i].singer.length; j++) {  //匹配歌手
                            if (tempObj.artistName === songList[i].singer[j].name){
                              //匹配到则推出循环
                              tempObj.release = songList[i].albumname
                              tempObj.duration = songList[i].interval
                              break;
                            }
                          }
                          //匹配不到，则使用第一个专辑：已经最后一个，还没匹配到
                          if (i == songList.length-1){
                            tempObj.release = songList[0].albumname
                            tempObj.duration = songList[0].interval
                          }
                        }
                      }
                    }

                  }, (error) => {
                    console.log(error);
                  })
              // tempObj.albumPic = tempAry[i].image[2]['#text']
              // console.log(tempObj)
              this.topList.push(tempObj)
              // console.log("this.topLis")
              // console.log(this.topList)
            }
          }, (error) => {
            console.log(error);
          })
    },

    /**
     * 将秒转换为 分:秒
     * s int 秒数
     * 不需要 async修饰
     */
    Formatter(row) {
      if (row.duration != null && row.duration != ""){
        //计算分钟
        //算法：将秒数除以60，然后下舍入，既得到分钟数
        var sec = row.duration;
        var h;
        h  =   Math.floor(sec/60);
        //计算秒
        //算法：取得秒%60的余数，既得到秒数
        sec  =   sec % 60;
        //将变量转换为字符串
        h    +=    '';
        sec    +=    '';
        //如果只有一位数，前面增加一个0
        h  =   (h.length==1)?'0'+h:h;
        sec  =   (sec.length==1)?'0'+sec:sec;
        return h+':'+sec;
      }
      return ""
    },

    goDetailPage(row) {
      // 跳转到Goods.vue商品详情页面,name为Goods.vue页面路由配置里的的name属性
      this.$router.push({
        name:"detail",
        // query:{goodsId:this.goodsId}
      })
    },


    async getDiscList() {
      const { data: res } = await this.$request.get('/top/album', {
        params: this.queryData
      })
      this.discList = res.albums
      this.total = res.total
    },
    // handleCurrentChange(pagenum) {
    //   this.queryData.offset = (pagenum - 1) * this.queryData.limit
    //   this.getDiscList()
    // },
    // 页面切换方法
    handleCurrentChange(val) {
      this.currentPage = val;
    }
  },
}
</script>
<style lang="scss" scoped>
.music-img-title {
  display: flex;
  align-items: center;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  .el-image {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    margin-right: 10px;
  }
  span {
    display: inline-block;
    width: 180px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
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
.main-song-list {
  height: 420px;
  overflow: scroll;
}
.main-page {
  width: 350px;
  margin: 0 auto;
  height: 50px;
  padding: 10px 0;
  box-sizing: border-box;
  margin-bottom: 10px;
}

//.handleDetail:hover{
//  cursor: pointer;
//}
</style>


<!--<script>-->
<!--export default {-->
<!--  name: 'page2'-->
<!--}-->
<!--</script>-->

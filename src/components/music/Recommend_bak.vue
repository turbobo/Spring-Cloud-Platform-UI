<template>
  <div>
    <div class="home-header">个性推荐</div>
<!--    <el-row :gutter="16" style="padding:0 10px;">
      <el-col :span="6">
        <el-card shadow="never">
          <img
            src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3167851396,2438977824&fm=26&gp=0.jpg"
            @click="getSongList"
          />
          <i class="el-icon-video-play video-play-hover"></i>
        </el-card>
        <div class="recommend-name">
          <span @click="getSongList">每日歌曲推荐</span>
        </div>
      </el-col>
      <el-col :span="6" v-for="(item,i) in recommendData" :key="i">
        <el-card shadow="never">
          <img :src="item.picUrl" @click="getPlayList(item.id)" />
          <div class="playNum">
            <i class="el-icon-video-play"></i>
            <i>{{item.playCount}}次</i>
          </div>
          <i class="el-icon-video-play video-play-hover"></i>
        </el-card>
        <div class="recommend-name">
          <span @click="getPlayList(item.id)">{{item.name}}</span>
        </div>
      </el-col>
    </el-row>-->

    <div>
<!--      <div class="new-list">
        <ul class="new-header-list">
          <li
              v-for="(item,i) in typeList"
              :key="i"
              :class="listIndex === i ? 'select' : ''"
              @click="listchange(i)"
          >{{item.name}}</li>
        </ul>
&lt;!&ndash;        <el-button type="danger" size="mini" @click="playMusicAtonce(musiclist)">立即播放</el-button>&ndash;&gt;
      </div>-->
      <div
          class="main-song-list"
      >
        <el-table
            :data="musiclist"
            style="width: 100%;"
            :stripe="true"
            @row-click="getMusicUrl"
            :show-header="false"
        >
          <el-table-column type="index" width="60px"></el-table-column>
          <el-table-column prop="title" label="音乐标题">
            <template slot-scope="scoped">
              <div class="music-img-title">
                <el-image :src="scoped.row.pic">
                  <div slot="placeholder" class="image-slot">
                    <i class="el-icon-picture" style="font-size:50px;color:#f1f1f1"></i>
                  </div>
                </el-image>
                <span>{{scoped.row.title}}</span>
              </div>
            </template>
          </el-table-column>
<!--          <el-table-column prop="author" label="歌手" width="180">
            <template slot-scope="scope">
              <span v-for="(item,i) in scope.row.author" :key="i">{{item + ' '}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="album" label="专辑" width="180"></el-table-column>
          <el-table-column prop="time" label="时长" width="100"></el-table-column>-->
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import {IndexGetMusicList} from "@/api/sys/login";
import {mapActions} from "_vuex@3.6.2@vuex";

export default {
  data() {
    return {
      recommendData: [],

      listIndex: 0,

      musiclist: [],
      musicdata: [],
      queryNum: 10,
      scrollStatus: false,
      musicQuery: {
        page: 1,
        limit: 20,
      },
    }
  },
  created() {
    // this.getRecommendData()
    this.getMusicList()
  },
  methods: {
    // ...mapActions("d2admin/account", ["getMusicList"]),
    getRecommendData() {
      // const { data: res } = await this.$request.get('/personalized?limit=7')
      // this.recommendData = res.result
    },
    getSongList() {
      this.$router.push('songlist')
    },
    getPlayList(id) {
      window.sessionStorage.setItem('playListId', id)
      this.$router.push('playlist')
    },

    // async getMusicList() {
    getMusicList() {
      // then异步执行
      IndexGetMusicList().then(response => {
        console.log(response.rows)
        this.musiclist = response.rows
        // res = response;
      });
      // const type = arguments[0] === undefined ? 0 : arguments[0]
      // 模仿/api/admin/user/page
      // const { data: res } = await this.$request.get('/api/auth/jwt/top')
      // console.log(this.musiclist)
      const arrData = []
      res.forEach(item => {
        const arr = {}
        arr.title = item.title
        arr.pic = item.album.picUrl
        // arr.author = []
        // item.artists.forEach(i => {
        //   arr.author.push(i.title)
        // })
        arr.id = item.id
        // arr.time =
        //     Math.floor((item.duration % 3600000) / 60000) > 10
        //         ? Math.floor((item.duration % 3600000) / 60000)
        //         : '0' + Math.floor((item.duration % 3600000) / 60000)
        // arr.time +=
        //     ':' +
        //     (Math.floor((item.duration % 60000) / 1000) > 10
        //         ? Math.floor((item.duration % 60000) / 1000)
        //         : '0' + Math.floor((item.duration % 60000) / 1000))
        arr.album = item.release
        arrData.push(arr)
      })
      this.musicdata = arrData
      this.musiclist = this.getArrayData(arrData, 1, 10)
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

    // 获取音乐播放地址
    async getMusicUrl(obj) {
      const { data: res } = await this.$request.get('/api/auth/jwt/top')
      let music = {}
      music = {
        title: obj.name,
        artist: obj.author.join(' '),
        src: res.data[0].url,
        pic: obj.pic,
        id: obj.id
      }
      window.sessionStorage.setItem('nowMusic', JSON.stringify(music))
      this.$store.dispatch('dealAutoPlay', music)
    },


  },

}
</script>
<!--<style lang="less" scoped>-->
<style lang="scss" scoped>
.el-card {
  height: 160px;
  border-radius: 8px;
  cursor: pointer;
  position: relative;
  .playNum {
    position: absolute;
    color: #fff;
    top: 10px;
    right: 10px;
    z-index: 10;
    font-style: normal;
    font-size: 12px;
    opacity: 0.7;
    i {
      font-style: normal;
    }
  }
  .video-play-hover {
    font-size: 32px;
    color: #fff;
    position: absolute;
    bottom: 12px;
    right: 12px;
    opacity: 0;
    transition: opacity 0.3s;
  }
}
.el-card:hover .video-play-hover {
  opacity: 0.5;
}
.recommend-name {
  height: 60px;
  font-size: 14px;
  padding: 10px 0;
  span {
    cursor: pointer;
    opacity: 0.7;
  }
}
.recommend-name span:hover {
  opacity: 1;
}
.home-header {
  font-size: 15px;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  margin-bottom: 15px;
  text-indent: 10px;
}
</style>

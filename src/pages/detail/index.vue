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
  </d2-container>
</template>

<script>
import {GetPersonalizedSongList, GetTopSongList} from "@/api/admin/music";
import axios from "axios";

export default {
  name: 'detail',
  data() {
    return {
      songVo: this.$route.params,
      // listLoading: true,
    }
  },
  created() {
    // debugger
    console.log(this.songVo);
  },
  methods: {
    topSrcError() {

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
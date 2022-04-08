<template>
  <d2-container>
    <el-card shadow="never">
    <el-image :src="songVo.albumPic" @error.once="topSrcError(item, i)" @click="linksongsDisc(item.id)">
      <div slot="placeholder">
        <i class="el-icon-picture-outline" style="font-size:162.5px;color:#f1f1f1"></i>
      </div>
    </el-image>
      {{songVo.title}}
    </el-card>
<!--    <div class="left">-->
<!--      <div class="left-box" :style="{backgroundImage:'url('+songVo.albumPic+')'}">-->
<!--        {{ songVo.albumPic }}-->
<!--      </div>-->
<!--    </div>-->
<!--    <div class="right">-->
<!--      <el-table-->
<!--          :data="{songVo}"-->
<!--          stripe-->
<!--          class="right-table"-->
<!--          :show-header="false"-->
<!--          size="mini"-->
<!--      >-->
<!--        <el-table-column type="title"></el-table-column>-->
<!--        <el-table-column prop="artistName"></el-table-column>-->
<!--        <el-table-column prop="release" width="180"></el-table-column>-->
<!--      </el-table>-->

<!--    </div>-->

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

  },

}
</script>
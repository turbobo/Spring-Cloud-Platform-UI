<template>
  <div class="login-page">
    <div class="layer bg" id="login"></div>
    <div class="layer flex-center">
      <!-- logo部分 -->
      <div class="logo-group">
        <img src="./image/music_rec_mini.png" alt="logo">
      </div>
      <!-- 表单部分 -->
      <div class="form-group">
        <el-card>
          <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
            <el-form-item prop="username">
              <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                <i slot="prepend" class="fa fa-user-circle-o">账户</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input type="password" v-model="formLogin.password" placeholder="密码">
                <i slot="prepend" class="fa fa-keyboard-o">密码</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input type="text" v-model="formLogin.code" placeholder="- - - -">
                <template slot="prepend">验证码</template>
                <template slot="append">
                  <img class="login-code" :src="codeUrl" @click="getCode">
                </template>
              </el-input>
            </el-form-item>
            <el-button-group>
              <el-button size="default" @click="submit" type="primary">登录</el-button>
              <el-button size="default" @click="reset" >重置</el-button>
            </el-button-group>
            <el-button-group>
<!--              <router-link to="signup" >没有账号？请注册</router-link>-->
<!--              <el-link type="primary">忘记密码</el-link>-->
<!--              <router-link to="signup">没有账号？请注册</router-link>-->
<!--              <el-link type="primary" href="/signup" >没有账号？请注册</el-link>-->
              <el-link type="primary" @click="goSignup" >没有账号？请注册</el-link>
<!--              <el-button size="default" @click="goSignup" >没有账号？请注册</el-button>-->
            </el-button-group>

          </el-form>

<!--          &lt;!&ndash; 使用变量控制登录、注册页面展示&ndash;&gt;
          <div v-show='page==="register"'>
            <div>
              <h1 class='title'>注册界面，没写，哈哈</h1>
            </div>
            <div id='bottomDiv'>
              <a @click="goLogin">我要登录</a>
            </div>
          </div>-->

        </el-card>
      </div>
      <!-- 快速登录按钮 -->
      <!-- <el-button size="default" type="info" class="button-help" @click="dialogVisible = true">
        快速选择用户（测试权限）
      </el-button> -->
    </div>
    <!-- <el-dialog title="快速选择用户" :visible.sync="dialogVisible" width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="user-btn" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o" />
            <span>{{user.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog> -->
  </div>
</template>

<script>
/* eslint-disable */
require("particles.js");
import config from "./config/default";
import { mapActions } from "vuex";
import {getCodeImg} from "@/api/sys/login"
export default {
  data() {
    return {
      // 快速选择用户
      dialogVisible: false,
      codeUrl: './image/login-code.png',
      users: [
        {
          name: "超级管理员",
          username: "admin",
          password: "123"
        },
        {
          name: "菜单管理员",
          username: "MenuManager",
          password: "123456"
        },
        {
          name: "无权限用户",
          username: "no",
          password: "123456"
        }
      ],
      // 表单
      formLogin: {
        username: "123456",
        password: "admin",
        uuid: "",
        code: ""
      },
      // 校验
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    // 初始化例子插件
    particlesJS("login", config);
  },
  beforeDestroy() {
    // 销毁 particlesJS
    // thanks https://github.com/d2-projects/d2-admin/issues/65
    // ref https://github.com/VincentGarreau/particles.js/issues/63
    if (pJSDom && pJSDom.length > 0) {
      pJSDom[0].pJS.fn.vendors.destroypJS();
      pJSDom = [];
    }
  },
  created () {
    this.getCode()
  },
  methods: {
    ...mapActions("d2admin/account", ["login"]),
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick(user) {
      this.formLogin.username = user.username;
      this.formLogin.password = user.password;
      this.submit();
    },
    getCode() {
      getCodeImg().then(response => {
        this.codeUrl = "data:image/gif;base64," + response.captcha;
        this.formLogin.uuid = response.uuid;
      });
    },
    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 登录
          this.login({
            vm: this,
            username: this.formLogin.username,
            password: this.formLogin.password,
            verCode: this.formLogin.code,
            uuid: this.formLogin.uuid
          });
        } else {
          // 登录表单校验失败
          this.$message.error("表单校验失败");
        }
      });
    },
    //
    reset() {
      // 页面刷新
      // this.$router.go(0);

      //清空输入框
      this.formLogin.username = "";
      this.formLogin.password = "";
      this.formLogin.code = "";
    },
    //跳转注册页面
    goSignup() {
      //替换页面，无法退回之前页面
      this.$router.replace('/signup')
    }

  }
};
</script>

<style lang="scss">
@import "./style.scss";
.login-page .logo-group img {
  height: 70px;
}
</style>

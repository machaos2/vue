<template>
  <div class="row">
    <div class="col-md-4">
      <Message :show.sync="msgShow" :type="msgType" :msg="msg"/>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-title">搜索联想关键词</h3>
        </div>
        <div class="panel-body" data-validator-form>
          <div class="form-group">
            <label class="control-label">关键词</label>
            <textarea v-model.trim="words" class="form-control" placeholder="请输入关键词，一行一个"></textarea>
          </div>
          <div class="form-group">
            <label class="control-label">搜索平台</label>
            <select class="form-control chosen" v-model="engine_selected" multiple>
              <option :value="engine.slug" v-for="engine in engines">{{engine.title}}</option>
            </select>
          </div>
          <div class="form-group">
            <label class="control-label">追加词尾</label>
            <input id="append" v-model.trim="append" type="text" class="form-control" placeholder="请填写">
          </div>
          <div class="form-group">
            <label class="control-label">过滤词</label>
            <input v-model.trim="search" type="text" class="form-control" placeholder="请填写过滤词">
          </div>
          <button type="submit" class="btn btn-lg btn-success btn-block" @click="register">
            <i class="fa fa-btn fa-sign-in"></i> Go
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-8">

    </div>
  </div>
</template>

<script>
import createCaptcha from '@/utils/createCaptcha'
import ls from '@/utils/localStorage'
import 'chosen-js'

export default {
  name: 'AssociationalWord',
  data() {
    return {
      words: '',
      append: '',
      search: '壹加壹',
      engine_selected: ['baidu-wap'],
      engines: [
        {
          title: "百度",
          slug: "baidu-web",
          url: "https://www.baidu.com/",
          search: "",

        },
        {
          title: "百度移动",
          slug: "baidu-wap",
          url: "https://www.baidu.com/",
        },
        {
          title: "搜狗",
          slug: "sogou-web",
          url: "https://www.baidu.com/",
        },
        {
          title: "搜狗移动",
          slug: "sogou-wap",
          url: "https://www.baidu.com/",
        },
        {
          title: "神马",
          slug: "shenma",
          url: "https://www.baidu.com/",
        }/*,
        {
          title: "360",
          slug: "360-web",
          url: "https://www.baidu.com/",
        },
        {
          title: "360移动",
          slug: "360-wap",
          url: "https://www.baidu.com/",
        }*/
      ],
      msg: '', // 消息
      msgType: '', // 消息类型
      msgShow: false // 是否显示消息，默认不显示
    }
  },
  created() {
    $('.chosen').chosen();
  },
  methods: {
    register(e) {
      this.$nextTick(() => {
        const target = e.target.type === 'submit' ? e.target : e.target.parentElement

        if (target.canSubmit) {
          this.submit()
        }
      })
    },
    submit() {
    },
    showMsg(msg, type = 'warning') {
      this.msg = msg
      this.msgType = type
      this.msgShow = false

      this.$nextTick(() => {
        this.msgShow = true
      })
    }
  }
}
</script>

<style scoped>
  textarea {
    height: 400px;
  }

@import "~chosen-js/chosen.css";
</style>

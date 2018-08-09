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
            <VueChosen :options="engines" :placeholder="placeholder" :multiple="true" :value="engine_selected" @input="setSelectedEngines"></VueChosen>
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
      <el-tabs v-model="activeName" v-if="results">
        <el-tab-pane :label="result.title" :name="result.slug" v-for="result in results" :key="result.slug">
          <!-- <el-table :data="result.data" height="750" border style="width: 100%;" :span-method="objectSpanMethod">
            <el-table-column prop="title" label="关键词" width="180" rowspan="associated.length"></el-table-column>
            <el-table-column prop="item" label="联想词" width="180" v-for="item in associated"></el-table-column>
          </el-table> -->
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
  import ls from '@/utils/localStorage';
  import associated from '@/utils/associted.js';
  import VueChosen from '@/components/vendor/vue-chosen';

  window.sogou = {};
  sogou.sug = function(res) {
    res = JSON.parse(JSON.stringify(res));
    for ( let i of res[1] ) {
      console.log(i);
    }
  };

  export default {
    name: 'AssociationalWord',
    components: {
      VueChosen,
    },
    data() {
      return {
        words: `合肥
顺德
东莞
武汉
北京
芜湖
宁波
丽人
壹美尚
阜阳`,
        append: '整形',
        search: '壹加壹',
        engine_selected: ['baidu_web'],
        placeholder: "请选择",
        engines: [
          {
            title: "百度",
            slug: "baidu_web",
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
            search: "",
          },
          {
            title: "百度移动",
            slug: "baidu_wap",
            url: "http://m.baidu.com/su",
          },
          {
            title: "搜狗",
            slug: "sogou_web",
            url: "https://www.sogou.com/suggnew/ajajjson",
          },
          {
            title: "搜狗移动",
            slug: "sogou_wap",
            url: "https://wap.sogou.com/web/sugg.jsp",
          },
          {
            title: "神马",
            slug: "shenma",
            url: "https://sugs.m.sm.cn/web",
          },
          {
            title: "360",
            slug: "360_web",
            url: "https://sug.so.360.cn/suggest",
          },
          {
            title: "360移动",
            slug: "360_wap",
            url: "https://www.baidu.com/",
          }
        ],
        activeName: null,
        results: [
          {
            title: "搜狗移动",
            slug: "sogou_wap",
            data: [
              {
                title: '合肥',
                associated : [
                  '合肥壹加壹',
                  '合肥整形',
                  '合肥华美',
                ],
              },
              {
                title: '合肥',
                associated : [
                  '合肥壹加壹',
                  '合肥整形',
                  '合肥华美',
                ],
              },
              {
                title: '合肥',
                associated : [
                  '合肥壹加壹',
                  '合肥整形',
                  '合肥华美',
                ],
              },
              {
                title: '合肥',
                associated : [
                  '合肥壹加壹',
                  '合肥整形',
                  '合肥华美',
                ],
              },
              {
                title: '合肥',
                associated : [
                  '合肥壹加壹',
                  '合肥整形',
                  '合肥华美',
                ],
              },
              {
                title: '合肥',
                associated : [
                  '合肥壹加壹',
                  '合肥整形',
                  '合肥华美',
                ],
              },
            ],
          },
        ],
        msg: '', // 消息
        msgType: '', // 消息类型
        msgShow: false // 是否显示消息，默认不显示
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      register(e) {
        this.$nextTick(() => {
          this.engine_selected.forEach(engine => {
            let items = this.words.split('\n');

            items.forEach(item => {
              let result = associated(engine, item+this.append);
              // console.log(result);
            });
          })
        });
      },
      setSelectedEngines(selected) {
        this.engine_selected = selected;
      },
      submit() {
      },
      showMsg(msg, type = 'warning') { // 提示信息
        this.msg = msg;
        this.msgType = type;
        this.msgShow = false;

        this.$nextTick(() => {
          this.msgShow = true;
        })
      }
    }
  }
</script>

<style scoped>
  textarea {
    height: 400px;
  }
</style>

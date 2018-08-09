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
          <table class="result">
            <tr>
              <th style="min-width: 150px;">关键词</th>
              <th style="min-width: 300px;">联想词</th>
            </tr>
            <tbody v-for="data in result.data">
              <tr v-for="(item, index) in data.associated">
                <td v-text="data.title"  v-if="index==0" :rowspan="data.associated.length"></td>
                <td v-text="item"></td>
              </tr>
            </tbody>
          </table>
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
        words: '',
        append: '',
        search: '',
        engine_selected: ['baidu_wap', 'sogou_wap', 'shenma'],
        placeholder: "请选择",
        engine_map: {
          baidu_web: '百度',
          baidu_wap: '百度移动',
          sogou_web: '搜狗',
          sogou_wap: '搜狗移动',
          shenma: '神马',
          sll_web: '360',
          sll_wap: '360移动',
        },
        engines: [
          {
            title: "百度",
            slug: "baidu_web",
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
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
            slug: "sll_web",
            url: "https://sug.so.360.cn/suggest",
          },
          {
            title: "360移动",
            slug: "sll_wap",
            url: "https://www.baidu.com/",
          }
        ],
        results: [],
        msg: '', // 消息
        msgType: '', // 消息类型
        msgShow: false // 是否显示消息，默认不显示
      }
    },
    computed: {
      activeName: {
        get() {
          return this.engine_selected[0];
        },
        set() {

        }
      }
    },
    methods: {
      register(e) {
        let that = this;

        this.$nextTick(() => {
          this.results = [];

          this.engine_selected.forEach(engine => {
            let temp = [];
            let items = this.words.split('\n');

            items.forEach(item => {
              let word = item+this.append;
              let promise = associated(engine, word);

              promise.then(data => {
                data = data.filter(i => i.indexOf(this.search)!=-1);
                temp.push({
                  title: word,
                  associated: data,
                });
              }, error => {
                console.log(error);

                temp.push({
                  title: word,
                  associated: [],
                });
              });
            });

            this.results.push({
              title: this.engine_map[engine],
              slug: engine,
              data: temp,
            });
          })
        });

        console.log(this.results);
      },
      setSelectedEngines(selected) {
        this.engine_selected = selected;
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
  table.result td, table.result th {
    border: 1px solid #bbb;
    padding: 2px 5px;
  }
</style>

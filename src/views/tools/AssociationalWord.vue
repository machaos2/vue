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

    </div>
  </div>
</template>

<script>
  import ls from '@/utils/localStorage';
  import VueChosen from '@/components/vendor/vue-chosen';

  window.sogou = {};
  sogou.sug = function(res) {
    res = JSON.parse(JSON.stringify(res));
    // console.log(res);
    // console.log(res[1]);
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
        engine_selected: ['baidu_wap', 'sogou_wap'],
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
              let temp = item+this.append;

              switch ( engine ) {
                case 'baidu_wap':
                    $.ajax({
                        url : "http://m.baidu.com/su",
                        async: false,
                        crossDomain: true,
                        dataType: 'jsonp',
                        data : {
                            pre: 1,
                            p: 3,
                            ie: 'utf-8',
                            json: 1,
                            from: 'wise_web',
                            sugsid: '124615,125148,122155,117037,123799,124817,120133,125141,118885,118874,118848,118830,118805,107313,125020,125006,124978,117431,124603,122788,125085,124752,124634,124748,123985,124559,124110,124708,124525,122496,124770,124030,110085,123290,124425,125011',
                            net: '',
                            os: '',
                            sp: '',
                            wd: temp,
                            _: 1533632156265,
                        },
                        success(res){
                            // console.log(res);
                            // console.log(res.s);
                            for ( let i of res.s ) {
                              console.log(i);
                            }
                        },
                    });
                break;
                case 'baidu_web':
                    $.ajax({
                        url : "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su",
                        async: false,
                        crossDomain: true,
                        dataType: 'jsonp',
                        jsonp: 'cb',
                        data : {
                            wd: temp,
                            sugmode: 2,
                            json: 1,
                            p: 3,
                            sid: '1439_26965_21109_26350_26920_20930',
                            req: 2,
                            bs: temp,
                            pbs: temp,
                            csor: 5,
                            pwd: temp,
                            // cb: "",
                            _: 1533630813225,
                        },
                        success(res){
                            // console.log(res);
                            // console.log(res.s);
                            for ( let i of res.s ) {
                              console.log(i);
                            }
                        },
                    });
                break;
                case 'sogou_wap':
                    $.ajax({
                        url : "https://wap.sogou.com/web/sugg.jsp",
                        async: false,
                        crossDomain: true,
                        dataType: 'jsonp',
                        jsonp: 'cb',
                        data : {
                            vr: 1,
                            kw: temp,
                            t: 1533633449734,
                            prereq_a: '',
                            sugsuv: 'AAEWaUrKIQAAAAqUCyFx3AAAkwA=',
                            suguuid: '16cb663b-7016-43bb-8ac5-afb99e8833f9',
                            sugtime: 1533633449734,
                        },
                        success(res){
                            // console.log(res);
                            // console.log(res.s);
                            for ( let i of res.s ) {
                              console.log(i);
                            }
                        },
                        // error(a, b, c){
                        //   console.log(a);
                        //   console.log(b);
                        //   console.log(c);
                        // },
                    });
                break;
                case 'sogou_web':
                    $.ajax({
                        url : "https://www.sogou.com/suggnew/ajajjson",
                        async: false,
                        crossDomain: true,
                        dataType: 'jsonp',
                        jsonp: 'cb',
                        data : {
                            key: temp,
                            type: 'web',
                            ori: 'yes',
                            pr: 'web',
                            abtestid: 0,
                            ipn: '',
                            t: 1533632510344,
                            suguuid: '6fb52a51-02fa-4565-9fa8-a9603b53a01c',
                            ip: '36.7.137.10',
                            iploc: 3401,
                            suid: '0A8907242013940A000000005B617D5D',
                            yyid: 'null',
                            pid: 'sogou',
                            policyno: 'null',
                            mfp: 'null',
                            hs: 'https',
                            mp: 1,
                            prereq_a: '',
                            sugsuv: 1533115739339469,
                            sugtime: 1533632523492,
                        },
                        success(res){
                            console.log(res);
                            console.log(res[1]);
                            for ( let i of res[1] ) {
                              console.log(i);
                            }
                        },
                    });
                break;
                case '360_web':
                    $.ajax({
                        url : "https://sug.so.360.cn/suggest",
                        async: false,
                        crossDomain: true,
                        dataType: 'jsonp',
                        data : {
                            encodein: 'utf-8',
                            encodeout: 'utf-8',
                            format: 'json',
                            fields: 'word',
                            word: temp,
                            // _: 1533636209727,
                        },
                        success(res){
                            console.log(res);
                            console.log(res.result);
                            for ( let i of res.result ) {
                              console.log(i.word);
                            }
                        },
                    });
                break;
                case '360_wap':
                    $.ajax({
                        url : "https://m.so.com/suggest/mso",
                        async: false,
                        crossDomain: true,
                        dataType: 'json',
                        data : {
                            kw: temp,
                            src: 'mso',
                            caller: 'strict',
                            sensitive: 'strict',
                            count: 10,
                        },
                        success(res){
                            // console.log(res);
                            // console.log(res.data.sug);
                            if ( res.data.sug ) {
                              for ( let i of res.data.sug ) {
                                console.log(i.word);
                              }
                            }
                        },
                    });
                break;
                case 'shenma':
                    $.ajax({
                        url : "https://sugs.m.sm.cn/web",
                        async: false,
                        crossDomain: true,
                        dataType: 'jsonp',
                        data : {
                            scheme : "https",
                            fr : "android",
                            t : "w",
                            uc_param_str : "dnnwnt",
                            q : temp,
                            // callback: '',
                            _ : "1533178782582",
                        },
                        success(res){
                            // console.log(res);
                            // console.log(res.r);
                            for ( let i of res.r ) {
                              console.log(i.w);
                            }
                        },
                    });
                break;
              }
              console.log(this.search);
            });
          })
          // const target = e.target.type === 'submit' ? e.target : e.target.parentElement;

          // if (target.canSubmit) this.submit();
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

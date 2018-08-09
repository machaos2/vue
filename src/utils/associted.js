export default function(engine, temp) {
    let result = [];

    let promise = new Promise(function(resolve, reject){
      switch ( engine ) {
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
                  success: function(res){
                      resolve(res.s);
                  },
                  error: function(error){
                      reject(error);
                  },
              });
          break;
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
                  success: function(res){
                      resolve(res.s);
                  },
                  error: function(error){
                      reject(error);
                  },
              });
          break;
          case 'sogou_web':
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
                  success: function(res){
                      resolve(res.s);
                  },
                  error: function(error){
                      reject(error);
                  },
              });
          break;
          case 'sll_web':
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
                  success: function(res){
                      resolve(res.result.map(i => i.word));
                  },
                  error: function(error){
                      reject(error);
                  },
              });
          break;
          case 'sll_wap':
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
                  success: function(res){
                      resolve(res.data.sug ? res.data.sug.map(i => i.word) : []);
                  },
                  error: function(error){
                      reject(error);
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
                  success: function(res){
                      resolve(res.r.map(i => i.w));
                  },
                  error: function(error){
                      reject(error);
                  },
              });
          break;
      }
    });

    return promise;
}

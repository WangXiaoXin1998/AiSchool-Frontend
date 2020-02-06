<template>
  <div id="yearlybilldetail">
    <div class="background">
      <!-- <vue-particles
        color="#ccc"
        :particleOpacity="0.7"
        :particlesNumber="300"
        shapeType="circle"
        :particleSize="2"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      ></vue-particles>-->
    </div>
    <div class="content">
      <center>
        <img src="../assets/image/logo.png" width="500px" />
        <div class="title1">{{base.year}}年智慧校园账单</div>
      </center>
      <br />
      <el-row>
        <el-col :span="22" :offset="1">
          <el-card class="box-card">
            <div class="name">
              <el-row>
                <el-col :span="8">
                  <b>账号：</b>
                  {{base.number}}
                </el-col>
                <el-col :span="8">
                  <b>姓名：</b>
                  {{base.name}}
                </el-col>
                <el-col :span="8">
                  <b>账期：</b>
                  {{base.year}}年
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="22" :offset="1">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>使用频率</span>
            </div>
            <div>
              <div id="frequency" :style="{ height: '420px'}"></div>
              <center>
                <div class="normal">
                  在
                  <nobr class="red">{{base.year}}年</nobr>这一年中，校园一卡通共陪伴你使用了
                  <nobr class="red">{{frequence.number}}次</nobr>。
                </div>
              </center>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-row :gutter="20">
        <el-col :span="11" :offset="1">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>消费情况</span>
            </div>
            <div>
              <div id="moneyin" :style="{ height: '420px'}"></div>
              <div class="normal">
                &emsp;&emsp;在这一年中，你一卡通累计消费了
                <nobr class="red">{{consume.moneysum}}元</nobr>。其中你在
                <nobr class="red">{{consume.moneymaxmonth}}</nobr>消费金额最多，共消费了
                <nobr class="red">{{consume.moneymax}}元</nobr>，相信那一定是你最开心的一个月！
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="11">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>充值情况</span>
            </div>
            <div>
              <div id="moneyout" :style="{ height: '420px'}"></div>
              <div class="normal">
                &emsp;&emsp;在这一年中，你一共为一卡通充值了
                <nobr class="red">{{moneyout.moneysum}}元</nobr>。其中你在
                <nobr class="red">{{moneyout.moneymaxday}}</nobr>一次就为它充值了
                <nobr class="red">{{moneyout.moneymax}}元</nobr>，爱它就要常给它充值呢！
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <br />
      <el-row>
        <el-col :span="22" :offset="1">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>校园餐饮</span>
            </div>
            <div>
              <el-row>
                <el-col :span="12">
                  <div>
                    <div id="canteenmoney" :style="{ height: '420px'}"></div>
                  </div>
                </el-col>
                <el-col :span="12">
                  <div>
                    <div id="canteenfreque" :style="{ height: '420px'}"></div>
                  </div>
                </el-col>
              </el-row>
              <div class="normal">
                &emsp;&emsp;每日三餐必不可少，这一年中你最喜欢在
                <nobr class="red">{{canteen.favourite}}</nobr>
                吃饭。你一共在{{canteen.favourite}}消费
                <nobr class="red">{{canteen.number}}次</nobr>
                ，{{canteen.favourite}}的阿姨们期待着你在新的一年中再度光临。
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="22" :offset="1">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>阅读校园</span>
            </div>
            <div>
              <div id="bookfreque" :style="{ height: '420px'}"></div>
            </div>
            <center>
              <div class="normal">
                在这一年中，你一共在学校图书馆借了
                <nobr class="red">{{book.number}}本</nobr>图书。
              </div>
            </center>
            <br />
            <el-row>
              <el-col :span="12">
                <div>
                  <div id="booktype" :style="{ height: '420px'}"></div>
                </div>
              </el-col>
              <el-col :span="12">
                <div>
                  <div id="bookauthor" :style="{ height: '420px'}"></div>
                </div>
              </el-col>
            </el-row>
            <div class="normal">
              &emsp;&emsp;其中你最喜欢看
              <nobr class="red">{{book.fatype}}</nobr>的图书，这一年中你一共借阅了
              <nobr class="red">{{book.fatypenumber}}次</nobr>
              {{book.fatype}}图书。你最喜欢看
              <nobr class="red">{{book.faauthor}}</nobr>
              的图书，这一年中你一共借阅了
              <nobr class="red">{{book.faauthornumber}}次</nobr>Ta的书。保持阅读的好习惯才能让自己收获更多哦！
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
      <el-row>
        <el-col :span="22" :offset="1">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>校园医疗</span>
            </div>
            <div>
              <div id="treatment" :style="{ height: '420px'}"></div>
              <div class="normal">
                &emsp;&emsp;这一年中你一共去过
                <nobr class="red">{{treatment.number}}次</nobr>
                校医务室。多锻炼少生病，保持身体健康才能专注学习哦！
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <br />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import qs from "qs";
import frame from "./frame.vue";
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.component("Frame", frame);
Vue.use(qs);

export default {
  name: "yearlybilldetail",
  data() {
    return {
      pagetitle: "年度账单",
      base: {
        year: 2019,
        number: localStorage.username,
        name: ""
      },
      frequence: {
        number: 412
      },
      consume: {
        moneysum: 123,
        moneymax: 123.21,
        moneymaxmonth: "2019年3月"
      },
      moneyout: {
        moneysum: 123,
        moneymax: 123.21,
        moneymaxday: "2019年3月"
      },
      canteen: {
        favourite: "第二餐厅1楼",
        number: 100
      },
      book: {
        number: 123,
        fatype: "文艺图书",
        fatypenumber: 12,
        faauthor: "朱自清",
        faauthornumber: 1
      },
      treatment: {
        number: 32
      }
    };
  },
  methods: {
    getInfor() {
      this.$axios
        .post(
          "/apife/api/getuserinfor",
          qs.stringify({ token: localStorage.token }),
          {}
        )
        .then(res => {
          if (res.data.error_num == 1) {
            this.$message.error("获取失败：" + res.data.msg);
            return;
          }
          this.base.name = res.data.name;
        })
        .catch(error => {
          this.$message.error("获取失败：服务器连接超时");
        });
    },
    drawLine() {
      let frequency = echarts.init(document.getElementById("frequency"));
      frequency.setOption({
        title: {
          text: "一卡通使用频率统计"
        },
        tooltip: {},
        legend: {
          data: ["消费次数"]
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "消费次数",
            type: "line",
            data: [51, 12, 0, 12, 1, 4, 12, 25, 21, 30, 36, 10]
          }
        ]
      });
      let moneyin = echarts.init(document.getElementById("moneyin"));
      moneyin.setOption({
        title: {
          text: "一卡通消费金额"
        },
        tooltip: {},
        legend: {
          data: ["消费金额"]
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "消费金额",
            type: "line",
            data: [200, 0, 600, 503, 800, 300, 0, 0, 338, 400, 400, 390]
          }
        ]
      });
      let moneyout = echarts.init(document.getElementById("moneyout"));
      moneyout.setOption({
        title: {
          text: "一卡通充值金额"
        },
        tooltip: {},
        legend: {
          data: ["充值金额"]
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "充值金额",
            type: "line",
            data: [
              263.35,
              0,
              448,
              396.8,
              385.1,
              286,
              109.2,
              0,
              112.9,
              392.8,
              157.6,
              293.53
            ]
          }
        ]
      });
      let canteenmoney = echarts.init(document.getElementById("canteenmoney"));
      canteenmoney.setOption({
        title: {
          text: "餐厅消费金额统计图"
        },
        tooltip: {},
        legend: {
          data: ["消费金额"]
        },
        xAxis: {
          data: [
            "第一餐厅1楼",
            "第一餐厅2楼",
            "第三餐厅1楼",
            "第三餐厅2楼",
            "第三餐厅1楼",
            "第三餐厅2楼"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "消费金额",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
      let canteenfreque = echarts.init(
        document.getElementById("canteenfreque")
      );
      canteenfreque.setOption({
        title: {
          text: "餐厅消费次数统计图"
        },
        tooltip: {},
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        series: [
          {
            name: "消费次数",
            type: "pie",
            radius: "60%",
            // center: ['50%', '60%'],
            data: [
              { value: 335, name: "第一餐厅1楼" },
              { value: 610, name: "第一餐厅2楼" },
              { value: 434, name: "第二餐厅1楼" },
              { value: 135, name: "第二餐厅2楼" },
              { value: 434, name: "第三餐厅1楼" },
              { value: 135, name: "第三餐厅2楼" }
            ]
          }
        ]
      });
      let bookfreque = echarts.init(document.getElementById("bookfreque"));
      bookfreque.setOption({
        title: {
          text: "图书馆借阅频率统计"
        },
        tooltip: {},
        legend: {
          data: ["借阅次数"]
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "借阅次数",
            type: "line",
            data: [51, 12, 0, 12, 1, 4, 12, 25, 21, 30, 36, 10]
          }
        ]
      });
      let booktype = echarts.init(document.getElementById("booktype"));
      booktype.setOption({
        title: {
          text: "图书馆借阅作者统计"
        },
        tooltip: {},
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        series: [
          {
            name: "借阅次数",
            type: "pie",
            radius: "60%",
            // center: ['50%', '60%'],
            data: [
              { value: 5, name: "朱自清" },
              { value: 6, name: "鲁迅" },
              { value: 3, name: "刘太岗" }
            ]
          }
        ]
      });
      let bookauthor = echarts.init(document.getElementById("bookauthor"));
      bookauthor.setOption({
        title: {
          text: "借阅图书类型统计"
        },
        tooltip: {},
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          }
        },
        series: [
          {
            name: "借阅次数",
            type: "pie",
            radius: "60%",
            // center: ['50%', '60%'],
            data: [
              { value: 335, name: "文艺图书" },
              { value: 610, name: "历史图书" },
              { value: 434, name: "外文图书" }
            ]
          }
        ]
      });
      let treatment = echarts.init(document.getElementById("treatment"));
      treatment.setOption({
        title: {
          text: "校园门诊就诊情况"
        },
        tooltip: {},
        legend: {
          data: ["就诊次数"]
        },
        xAxis: {
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月"
          ]
        },
        yAxis: {},
        series: [
          {
            name: "就诊次数",
            type: "bar",
            data: [0, 0, 0, 1, 0, 2, 0, 1, 1, 1, 0, 0]
          }
        ]
      });
    }
  },
  mounted() {
    this.getInfor();
    this.drawLine();
  }
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}

.background {
  position: fixed;
  width: 100%;
}

.content {
  position: relative;
  top: 30px;
}

.name {
  text-align: center;
  font-weight: 500;
}

.title1 {
  text-align: center;
  font-size: 40px;
  font-weight: 500;
  margin-top: 15px;
  margin-bottom: 15px;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
}

.normal {
  font-size: 18px;
  font-weight: 520;
}

.red {
  color: red;
  font-weight: 550;
}
</style>
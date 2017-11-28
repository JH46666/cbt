<template lang="html">
    <div class="cbt_date">
        <div class="date_head">
            {{ showDate }}
        </div>
        <div class="week_wrapper">
            <template v-for="(item,index) in weekList"  >
                <span>{{ item }}</span>
            </template>
        </div>
        <div class="date_scroll">
            <div class="date_wrapper">
                <template v-for="n in 42">
                    <span v-if="n < nowStartWeek" class="disabled" @click="clickDate(n)" :class="{on: n === dateClass}"> {{ beforeEndDate - (n - 1) }}</span>
                    <span class="disabled" v-else-if="n >= nowStartWeek + nowEndDate" @click="clickDate(n)" :class="{on: n === dateClass}"> {{ n - nowEndDate - (nowStartWeek - 1) }}</span>
                    <span class="abled" v-else @click="clickDate(n)" :class="{'on': n === dateClass}"> {{ n - nowStartWeek + 1 }}</span>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nowDate: null,              // 当前
            beforeEndDate: null,        // 前一个月的最后一天
            nowEndDate: null,           // 本月最后一天
            nowStartWeek: null,         // 本月第一天是周几
            nextDate : 1,
            weekList: ['日','一','二','三','四','五','六'],
            dateClass: null,
            disOrAble: true,
            selectDate: null,
            showDate: '',
        }
    },
    methods: {
        getEndDay(year,month){
            return new Date(year,month,0).getDate();
        },
        getWeek(year,month){
            return new Date(year,month,1).getDay();
        },
        clickDate(d) {
            this.dateClass = d;
            let firstDateIndex = this.nowStartWeek-1,
                lastDateIndex = this.nowEndDate+firstDateIndex;
            if(d>firstDateIndex && d<=lastDateIndex){
                let plusIndex = d - firstDateIndex;
                this.selectDate = `${this.nowDate.getFullYear()}/${this.nowDate.getMonth()+1}/${plusIndex}`;
            }else if(d<=firstDateIndex){
                this.nowDate = this.getBeforeMounth(this.nowDate);
            }else if(d>lastDateIndex){
                this.nowDate = this.getNextMounth(this.nowDate);
            }
            this.showDate = new Date(this.selectDate).getFullYear()+'年'+this.addZeroo(new Date(this.selectDate).getMonth()+1)+'月'+this.addZeroo(new Date(this.selectDate).getDate())+'日'
        },
        addZeroo(val) {
            if(val < 10){
                return `0${val}`;
            }else{
                return val;
            }
        },
        getBeforeMounth(val) {
            var mounth = val.getMonth()+1;
            var year = val.getFullYear();
            var beforeDate;
            mounth = mounth-1;
            if(mounth <= 0){
                beforeDate = (year-1)+'/'+12+'/'+1
            }else{
                beforeDate = (year)+'/'+mounth+'/'+1
            }
            beforeDate = new Date(beforeDate);
            return beforeDate;
        },
        getNextMounth(val) {
            var mounth = val.getMonth()+1;
            var year = val.getFullYear();
            var nextDate;
            mounth = mounth+1;
            if(mounth >= 13){
                nextDate = (year+1)+'/'+1+'/'+1
            }else{
                nextDate = (year)+'/'+mounth+'/'+1
            }
            nextDate = new Date(nextDate);
            return nextDate;
        }
    },
    watch: {
        nowDate(val) {
            let d = val;
            this.nowStartWeek = this.getWeek(d.getFullYear(),d.getMonth())
            this.beforeEndDate = this.getEndDay(d.getFullYear(),d.getMonth())
            this.nowEndDate = this.getEndDay(d.getFullYear(),d.getMonth()+1);
            this.nowStartWeek = this.nowStartWeek === 0 ? 7 : this.nowStartWeek;
        }
    },
    created() {
        this.nowDate = new Date();
        let d = this.nowDate;
        this.nowStartWeek = this.getWeek(d.getFullYear(),d.getMonth())
        this.beforeEndDate = this.getEndDay(d.getFullYear(),d.getMonth())
        this.nowEndDate = this.getEndDay(d.getFullYear(),d.getMonth()+1);
        this.nowStartWeek = this.nowStartWeek === 0 ? 7 : this.nowStartWeek;
        this.dateClass = d.getDate()+this.nowStartWeek-1;
        this.showDate = d.getFullYear()+'年'+this.addZeroo(d.getMonth()+1)+'月'+this.addZeroo(d.getDate())+'日'
    },
    mounted() {
        var startX, startY;
        var maxHeight = document.querySelector('.date_scroll').offsetHeight/2;
        var self = this;
        document.querySelector('.date_wrapper').addEventListener('touchstart',function (ev) {
            startX = ev.touches[0].pageX;
            startY = ev.touches[0].pageY;
        }, false);
        document.querySelector('.date_wrapper').addEventListener('touchend',function (ev) {
            var endX, endY;
            endX = ev.changedTouches[0].pageX;
            endY = ev.changedTouches[0].pageY;
            var direction = GetSlideDirection(startX, startY, endX, endY);
            switch(direction) {
                case 0:
                // alert("无操作");
                break;
                case 1:
                // 向上
                // alert("up");
                self.nowDate = self.getNextMounth(self.nowDate);
                self.dateClass = null;
                break;
                case 2:
                // 向下
                // alert("down");
                self.nowDate = self.getBeforeMounth(self.nowDate);
                self.dateClass = null;
                break;
                default:
            }
        }, false);
        function GetSlideDirection(startX, startY, endX, endY) {
            var dy = startY - endY;
            var result = 0;
            if(dy>maxHeight) {              //向上滑动
                result=1;
            }else if(dy<-maxHeight){        //向下滑动
                result=2;
            }
            else{                           // 不滚动
                result=0;
            }
            return result;
        }
    }
}
</script>
<style lang="less">
@import '~@/styles/base/tools.less';
.cbt_date{
    box-sizing: border-box;
    .bg(#fff);
    .fontSize(.3rem);
    .color(#333);
    .date_head{
        width: 100%;
        height: .8rem;
        .bg(@mainCol);
        .color(@mainCol);
        .line(.8rem);
        .fontSize(.28rem);
        padding: 0 .3rem;
        .color(#fff);
    }
    .week_wrapper{
        .flex;
        .w(100%);
        // .h(.9rem);
        .color(#666);
        .flex-dir(row);
        span{
            .w(~'calc(100% / 7)');
            .h(.9rem);
            .algin(c);
            .line(.9rem);
        }
    }
    .date_scroll{
        .h(5.44rem);
        overflow: hidden;
        .date_wrapper{
            .w(100%);
            height: 100%;
            overflow: auto;
            padding: 1px 0;
            .flex;
            .flex-dir(row);
            flex-wrap: wrap;
            span{
                .w(~'calc(100% / 7)');
                .h(.9rem);
                .algin(c);
                .line(.9rem);
                border: 1px solid #eee;
                border-left: 0 none;
                border-bottom: 0 none;
                &.disabled{
                    .bg(#f5f5f5);
                    .color(#999);
                }
                &.abled{
                    .bg(#fff);
                    .color(#333);
                }
                &.on{
                    .bg(@mainCol);
                    .color(#fff);
                }
            }
        }
    }
}
</style>

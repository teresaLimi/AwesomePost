<template>
    <div class="Pos">
        <div>
            <el-row id="order-list">
                <el-col :span='7' class="pos-order">
                    <el-tabs type="border-card" v-model="checkTabs" class="tabs-content">
                        <el-tab-pane label="点餐" name="order">
                            <el-table :data="totalData" stripe height="calc(100% - 100px)">
                                <el-table-column label="商品名称" prop="goodsName"></el-table-column>
                                <el-table-column label="数量" prop="count" width="140">
                                    <template slot-scope="scope">
                                        <el-input-number v-model="scope.row.count"
                                        @change="inputNumberChange(scope.row,'inputNumber')"
                                        size="mini" :min="0" :step="1"></el-input-number>
                                    </template>
                                </el-table-column>
                                <el-table-column label="金额" prop="totalPrice" width="50"></el-table-column>
                                <el-table-column label="操作" width="50">
                                    <template slot-scope="scope">
                                        <el-button type='text' size="small" @click.native="deletOrderList(scope.row)">
                                            <i class="icon iconfont icon-RectangleCopy"></i>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-row class="order-button">
                                <div class="order-btnBox">
                                    <span>数量：{{statistics.count}} </span>
                                    <span> 总价：{{statistics.price}}</span>
                                </div>
                                <el-button type="info" plain @click="putUp" size="mini">挂单</el-button>
                                <el-button type="danger" plain @click="deletAllList" size="mini">删除</el-button>
                                <el-button type="success" plain @click="checkOut" size="mini">结账</el-button>
                            </el-row>
                        </el-tab-pane>
                        <el-tab-pane label="挂单" name="pending">
                            <el-collapse accordion>
                                <el-collapse-item v-for="items in putUpList" :key="items.key">
                                    <template slot="title">
                                        {{items.time}}
                                    </template>
                                    <ul>
                                        <li v-for="(val, index) in items.data" :key="index">
                                            {{val.goodsName}} - {{val.price}} - {{val.count}} - {{val.totalPrice}}
                                        </li>
                                    </ul>
                                    <el-button round size="mini" @click="returnOrder(items.data)">编辑</el-button>
                                </el-collapse-item>
                            </el-collapse>
                        </el-tab-pane>
                        <el-tab-pane label="外卖" name="takeOut">外卖</el-tab-pane>
                    </el-tabs>
                </el-col>
                <el-col :span='17' class="pos-order">
                    <div class="goods">常用商品</div>
                    <div class="goods-box">
                        <template>
                            <el-tag v-for="item in goodsItems" :key="item.key" effect="plain" size="medium"
                                type="success" style="margin-right:15px;margin-bottom:15px"
                                @click="addOrderList(item)">
                                {{item.name}} ￥{{item.price}}
                            </el-tag>
                        </template>
                    </div>
                    <div class="goods">新品/优惠</div>
                    <div class="goods-box">
                        <template>
                            <el-tag v-for="item in newGoodsItems" :key="item.key" effect="plain" size="medium"
                                type="warning" style="margin-right:15px;margin-bottom:15px"
                                @click="addOrderList(item)">
                                {{item.name}} ￥{{item.price}}
                            </el-tag>
                        </template>
                    </div>
                    <el-tabs v-model="checkGoodsTabs" style="height:calc(80% - 240px);overflow:hidden">
                        <el-tab-pane v-for="tab in allGoodsItems" :key="tab.tabkey" :name="tab.tabName" class="goods-tab">
                            <span slot="label" class="goods-tabTitle"> {{tab.tabLabel}} </span>
                            <div class="goods-tabContent">
                                <el-card class="goods-card" v-for="item in tab.list" :key="item.key"
                                    :body-style="{ padding: '0px' }" shadow="hover" @click.native="addOrderList(item)">
                                    <img :src="item.image" class="image">
                                    <div>{{item.name}} ￥{{item.price}}</div>
                                </el-card>
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
        </div>
        <el-dialog :visible.sync="dialogVisible" title="选择付款方式">
            <el-card v-for="item in payTypeList" :key="item.key" @click.native="payResult">
                {{item.payType}}
            </el-card>
        </el-dialog>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    name: 'Pos',
    mounted: function () {
        var orderHeight = document.body.clientHeight;
        document.getElementById('order-list').style.height = orderHeight + 'px';
    },
    created: function () {
        this.$http.get('../../../static/data/allGoods.json')
        .then((response) => {
            this.allGoodsItems = response.data;
        })
        .catch((error) => {
            console.log(error);
        })
    },
    data: function(){
        return {
            totalData:[],
            checkTabs: 'order',
            checkGoodsTabs: 'hanbao',
            goodsItems: [
                {
                    key: '1',
                    name: '香辣鸡腿堡',
                    price: '13'
                },{
                    key: '1456x',
                    name: '深海鳕鱼堡',
                    price: '15'
                },{
                    key: '3',
                    name: '肥宅快乐水',
                    price: '10'
                },{
                    key: '4',
                    name: '哔哔哔堡',
                    price: '55'
                },{
                    key: '6',
                    name: '白宇哥哥',
                    price: '10'
                },{
                    key: '7',
                    name: '不知道堡',
                    price: '55'
                }
            ],
            newGoodsItems: [
                {
                    key: '1200',
                    name: '西瓜汁',
                    price: '13' 
                },{
                    key: '2200',
                    name: '星冰乐',
                    price: '27' 
                },{
                    key: '3200',
                    name: '奥利奥麦旋风',
                    price: '16' 
                },{
                    key: '4200',
                    name: '咸蛋黄披萨',
                    price: '69' 
                },{
                    key: '5200',
                    name: '香辣鸡腿堡',
                    price: '13' 
                }
            ],
            allGoodsItems: [],
            dialogVisible: false,
            payTypeList: [
                {
                    key: 1,
                    payType: "微信支付"
                },{
                    key: 2,
                    payType: "支付宝支付"
                },{
                    key: 3,
                    payType: "现金支付"
                }
            ],
            putUpList: []
        };
    },
    methods: {
        addOrderList: function (row) {
            let isHave = false;
            for(let i = 0; i < this.totalData.length; i++){
                if(this.totalData[i].key === row.key){
                    isHave = true;
                    this.totalData[i].count ++;
                    this.totalData[i].totalPrice = this.totalData[i].count * this.totalData[i].price;
                    break;
                }
            }
            if(isHave === false){
                let currentOrder = {
                    key: row.key,
                    goodsName: row.name,
                    price: row.price,
                    totalPrice: row.price,
                    count: 1
                };
                this.totalData.push(currentOrder);
            }
        },
        inputNumberChange: function (row) {
            if(row.count === 0){
                this.deletOrderList(row);
            }else{
                let data = this.totalData.filter((val, index, arr) => val.key === row.key);
                data[0].totalPrice = data[0].price * data[0].count;
            };
        },
        deletOrderList: function (row) {
            this.totalData = this.totalData.filter((val, index, arr) => val.key !== row.key);
        },
        deletAllList: function () {
            this.totalData = [];
        },
        checkOut: function () {
            if(this.totalData.length){
                this.dialogVisible = true;
            }
        },
        payResult: function () {
            this.totalData = [];
            this.dialogVisible = false
        },
        putUp: function () {
            var curDate = new Date();
            let list = {
                key: curDate.valueOf(),
                time: curDate.toLocaleString(),
                data: this.totalData
            }
            this.putUpList.unshift(list);
            this.deletAllList();
            this.checkTabs = "pending";
        },
        returnOrder: function (row) {
            this.totalData = row;
            this.putUpList = this.putUpList.filter((val) => val.data !== row);
            this.checkTabs = "order";
        }
    },
    computed: {    
        statistics: function () {
            let total = {
                price: 0,
                count: 0
            };
            this.totalData.forEach(element => {
                total.price += element.count * element.price;
                total.count += element.count;
            });
            return total;
        }
    }
}
</script>

<style scoped>
    .pos-order {
        background-color: #f9fafc;
        border-right: 1px solid #c0ccda;
        height: 100%;
    }
    .order-button {
        margin-top:10px; 
        text-align: center;
    }
    .order-btnBox{
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 14px;
    }
    .order-btnBox>span{
        margin: 0 5px;
    }
    .tabs-content{
        height: calc(100% - 2px);
    }
    .goods{
        height: 39px;
        padding: 0 10px;
        line-height: 39px;
        color: #606266;
        background-color: #F5F7FA;
        border-bottom: 1px solid #E4E7ED;
    }
    .goods-box{
        height: 10%;
        margin: 20px;
        padding: 20px;
        background-color: #fff;
    }
    .goods-tabTitle{
        padding: 0 20px;
        font-size: 16px;
    }
    .goods-tab{
        padding: 10px 20px;
    }
    .goods-tabContent{
        height: 260px;
        overflow-y: scroll;
    }
    .image{
        width: 140px;
        height: 140px;
    }
    .goods-card{
        width: 140px;
        float: left;
        margin-right: 20px;
        margin-bottom: 10px;
    }
    .goods-card div{
        line-height: 30px;
        font-size: 12px;
        padding: 0 10px;
        text-align: center
    }
    .iconfont{
        font-size: 24px;
    }
</style>

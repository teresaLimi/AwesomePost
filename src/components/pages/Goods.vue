<template>
    <div class="Goods">
        <div class="region">
            <el-input placeholder="请输入内容" class="input-with-select"
                v-model="searchInput" style="width:80%" clearable>
                <el-select v-model="searchSelect" slot="prepend" placeholder="请选择">
                    <el-option label="商品名称" value="goodsName"></el-option>
                    <el-option label="商品编码" value="goodsEncode"></el-option>
                    <el-option label="标签" value="goodsTag"></el-option>
                </el-select>
            </el-input>
            <el-button style="float:right;" @click="add">录入</el-button>
        </div>
        <el-table :stripe=true :data="allGoodsData">
            <el-table-column label="商品名称" prop="goodsName"></el-table-column>
            <el-table-column label="编码" prop="goodsEncode"></el-table-column>
            <el-table-column label="单价" prop="goodsPrice"></el-table-column>
            <el-table-column label="库存" prop="goodsStock"></el-table-column>
            <el-table-column label="标签" prop="goodsTag">
                <template slot-scope="scope">
                    <el-tag type='success' disable-transitions v-for="(item,index) in scope.row.goodsTag"
                        :key="index">
                        {{tagName(scope.row.goodsTag[index])}}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" prop="goodsOperation">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
                    <el-button size="mini" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="region">
            <el-pagination layout="prev, pager, next, jumper" :total="pageNumber"></el-pagination>
        </div>
        <el-dialog :title="dialogName" :visible.sync="dialogVisible" @closed="editCancel">
            <div>
                <el-form label-width="100px" status-icon :rules="rules" ref="goodsFrom" :model="goodsFrom">
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input v-model="goodsFrom.goodsName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="编码" prop="goodsEncode">
                        <el-input v-model.number="goodsFrom.goodsEncode" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="单价" prop="goodsPrice">
                        <el-input v-model.number="goodsFrom.goodsPrice" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="库存" prop="goodsStock">
                        <el-input v-model.number="goodsFrom.goodsStock" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="标签" prop="goodsTag">
                        <el-select v-model="goodsFrom.goodsTag" multiple collapse-tags placeholder="请选择">
                            <el-option v-for="(item,index) in selectTags" :key="index"
                                :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editCancel">取 消</el-button>
                <el-button type="primary" @click="isadd?addSubmit('goodsFrom'):eidtSubmit('goodsFrom')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    name: 'Goods',
    data: function () {
        return {
            originalData: [
                {
                    goodsEncode: '1',
                    goodsName: '香辣鸡腿堡',
                    goodsPrice: '13',
                    goodsStock: '12',
                    goodsTag: ['new']
                },
                {
                    goodsEncode: '2',
                    goodsName: '深海鳕鱼堡',
                    goodsPrice: '15',
                    goodsStock: '12',
                    goodsTag: ['new']
                },
                {
                    goodsEncode: '3',
                    goodsName: '肥宅快乐水',
                    goodsPrice: '10',
                    goodsStock: '122',
                    goodsTag: []
                },
                {
                    goodsEncode: '6',
                    goodsName: '白宇哥哥',
                    goodsPrice: '100',
                    goodsStock: '1',
                    goodsTag: ['best']
                },
                {
                    goodsEncode: '7',
                    goodsName: '不知道堡',
                    goodsPrice: '55',
                    goodsStock: '15',
                    goodsTag: []
                }
            ],
            searchInput: '',
            searchSelect: 'goodsName',
            dialogName: '',
            dialogVisible: false,
            originalEditRow: {},
            selectTags: [
                {
                    value: 'new',
                    label: '新品'
                },
                {
                    value: 'best',
                    label: '绝版'
                }
            ],
            isadd: false,
            goodsFrom: {
                goodsName: '',
                goodsEncode: '',
                goodsPrice: '',
                goodsStock: '',
                goodsTag: []
            },
            rules: {
                goodsName: [
                    { required: true, message: '请输入商品名称', trigger: 'change' }
                ],
                goodsEncode: [
                    { required: true, message: '请输入商品编码', trigger: 'change' }
                ],
                goodsPrice: [
                    { required: true, message: '请输入商品单价', trigger: 'change' }
                ],
                goodsStock: [
                    { required: true, message: '请输入商品库存', trigger: 'change' }
                ]
            }
        };
    },
    computed: {
        allGoodsData: function () {
            if (this.searchInput) {
                return this.originalData.filter((item, i) => {
                    if (item[this.searchSelect].includes(this.searchInput)) {
                        return item;
                    }
                });
            } else {
                return this.originalData;
            }
        },
        pageNumber: function () {
            return this.allGoodsData.length;
        }
    },
    methods: {
        edit: function (row) {
            this.dialogName = '编辑商品信息';
            this.dialogVisible = true;
            this.goodsFrom = this.copy(row);
            this.originalEditRow = row;
        },
        del: function (row) {
            this.originalData = this.originalData.filter((item) => {
                if (item !== row) {
                    return item;
                }
            })
        },
        add: function () {
            this.dialogVisible = true;
            this.isadd = true;
        },
        addSubmit: function (fromName) {
            let list = this.copy(this.goodsFrom);
            this.$refs[fromName].validate((vaild) => {
                if (vaild) {
                    this.originalData.unshift(list);
                    this.editCancel();
                } else {
                    return false;
                }
            })
        },
        eidtSubmit: function (fromName) {
            this.$refs[fromName].validate((vaild) => {
                if (vaild) {
                    this.originalData = this.originalData.filter((item, i) => {
                        if (item === this.originalEditRow) {
                            item.goodsName = this.goodsFrom.goodsName;
                            item.goodsEncode = this.goodsFrom.goodsEncode;
                            item.goodsPrice = this.goodsFrom.goodsPrice;
                            item.goodsStock = this.goodsFrom.goodsStock;
                            item.goodsTag = this.goodsFrom.goodsTag;
                        }
                        return item;
                    })
                    this.editCancel();
                } else {
                    return false;
                }
            })
        },
        editCancel: function () {
            this.dialogVisible = false;
            this.goodsFrom.goodsName = '';
            this.goodsFrom.goodsEncode = '';
            this.goodsFrom.goodsPrice = '';
            this.goodsFrom.goodsStock = '';
            this.goodsFrom.goodsTag = [];
            this.originalEditRow = {};
        },
        copy: function (obj) {
            var newobj = {};
            for (var attr in obj) {
                newobj[attr] = obj[attr];
            }
            return newobj;
        },
        tagName: function (params) {
            let name;
            this.selectTags.forEach(item => {
                if (params === item.value) {
                    name = item.label;
                }
            });
            return name;
        }
    }
};
</script>
<style>
    .Goods{
        padding: 20px;
    }
    .region{
        background-color: #fff;
        padding: 20px;
        margin-bottom: 20px;
    }
    .el-select, .el-select .el-input {
        width: 100%;
        min-width: 110px;
    }
    .input-with-select .el-input-group__prepend {
        background-color: #fff;
    }
</style>

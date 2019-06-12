<template>
    <div class="left-menu">
        <ul>
            <router-link to="/pos" tag="li">
                <i class="icon iconfont icon-RectangleCopy86"></i>
                <div>收银</div>
            </router-link>
            <router-link to="/goods" tag="li">
                <i class="icon iconfont icon-RectangleCopy27"></i>
                <div>商品</div>
            </router-link>
            <router-link to="/member" tag="li">
                <i class="icon iconfont icon-RectangleCopy67"></i>
                <div>会员</div>
            </router-link>
            <router-link to="/shop" tag="li">
                <i class="icon iconfont icon-RectangleCopy92"></i>
                <div>店铺</div>
            </router-link>
            <router-link to="/statistics" tag="li">
                <i class="icon iconfont icon-RectangleCopy163"></i>
                <div>统计</div>
            </router-link>
            <router-link to="/install" tag="li">
                <i class="icon iconfont icon-RectangleCopy16"></i>
                <div>设置</div>
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'leftMenu'
};
</script>
<style scoped>
    .left-menu{
        background-color: #1d8ce0;
        color: #fff;
        font-size: 10px;
        float: left;
        width: 5%;
        height: 100%;
    }
    .iconfont{
        font-size: 24px;
    }
    .left-menu ul{
        padding:0px;
        margin: 0px;
    }
    .left-menu li{
        list-style: none;
        text-align: center;
        border-bottom:1px solid #20a0ff;
        padding:10px;
    }
    .nav-active{
        background-color: #fff;
        color: #1d8ce0;
    }
</style>

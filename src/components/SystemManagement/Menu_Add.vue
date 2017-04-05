<template>
    
	<!-- 右侧内容-->
        <div id="right-side" class="col-xs-20 pull-right">
            <!--搜索框部分-->
            <div class="col-xs-24 search">
                <div class="col-xs-23 search-box">
                    <div class="col-xs-23 search-inner-box">
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label for="name">菜单类型 :</label>
                            </div>    
                            <div class="col-xs-6 select-box" >
                                <select class="form-control" @change = "changeMenuType" id="menuType" v-model = "menuInfo.type">
                                    <option value = 0>一级菜单</option>
                                    <option value = 1>二级菜单</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label for="name" :id = "$route.params.id"><em class="text-danger">*</em> 菜单名称 :</label>
                            </div>
                            <div class="col-xs-6 select-box" v-if = "isSecondMenu">
                                <select class="form-control" id = 'pId' v-model = "menuInfo.pId">
                                    <option v-for ="firMenu in firstMenuList" :value = 'firMenu.id'>{{firMenu.menuName}}</option>
                                </select>
                            </div>
                            <div class="col-xs-6 text-box">
                                <input type="text" class="form-control" id="menuName" v-model = "menuInfo.menuName">
                            </div>
                        </div>
                        <div class="row" v-if = "isSecondMenu">
                            <div class="col-xs-3 label-box">
                                <label for="name"><em class="text-danger">*</em> 菜单路径 :</label>
                            </div>
                            <div class="col-xs-6 text-box">
                                <input type="text" class="form-control" id="pageUrl" v-model = "menuInfo.pageUrl">
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 label-box">
                                <label for="name">是否启用 :</label>
                            </div>
                            <div class="col-xs-6 select-box">
                                <select class="form-control" id="isEnable" v-model = "menuInfo.isEnable">
                                    <option value = 0>禁用</option>
                                    <option value = 1>启用</option>
                                </select>
                            </div>
                        </div>
                        <div class="row" v-show = "!isSecondMenu">
                            <div class="col-xs-3 label-box">
                                <label for="name">菜单图标 :</label>
                            </div>
                            <div class="col-xs-2 upload-box">
                                <img :src="imgUrl1" alt="上传照片" id = "previewImg" class="preview-img">
                                <input type="file" class="upload-btn" id="imgUrlBtn1">
                                <p class = "icon-desc">菜单收起图标</p>
                            </div>
                            <div class="col-xs-2 upload-box">
                                <img :src="imgUrl2" alt="上传照片" id = "previewImg" class="preview-img">
                                <input type="file" class="upload-btn" id="imgUrlBtn2">
                                <p class = "icon-desc">菜单展开图标</p>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-3 col-xs-push-3 button-box">
                                <input type="button" value="确认" class="search-button" @click = "addMenu">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<style lang="less" scoped>
    .upload-box {
        position: relative;
        .upload-btn {
            opacity: 0;
            z-index: 1000;
            position: absolute; 
            left: 0;
            top: 0;
            width: 120px;
            height: 120px;
            padding: 10px 20px;
        }
        .preview-img {
            width: 120px;
            height: 120px;
            padding: 10px 20px;
        }
        .icon-desc {
            font-size: 14px;
            color: #666;
            text-indent: 1em;
        }
    }
</style>
<script>
    import Util from '../../../static/js/util.js'
	export default {
		data(){
			return {
                imgUrl1:"./static/img/add.jpg",
                imgUrl2:"./static/img/add.jpg",
                isSecondMenu:false,//新增类型是否为二级菜单
                firstMenuList:'',//一级菜单列表
                menuInfo:{
                    pId: "",
                    menuName: "",
                    type: 0,   //类型：0-一级菜单；1-二级菜单；
                    isEnable: 0,
                    pageUrl: ""
                }
			}
		},
		methods:{
            //切换新增菜单类型
			changeMenuType(){
                console.log(this.menuInfo.type);
                if (this.menuInfo.type == 0) {//一级菜单时
                    this.isSecondMenu = false;
                } else if (this.menuInfo.type == 1 ) {//二级菜单时
                    this.isSecondMenu = true;
                    const getUrl = 'menu/getFirstLevelMenus';
                    this.$http.get(getUrl).then(res=>{
                        console.log(res);
                        let status = res.data.code;
                        if (status == 0) {//返回成功
                            this.firstMenuList = res.data.data;//一级菜单赋值
                            this.menuInfo.pId = this.firstMenuList[0].id;
                            console.log(this.firstMenuList);
                        }
                    }).catch(err=>{
                        console.log('获取菜单列表服务器异常' + err);
                    });
                }
            },
            //点击编辑时获取角色原有的权限和信息
            getEditInfo(){
                let id = this.$route.params.id;
                this.$http.get('menu/getMenu',{params:{'id':id}}).then(res=>{
                    console.log(res);
                    if (res.data.code == 0) {
                         this.menuInfo = res.data.data;//赋值单个菜单信息
                         this.imgUrl1 =this.menuInfo.menuIconUrl;
                         this.imgUrl2 =this.menuInfo.menuActiveIconUrl;
                        console.log(this.menuInfo);
                        this.changeMenuType();//调用控制第一级菜单下拉列表是否显示的函数
                    }
                }).catch(err=>{
                    console.log(err);
                });
            },
            //获取图标地址
            getImgUrl() {
                let self = this;
                $("#imgUrlBtn1").on("change",function (e) {
                    let file = e.target.files[0];
                    Util.readImgUrl(file,self,'imgUrl1');
                });
                $("#imgUrlBtn2").on("change",function (e) {
                    let file = e.target.files[0];
                    Util.readImgUrl(file,self,'imgUrl2');
                });
            },
            //新增菜单
            addMenu(){
                let menuName = $('#menuName').val().replace(/(^\s*)|(\s*$)/g,"");
                let pageUrl = $('#pageUrl').val();
                if (menuName!="") {
                    if (!this.isSecondMenu||pageUrl!= "") {
                        const addUrl = 'menu/addOrUpdateMenu';
                        let addData = {
                            'id' : this.$route.params.id,
                            'pId' : this.menuInfo.pId,
                            'type' : this.menuInfo.type,
                            'menuName' : this.menuInfo.menuName,
                            'isEnable' : this.menuInfo.isEnable,
                            'pageUrl' : this.menuInfo.pageUrl,
                            'menuIconUrl':this.imgUrl1,
                            'menuActiveIconUrl':this.imgUrl2
                        };
                        console.log(addData);
                        this.$http.post(addUrl,$.param(addData)).then(res=>{
                            console.log(res);
                            let status = res.data.code;
                            if (status == 0) {//返回成功
                                alert("成功");
                                if (this.$route.params.id != null) {//编辑状态成功后返回上一级并刷新
                                    history.go(-1);
                                    setTimeout(()=>{
                                        location.reload();                
                                    },100);
                                }else {
                                    location.reload();
                                }        
                            }else if (status == 30001) {//插入重复数据
                                alert('该菜单已存在，请不要重复添加。');
                            }
                        }).catch(err=>{
                            console.log('新增服务器异常' + err);
                        });
                    }else {
                        alert("请填写菜单路径再提交");
                    }       
                }else{
                    alert("请填写菜单名称再提交");
                }    
            }
		},
        mounted(){
            this.getEditInfo();
            this.getImgUrl();
        }
	}
</script>

<style lang="less" scoped>
    #right-side{
        position:fixed;
        bottom:0;
        right:0;
        top:0;
        background-color:#f5f5f5; 
        .select-box{
            padding:10px;
        }

        .text-box{
            padding:10px;
        }

        .label-box{
            padding:16px 0 13px 0;
            text-align:right;
        }

        .search-inner-box{
            background-color:#fff;
        }

        label{
            font-weight:normal;
            color:#696969;
        }
    }
</style>
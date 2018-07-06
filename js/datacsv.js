//接收参数
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}
//获取csv文件
function csvCity() {
    d3.csv("../MongoH5/data/city.csv",function(error,csvdata){
        if(error){
            console.log(error);
        }
        backcity(csvdata);
    });
}

function csvItem() {
    d3.csv("../MongoH5/data/item.csv",function(error,csvdata){
        if(error){
            console.log(error);
        }
        backitem(csvdata);
        // console.log(Object.keys(csvdata[0]).length);
    });
}
//回调函数
function backcity(csvdata) {
        citydata=csvdata;
        var str='';
        var page2=document.getElementById("aside");
        var backBtn=document.getElementById("back");
        var upBtn=document.getElementById("up");
        var liItem;
    if(citydata===undefined||citydata.length==0){
        console.log("未加载完毕");
    }else{
        //执行画面逻辑
        console.log("加载完毕");
        document.getElementById("cityName").innerHTML=citydata[id]["city"];
        document.getElementById("map").setAttribute('src','img/map'+id+'.png');
       for (var i=0;i<13;i++){
            if(citydata[id]["item"+i]!=null&&citydata[id]["item"+i]!=""){
                console.log(citydata[id]["item"+i]);
                str +='<li id="'+citydata[id]["item"+i]+'" ><img class="li_cell" src="img/'+citydata[id]["item"+i]+'.png"><span>'+citydata[id]["item"+i]+'</span><img class="li_right" src="img/btn.png"></li>';
                document.getElementById("list").innerHTML=str;
            }
        }
        //控制
         liItem=document.getElementsByTagName("li");
         for (var i=0;i<liItem.length;i++){
             liItem[i].onclick=function(){
                 //console.log(this.id+"我的id");
                 page2.setAttribute("class","asideShow");
                 document.getElementById("itemimg").setAttribute("src",'img/'+this.id+'1.png');
                 document.getElementById("itemYield").innerHTML=itemdata[0][this.id];
                 document.getElementById("itemUse").innerHTML=itemdata[1][this.id];
             };
         }

        //返回
        backBtn.onclick=function(){
            page2.setAttribute("class","asideClose");
        };
        //回到顶部
        upBtn.onclick=function(){
            window.scrollTo(0,0);
        };
    }
}
//回调函数
function backitem(csvdata) {
        itemdata=csvdata;
}

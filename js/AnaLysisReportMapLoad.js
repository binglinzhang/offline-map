String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
}
var myChart;
var map;
var BMapExt;
var option;
(function () {
    require.config({
        paths: {
            echarts: './js'
        },
        packages: [
            {
                name: 'BMap',
                location: './js',
                main: 'main'
            } 
        ]
    });

    require( 
    [
        'echarts',
        'BMap',
        'echarts/chart/map'
    ],
    function (echarts, BMapExtension) {
        $('#main').css({
            height:$('body').height(),
            width: $('body').width()
        });

        // 初始化地图
        BMapExt = new BMapExtension($('#main')[0], BMap, echarts,{
            enableMapClick: false
        });
        map = BMapExt.getMap();
		//map = new BMap.Map('allmap', {
//	    mapType: getDefaultMapType()
//			});
        var container = BMapExt.getEchartsContainer();


		var navControl=new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
            type: BMAP_NAVIGATION_CONTROL_LARGE
        });


        
    	
		//添加缩放控件
    //if(isAddNavigation()){
    var navControl=new BMap.NavigationControl({
        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
        type: BMAP_NAVIGATION_CONTROL_LARGE
    });
    navControl.defaultOffset = new BMap.Size(10, 10);
    map.addControl(navControl);
    map.enableScrollWheelZoom();		//启用滚动缩放
    map.disableDoubleClickZoom();
    map.enableKeyboard();
        var startPoint = {
            x: 114.297302,
            y: 30.605932
        };

        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 11);
        map.enableScrollWheelZoom(true);
        // 地图自定义样式
        initedTypeControl=true;
        initMapData();

        var overlayTileLayer = new BMap.TileLayer({isTransparentPng: true});
        overlayTileLayer.getTilesUrl = function(tileCoord, zoom) {
            var x = tileCoord.x;
            var y = tileCoord.y;
            //var urlPath="http://10.16.5.70:7077/";
            var url = urlPath+'overlay/' + (zoom) + "/" + x + "/" + y + ".jpg"; //直接使用本地瓦片
            return url;
        };
        map.addTileLayer(overlayTileLayer);

        myChart = BMapExt.initECharts(container);
        //window.onresize = myChart.onresize;
        //BMapExt.setOption(option);

		var ecConfig = require('echarts/config');
		function eConsole(param)
        {
            var tmp="";
            for(var i=0;i<msglist.length;i++) {
                if(msglist[i].c>0)
                {
                    //dlog(param.data.name);
                    //dlog(legentSelectList[i].NODE_NAME);
                    if (param.data.name == msglist[i].n+'_'+msglist[i].id){//&&param.data.id == legentSelectList[i].NODE_ID) {
                        tmp += ",'" + msglist[i].n+'_'+msglist[i].id + "' : true"
                    } else
                    {
                        tmp += ",'" + msglist[i].n+'_'+msglist[i].id + "' : false"
                    }
                }
            }
            tmp=tmp.substr(1);
            //dlog(tmp);
            //alert("option.legend.selected={"+tmp+"};");
            eval("option.legend.selected={"+tmp+"};");
            // switch (param.data.name)
            // {
            //     case '中心路由器':
            //         alert('selected ');
            //         option.legend.selected={'故障设备' : true,'中心路由器':true,'顶层交换机':false,'二层交换机':false,'三层交换机':false,'二层交换机2':false,'二层交换机3':false,'二层交换机4':false,'三层交换机2':false};
            //         break;
            //     case '二级交换机1':
            //         option.legend.selected={'中心交换机' : false,'二级交换机1' : true, '二级交换机2' : false,'故障设备':true};
            //         break;
            //     case '二级交换机2':
            //         option.legend.selected={'中心交换机' : false,'二级交换机1' : false, '二级交换机2' : true,'故障设备':true};
            //         break;
            // }
            myChart.clear();
            BMapExt.setOption(option);

            return;

        }
		myChart.on(ecConfig.EVENT.CLICK, eConsole);
    }
);
})();

var legentSelectList=NaN;
function showMyChart()
{
    myChart.showLoading();
    //alert('v2'+lastCity);



    

    $.ajax({
        type: "get",
        url: "getDeviceTreeNodesOnlyData.do",
        data: {
            city_code: lastCity,//
            gettime: new Date()
        },
        dataType: "json",
        success: function (msg) {
            msglist=msg;
            // map.put("i", node.Idx);
            // map.put("id", node.nodeID);
            // map.put("n", node.nodeName);
            // map.put("x", node.lng);
            // map.put("y", node.lat);
            // map.put("p", node.parentIdx);
            var returnJson = template40100;
            var tmp_legendData="'"+"故障设备"+"'";
            var tmp_legendSelected="'"+"故障设备"+"' : true";
            var tmp_geoCoord="";
            var tmp_markerPoint="";
            var tmp_markerLine="";


            var tmp_ERRPoint="";
            var tmp_serialData="";

            var out="";
            var addvalue=1;
            for(var i=0;i<msg.length;i++)
            {
                out+=msg[i].i+":"+msg[i].n+":"+msg[i].p+":"+msg[i].x+":"+msg[i].y+":"+msg[i].id.substr(0,5)+":"+msg[i].c+"\r\n";
                if(msg[i].c+''=='1')
                {
                    tmp_legendData+=",'"+msg[i].n+"_"+msg[i].id+"'";
                    tmp_legendSelected+=",'"+msg[i].n+"_"+msg[i].id+"':false";
                }
                tmp_geoCoord+=','+"'"+msg[i].n+"_"+msg[i].id+"': ["+msg[i].x+","+msg[i].y+"]";
                if(msg[i].c==0)
                {
                    addvalue=1;
                }else
                {
                    addvalue=0;
                }
                tmp_markerPoint+=','+"{name:'"+msg[i].n+"_"+msg[i].id+"',value:"+(90-getNodeLevel(msg, msg[i], 0)*20+addvalue)+" }";
                if(msg[i].i!="0")
                {
                    tmp_markerLine+=','+"[{name:'"+msg[i].n+"_"+msg[i].id+"'},{name:'"+msg[msg[i].p].n  +"_"+msg[msg[i].p].id+"'} ]";
                }
            }
            //alert(out);
            tmp_geoCoord=tmp_geoCoord.substr(1);
            tmp_markerPoint=tmp_markerPoint.substr(1);
            tmp_markerLine=tmp_markerLine.substr(1);
            tmp_serialData="";
            for(var i=0;i<msg.length;i++)//模板要替换的数据组装--节点选中效果
            {
                if(msg[i].c>0)
                {
                    var node=msg[i];
                    var tmp_tmp_markerPoint="";
                    var tmp_tmp_markerLine="";
                    var tmp_serial=template40101;
                    //alert(node.i+':'+node.n);
                    var nodes=getCurChildrenNodes(node);
                    //alert(nodes.length);
                    for(var j=0;j<nodes.length;j++)
                    {
                        var nd=nodes[j];
                        tmp_tmp_markerPoint+=","+"{name:'"+nd.n+"_"+nd.id+"',value:"+(90-getNodeLevel(msg, nd, 0)*20)+"}";
                        if(nd.i!='0'&&nd.id!=node.id)
                        {
                            tmp_tmp_markerLine+=","+"[{name:'"+nd.n+"_"+nd.id+"'},{name:'"+msg[nd.p].n+"_"+msg[nd.p].id+"',value:"+(90-getNodeLevel(msg, nd, 0)*20)+"} ]";
                        }
                    }
                    //alert('childs ok');
                    //alert(tmp_tmp_markerPoint);
                    //alert(tmp_tmp_markerLine);
                    if(tmp_tmp_markerPoint.length>0&&tmp_tmp_markerPoint.substr(0,1)==",")
                    {
                        tmp_tmp_markerPoint=tmp_tmp_markerPoint.substr(1);
                    }
                    if(tmp_tmp_markerLine.length>0&&tmp_tmp_markerLine.substr(0,1)==",")
                    {
                        tmp_tmp_markerLine=tmp_tmp_markerLine.substr(1);
                    }
                    //alert('point and line data ok');
                    tmp_serial=tmp_serial.replace("{$markerPoint}", tmp_tmp_markerPoint);
                    tmp_serial=tmp_serial.replace("{$markerLine}", tmp_tmp_markerLine);
                    tmp_serial=tmp_serial.replace("{$markerName}", node.n+"_"+node.id);
                    tmp_serialData+=","+tmp_serial;
                    //alert('finish one');
                }
            }





            //alert(tmp_legendData);
            //alert(tmp_legendSelected);
            // alert(tmp_geoCoord);
            // alert(tmp_markerPoint);
            // alert(tmp_markerLine);
            // alert(tmp_ERRPoint);
            // alert(tmp_serialData);

            //tmp_serialData="";
            //模板数据加载
            returnJson=returnJson.replace("{$legendData}", tmp_legendData);
            returnJson=returnJson.replace("{$legendSelected}", tmp_legendSelected);
            returnJson=returnJson.replace("{$geoCoord}", tmp_geoCoord);
            returnJson=returnJson.replace("{$markerPoint}", tmp_markerPoint);
            returnJson=returnJson.replace("{$markerLine}", tmp_markerLine);
            returnJson=returnJson.replace("{$ERRPoint}", tmp_ERRPoint);
            returnJson=returnJson.replace("{$serialData}", tmp_serialData);
            //alert(returnJson);
            eval('option='+returnJson);
            myChart.clear();
            BMapExt.setOption(option);
            myChart.hideLoading();
        }
    });


}
function pushArray(source,target)
{
    for(var i=0;i<source.length;i++)
    {
        target.push(source[i]);
    }
    return target;
}
var msglist=null;
function getCurChildrenNodes(node)
{
    //ret=[];
    var ret=new Array();
    ret.push(node);
    //alert(ret.length);
    for(var i=0;i<msglist.length;i++)
    {
        if(msglist[i].p==node.i&&msglist[i].i!=0)
        {
            // if(node.i!=0) {
            //     alert(msglist[i].p + ':' + msglist[i].n + '-' + node.i + ':' + node.n);
            // }
            ret=pushArray(getCurChildrenNodes(msglist[i]),ret);
        }
    }
    return ret;
}
function getNodeLevel(list,node,level)
{
    var ret = level;
    if(node.p=="0")
    {
        ret = level;
    }
    else
    {
        level++;
        ret=getNodeLevel(list,list[node.p],level);
    }
    return ret; 
}
var template40100="" +
    "{    backgroundColor: 'rgba(0,0,0,0.65)',        color: ['gold','aqua','lime','lime'],    title : {" +
    "   text: '',        subtext:'',        x:'center',        textStyle : {        color: '#fff'" +
    "}},    tooltip : {        trigger: 'item',            formatter: function (v) {         var evs=v[1].split('>');if(evs.length==1){    return v[1].split('_')[0].trim();}var ev1=evs[0];var ev2=evs[1];return ev1.split('_')[0].trim()+' > '+ev2.split('_')[0].trim();" +
    "   }    },    legend: {        orient: 'vertical',            x:'left',            data:[{$legendData}]," +
    "       selectedMode: 'multiple ',            show :false,            selected:{            {$legendSelected}" +
    "   },        textStyle : {            color: '#fff'        }    }," +
    "dataRange: {        show : false,            min : 0,            max : 100,            range: {            start: 0," +
    "           end: 100        },        x: 'right',            calculable : true,            color: ['#ff3333', 'orange', 'yellow','lime','aqua']," +
    "       textStyle:{            color:'#fff'        }    }," +
    "series : [        {            name:'quanxitong',            type:'map',            mapType: 'none'," +
    "       data:[],            geoCoord: {        {$geoCoord}            },            markPoint : {" +
    "           symbol:'emptyCircle',                symbolSize : function (v){      if(v%10==1){return 2;}  if(v<0){return 2;}else{return 5; }                           }," +
    "           effect : {                    show: false,                    shadowBlur : 0" +
    "           },                itemStyle:{                    normal:{                        label:{show:false}                    }" +
    "           },                data : [                    {$markerPoint}                ]            }," +
    "       markLine : {                clickable :false,                smooth:true,                effect : {                    show: true," +
    "               scaleSize: 1,                    period: 30,                    color: '#fff',                    shadowBlur: 10                },          " +
    "           symbol: ['none', 'circle'],                symbolSize : 1,                itemStyle : {" +
    "               normal: {             label:{show:false} ,           color:'#fff',                        borderWidth:1," +
    "                   borderColor:'rgba(30,144,255,0.5)'                    }                },                data : [                    {$markerLine}                ]" +
    "       }        }        {$serialData}  ,      {            name:'故障设备',            type:'map',            mapType: 'none'," +
    "       data:[],            markLine : {                clickable :false,                smooth:true,                effect : {" +
    "               show: true,                    scaleSize: 1,                    period: 30,                    color: '#fff'," +
    "               shadowBlur: 10                },                itemStyle : {                    normal: {   label:{show:false} ,                     borderWidth:1," +
    "                   lineStyle: {                            type: 'solid',                            shadowBlur: 10                        }                    }                }," +
    "           data : [                ]            },            markPoint : {                symbol:'emptyCircle',                symbolSize : function (v){" +
    "               return 10 + v/10                },                effect : {                    show: true,                    shadowBlur : 0                }," +
    "           itemStyle:{                    normal:{                        label:{show:false}                    }                }," +
    "           data : [                    {$ERRPoint}                ]            }        }    ]};";
var template40101="" +
    "{    name:'{$markerName}',        type:'map',    mapType: 'none',    data:[],    markLine : {    clickable :false," +
    "        smooth:true,        effect : {show: true,scaleSize: 1,period: 30,color: '#fff',shadowBlur: 10}," +
    "    itemStyle : {normal: {label:{show:false} ,borderWidth:1,lineStyle: { type: 'solid',shadowBlur: 10 }}}," +
    "   data : [         {$markerLine}      ] },    markPoint : {        symbol:'emptyCircle'," +
    "          symbolSize : function (v){return 10 + v/10},        effect : {show: true,shadowBlur : 0 }," +
    "       itemStyle:{normal:{ label:{show:false} }},        data : [          {$markerPoint}       ]} }        " +
    "";
var template40200="" +
    "{    title : {        text: '',            subtext: ''    },    tooltip : {        trigger: 'item',            formatter: \"{b}\"    },    toolbox: {        show : false,            feature : {" +
    "   mark : {show: true},            dataView : {show: true, readOnly: false},            restore : {show: true},            saveAsImage : {show: true}        }    }," +
    "series : [        {            name:'{$treeName}',            type:'tree',            orient: 'vertical',              rootLocation: {x: 'center', y: 24}," +
    "       nodePadding: 50,            symbol: 'circle',            symbolSize: 40,            roam:true,            itemStyle: {                normal: {                    label: {" +
    "   show: true,                        position: 'inside',                        textStyle: {                            color: '#cc9999',                            fontSize: 12,                            fontWeight:  'bolder'                        }                    },                    lineStyle: {" +
    "  color: '#0066CC',                        width: 1,                        type: 'curve'                     }                },                emphasis: {                    label: {                        show: true                    }                }            }," +
    "  data: [{$treeData}]        }    ]};";
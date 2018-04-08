/**
 * @fileOverview  百度地图图形绘制，数据转换类
 * {
 * id:'d+new Date().getTime()',
 * type:'rectangle', //rectangle,circle,polygon,polyline,curve
 * data:[{lng:120.34123,lat:36.23213},{lng:120.34123,lat:36.23213}]
 * radius:100// circle only
 * }
 * @author Guoying 2016-09-22
 * @version 1.0
 */

//Data Struct Json
//

function drawRectangle()
{
    var bounds = map.getBounds();   //获取可视区域
    var bssw = bounds.getSouthWest();   //可视区域左下角
    var bsne = bounds.getNorthEast();   //可视区域右上角

}
function Rectangle(pStart,pEnd)
{
    this.option={
        id:'d+new Date().getTime()',
        type:'rectangle', //rectangle,circle,polygon,polyline,curve
        data:[
            {lng:pStart.lng,lat:pStart.lat},{lng:pEnd.lng,lat:pStart.lat},{lng:pEnd.lng,lat:pEnd.lat},{lng:pStart.lng,lat:pEnd.lat}
            ] ,
        radius:100
    }
    this.polygon= new BMap.Polygon([
    new BMap.Point(pStart.lng,pStart.lat),
    new BMap.Point(pEnd.lng,pStart.lat),
    new BMap.Point(pEnd.lng,pEnd.lat),
    new BMap.Point(pStart.lng,pEnd.lat)
    ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});
    this.json=function()
    {

    }

}

function drawCircle()
{

}
function drawPolygon()
{

}
function drawPolyline()
{

}
function drawCurve()
{

}
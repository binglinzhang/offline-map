//图片放大镜效果
$(function(){

});

//图片预览小图移动效果,页面加载时触发
$(function(){

});
function initPreview()
{
	$(".jqzoom").jqueryzoom({xzoom:380,yzoom:410});
	var tempLength = 0; //临时变量,当前移动的长度
	var viewNum = 5; //设置每次显示图片的个数量
	var moveNum = 2; //每次移动的数量
	var moveTime = 300; //移动速度,毫秒
	var scrollDiv = $(".spec-scroll .items ul"); //进行移动动画的容器
	var scrollItems = $(".spec-scroll .items ul li"); //移动容器里的集合
	var moveLength = scrollItems.eq(0).width() * moveNum; //计算每次移动的长度
	var countLength = (scrollItems.length - viewNum) * scrollItems.eq(0).width(); //计算总长度,总个数*单个长度

	//下一张
	$(".spec-scroll .next").bind("click",function(){
		//alert('next'+tempLength+'\r\n'+countLength);
		if(tempLength < countLength){
			if((countLength - tempLength) > moveLength){
				scrollDiv.animate({left:"-=" + moveLength + "px"}, moveTime);
				tempLength += moveLength;
			}else{
				scrollDiv.animate({left:"-=" + (countLength - tempLength) + "px"}, moveTime);
				tempLength += (countLength - tempLength);
			}
		}
	});
	//上一张
	$(".spec-scroll .prev").bind("click",function(){
		//alert('prev'+tempLength+'\r\n'+moveLength);
		if(tempLength > 0){
			if(tempLength > moveLength){
				scrollDiv.animate({left: "+=" + moveLength + "px"}, moveTime);
				tempLength -= moveLength;
			}else{
				scrollDiv.animate({left: "+=" + tempLength + "px"}, moveTime);
				tempLength = 0;
			}
		}
	});
}
//鼠标经过预览图片函数
function preview(img){
	$("#preview .jqzoom img").attr("src",$(img).attr("src"));
	$("#preview .jqzoom img").attr("jqimg",$(img).attr("bimg"));
	document.getElementById('previewImg').style.display='';
	document.getElementById('qrcodeBig').style.display='none';
}
function imgLoaded(img){
	/*var width=$("#preview .jqzoom img").attr("width");
	var height=$("#preview .jqzoom img").attr("height");
	alert(width+'\r\n'+height);*/
}

function adapt(obj)
{
	var img = new Image();	
	img.src =$(obj).attr("src") ;	
	var imgWidth = img.width; 
	var imgHeight=img.height;
	var maxWidth=290;
	var maxHeight=218;
	var setWidth=290;
	var setHeight=218;
	var padLeft=0;//初始左偏
	var padTop=0;//初始右偏
	if((imgWidth/imgHeight)>(maxWidth/maxHeight))//实际宽高比>最佳宽高比  == 宽度大了
	{
		setHeight=setWidth*imgHeight/imgWidth;//按照宽度等比例缩放
		padTop+=(maxHeight-setHeight)/2;
	}
	else
	{
		setWidth=setHeight*imgWidth/imgHeight;//按照高度等比例缩放
		padLeft+=(maxWidth-setWidth)/2;
	}
	

    $(obj).css('padding-top',padTop);
    $(obj).css('padding-bottom',padTop);
    $(obj).css('padding-left',padLeft);
    $(obj).css('padding-right',padLeft);
    $(obj).width(setWidth);

    $(obj).height(setHeight);

	
	
} 








function initSelecter(id,list,default_value)
{
	value=default_value;
	name='';
	this.id=id;
	this.data=list;
	selectIdx=-1;
	this.getValue=function()
	{
		var txt=$('#'+id+'_select_input').val();
		//alert($('#'+id+'_select_input').val()+'-\r\n-'+name);
		if(name!=txt)
		{
			return '';
		}else
		{
			return value;
		}
	}
	this.getText=function()
	{
		var txt=$('#'+id+'_select_input').val();
		if(name!=txt)
		{
			return '';
		}else
		{
			return name;
		}
	}
	this.clear=function()
	{
		list=new Array();
		$('#'+id+'_select_input_list').empty();
		$('#'+id+'_select_input').val('');
	}
	this.selectByIdx=function(sidx)
	{
		var li=$('#'+id+'_select_input_list td:eq('+sidx+')');
		if(li)
		{
			default_value=li.attr('code');
			name=li.attr('name');
			value=default_value;
			$('#'+id+'_select_input').val(name);
		}
	}
	this.addSelect=function(addlist)
	{
		var newlist=new Array();
		for(var i=0;i<list.length;i++)
		{
			newlist.push(list[i]);
		}
		for(var i=0;i<addlist.length;i++)
		{
			newlist.push(addlist[i]);
		}
		list=newlist;
		$('#'+id+'_select_input_list').empty();
		var tableHtml="";
		tableHtml+="<table width=\"230\"  border=\"0\" cellspacing=\"1\" cellpadding=\"1\">";
		if(list)
		{
			if(list.length>0)
			{
				for(var i=0;i<list.length;i++)
				{
					if(list[i].value==default_value)
					{
						tableHtml+="<tr><td code=\""+list[i].value+"\" name=\""+list[i].name+"\" class=\"select_input_list_items_selected\">"+list[i].name+"</td></tr>";
					}else
					{
						tableHtml+="<tr><td code=\""+list[i].value+"\" name=\""+list[i].name+"\" class=\"select_input_list_items\">"+list[i].name+"</td></tr>";
					}
				}			
				
			}else
			{
				//数据为0条
			}
		}else
		{
			//无数据
		}	
		tableHtml+="</table>";
		$('#'+id+'_select_input_list').append(tableHtml);
		$('#'+id+'_select_input_list td').on('mousedown',
		function()
			{
				default_value=$(this).attr('code');
				name=	$(this).attr('name');
				value=default_value;
				$(input).val($(this).attr('name'));
				
		});
	}
	var selectControl=$('#'+id);
	selectControl.empty();
	var input = document.createElement("input");
	var selectList = document.createElement("div");
	$(input).attr('id',id+'_select_input');
	$(input).attr('class','select_input');
	$(input).focusin(function()
	{
		$(selectList).css('display','');
		var items=$('#'+id+'_select_input_list td');
		for(var i=0;i<items.length;i++)
		{
			var li=$('#'+id+'_select_input_list td:eq('+i+')');
			li.attr('class','select_input_list_items');
			if(li.attr('code')==default_value)
			{
				li.attr('class','select_input_list_items_selected');
			}
		}
	});
	$(input).on('keyup',function()
	{
		var enterIdx=-1;
		selectIdx=-1;
		$(selectList).css('display','');
		var items=$('#'+id+'_select_input_list td');
		var inputContent=$(input).val();
		//alert(inputContent);
		var idx=0;			
		for(var i=0;i<items.length;i++)
		{
			var li=$('#'+id+'_select_input_list td:eq('+i+')');
			li.attr('class','select_input_list_items');		
			if(inputContent.trim()!=''&&li.attr('name').length==(li.attr('name').replace(inputContent.trim(),'')).length)
			{
				li.css('display','none');
			}else
			{
				li.css('display','');
				idx++;
				if(li.attr('code')==default_value)
				{
					li.attr('class','select_input_list_items_selected');
					selectIdx=idx-1;		
					enterIdx=i;			
				}
			}			
		}		
		if(event.keyCode==38)//up
		{
			if(selectIdx<=0)
			{
				selectIdx=0;
			}else
			{
				selectIdx--;
			}
			//alert(selectIdx);
			var tidx=0;
			for(var i=0;i<items.length;i++)
			{
				var li=$('#'+id+'_select_input_list td:eq('+i+')');
				li.attr('class','select_input_list_items');		
				if(li.css('display')!='none')// visable item
				{
					if(tidx==selectIdx)
					{
						li.attr('class','select_input_list_items_selected');	
						default_value=li.attr('code');
						name=li.attr('name');
						value=default_value;		
						enterIdx=i;		
					}
				}
				tidx++;
			}
		}else
		if(event.keyCode==40)//down
		{
			if(selectIdx>=idx-1)
			{
				selectIdx=idx-1;
			}else
			{
				selectIdx++;
			}
			//alert(selectIdx);
			var tidx=0;
			for(var i=0;i<items.length;i++)
			{
				var li=$('#'+id+'_select_input_list td:eq('+i+')');
				li.attr('class','select_input_list_items');		
				if(li.css('display')!='none')// visable item
				{
					if(tidx==selectIdx)
					{
						li.attr('class','select_input_list_items_selected');
						default_value=li.attr('code');
						name=li.attr('name');
						value=default_value;
						enterIdx=i;
					}
					tidx++;
				}
			}
		}else
		if(event.keyCode==13)//enter
		{
			var li=$('#'+id+'_select_input_list td:eq('+enterIdx+')');
			$(input).val(li.attr('name'));	
			default_value=li.attr('code');
			name=li.attr('name');
			value=default_value;
			$(selectList).css('display','none');
		}else
		{
			
		}
		//alert(event.keyCode);
	});
	$(input).focusout(function()
	{
		$(selectList).css('display','none');
	});
	
	$(selectList).attr('id',id+'_select_input_list')
	$(selectList).attr('class','select_input_list');
	$(selectList).css('display','none');
	$(selectList).empty();
	var tableHtml="";
	tableHtml+="<table width=\"230\"  border=\"0\" cellspacing=\"1\" cellpadding=\"1\">";
	if(list)
	{
		if(list.length>0)
		{
			for(var i=0;i<list.length;i++)
			{
				if(list[i].value==default_value)
				{
					tableHtml+="<tr><td code=\""+list[i].value+"\" name=\""+list[i].name+"\" class=\"select_input_list_items_selected\">"+list[i].name+"</td></tr>";
				}else
				{
					tableHtml+="<tr><td code=\""+list[i].value+"\" name=\""+list[i].name+"\" class=\"select_input_list_items\">"+list[i].name+"</td></tr>";
				}
			}			
			
		}else
		{
			//数据为0条
		}
	}else
	{
		//无数据
	}	
	tableHtml+="</table>";
	$(selectList).append(tableHtml);
	
	selectControl.append(input);
	selectControl.append(selectList);
	
	

	
	$('#'+id+'_select_input_list td').on('mousedown',
	function()
		{
			default_value=$(this).attr('code');
			name=	$(this).attr('name');
			value=default_value;
			$(input).val($(this).attr('name'));
			
	});
	return this;
}
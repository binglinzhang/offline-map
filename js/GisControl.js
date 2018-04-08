// ########################################################
// 1.0左上控件
// ########################################################
function TopLeftControl() {
	this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
	this.defaultOffset = new BMap.Size(5, 11);
}

function createTopLeftControl() {
	// 通过JavaScript 的prototype 属性继承于BMap.Control

	TopLeftControl.prototype = new BMap.Control();

	// 自定义控件必须实现initialize 方法，并且将控件的DOM 元素返回
	// 在本方法中创建个div 元素作为控件的容器，并将其添加到地图容器中
	TopLeftControl.prototype.initialize = function(map) {

		$("#div_hide")
				.append(
						"<div class='divcss_top_left_control' id='divcss_top_left_control'></div>");
		$("#divcss_top_left_control")
				.append(
						"<input name='top_left_search_content' id='top_left_search_content' class='divcss_top_left_control_input' value='请输入查询条件...' onfocus='top_left_input_cls()' onblur='top_left_input_dosearch()' onkeypress='top_left_input_pre(this)' />");
		$("#divcss_top_left_control")
				.append(
						"<img src='../../../resources/img/top_left_search_button.png' class='divcss_top_left_control_img' onclick='top_left_input_dosearch()' />");

		var _div = $("#divcss_top_left_control")[0];
		// 添加DOM 元素到地图中
		map.getContainer().appendChild(_div);
		// 将DOM 元素返回
		return _div;
	};
}

// ########################################################
// 2.0右上控件
// ########################################################
function TopRightControl() {
	this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	this.defaultOffset = new BMap.Size(20, 11);
}

function createTopRightControl() {
	// 通过JavaScript 的prototype 属性继承于BMap.Control

	TopRightControl.prototype = new BMap.Control();

	// 自定义控件必须实现initialize 方法，并且将控件的DOM 元素返回
	// 在本方法中创建个div 元素作为控件的容器，并将其添加到地图容器中
	TopRightControl.prototype.initialize = function(map) {

		var _div = document.createElement("div");
		_div.setAttribute("class", "divcss_top_right_control");

		var label_city = document.createElement("label");
		label_city.setAttribute("for", "top_right_city");
		label_city.setAttribute("class", "divcss_top_right_control_label_1");
		label_city.innerHTML = "城市:";
		var select_city = document.createElement("select");
		select_city.setAttribute("name", "top_right_city");
		select_city.setAttribute("id", "top_right_city");
		select_city.setAttribute("class", "divcss_top_right_control_select");
		select_city.setAttribute("onchange", "top_right_city_onchange()");

		initTopRightCity();

		var label_project = document.createElement("label");
		label_project.setAttribute("for", "top_right_project");
		label_project.setAttribute("class", "divcss_top_right_control_label_1");
		label_project.innerHTML = "项目:";
		var select_project = document.createElement("select");
		select_project.setAttribute("name", "top_right_project");
		select_project.setAttribute("id", "top_right_project");
		select_project.setAttribute("class", "divcss_top_right_control_select");
		select_project.setAttribute("onchange", "top_right_project_onchange()");

		select_project.innerHTML = "<option value=''>全部</option>";

		var label_area = document.createElement("label");
		label_area.setAttribute("for", "top_right_area");
		label_area.setAttribute("class", "divcss_top_right_control_label_2");
		label_area.innerHTML = "行政区划:";
		var select_area = document.createElement("select");
		select_area.setAttribute("name", "top_right_area");
		select_area.setAttribute("id", "top_right_area");
		select_area.setAttribute("class", "divcss_top_right_control_select");
		select_area.setAttribute("onchange", "top_right_area_onchange(true)");
		select_area.innerHTML = "<option value=''>全部</option>";
		
		/* 
		 * 20160726 组织暂时注释掉
		var label_org = document.createElement("label");
		label_org.setAttribute("for", "top_right_org");
		label_org.setAttribute("class", "divcss_top_right_control_label_1");
		label_org.innerHTML = "组织:";
		var select_org = document.createElement("select");
		select_org.setAttribute("name", "top_right_org");
		select_org.setAttribute("id", "top_right_org");
		select_org.setAttribute("class", "divcss_top_right_control_select");
		select_org.setAttribute("onchange", "top_right_org_onchange(true)");
		select_org.innerHTML = "<option value=''>全部</option>";
		*/
		_div.appendChild(label_city);
		_div.appendChild(select_city);
		_div.appendChild(label_project);
		_div.appendChild(select_project);
		_div.appendChild(label_area);
		_div.appendChild(select_area);
		/*
		 * 20160726 组织暂时注释掉
		_div.appendChild(label_org);
		_div.appendChild(select_org);
		*/

		// 添加DOM 元素到地图中
		map.getContainer().appendChild(_div);
		// 将DOM 元素返回
		return _div;
	};
}

// ########################################################
// 3.0右侧控件
// ########################################################
function RightControl() {
	this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	this.defaultOffset = new BMap.Size(20, 100);
}

function createRightControl() {
	// 通过JavaScript 的prototype 属性继承于BMap.Control

	RightControl.prototype = new BMap.Control();

	// 自定义控件必须实现initialize 方法，并且将控件的DOM 元素返回
	// 在本方法中创建个div 元素作为控件的容器，并将其添加到地图容器中
	RightControl.prototype.initialize = function(map) {
		// 创建一个DOM 元素
		var _div = document.createElement("div");
		_div.setAttribute("class", "divcss_right_control");

		var img1 = document.createElement("img");
		var img2 = document.createElement("img");
		var img3 = document.createElement("img");
		var img4 = document.createElement("img");
		var img5 = document.createElement("img");

		img1.setAttribute("src",
				"../../../resources/img/right_control_1_layers.png");
		img2.setAttribute("src",
				"../../../resources/img/right_control_2_devicetype.png");
		img3.setAttribute("src",
				"../../../resources/img/right_control_3_service.png");
		img4.setAttribute("src",
				"../../../resources/img/right_control_4_hot_search.png");
		img5.setAttribute("src",
				"../../../resources/img/right_control_5_search.png");

		img1.setAttribute("class", "divcss_right_control_img");
		img2.setAttribute("class", "divcss_right_control_img");
		img3.setAttribute("class", "divcss_right_control_img");
		img4.setAttribute("class", "divcss_right_control_img");
		img5.setAttribute("class", "divcss_right_control_img");

		img1.setAttribute("onclick", "right_device_layer_click()");

		_div.appendChild(img1);
		_div.appendChild(img2);
		_div.appendChild(img3);
		_div.appendChild(img4);
		_div.appendChild(img5);

		// 添加DOM 元素到地图中
		map.getContainer().appendChild(_div);
		// 将DOM 元素返回
		return _div;
	};
}

// ########################################################
// 3.1右侧设备类型层控件
// ########################################################
function RightDeviceLayerControl() {
	this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
	this.defaultOffset = new BMap.Size(65, 100);
}

function createRightDeviceLayerControl() {
	// 通过JavaScript 的prototype 属性继承于BMap.Control
	RightDeviceLayerControl.prototype = new BMap.Control();

	// 自定义控件必须实现initialize 方法，并且将控件的DOM 元素返回
	// 在本方法中创建个div 元素作为控件的容器，并将其添加到地图容器中
	RightDeviceLayerControl.prototype.initialize = function(map) {
		$("#div_hide")
				.append(
						"<div class='divcss_right_control_device_layer' id='right_control_device_layer'></div>");
		$("#right_control_device_layer")
				.append(
						"<div align='right'><a href='#' class='divcss_right_control_device_layer_close' onclick=turnoff('right_control_device_layer')><img src='../../../resources/img/right_control_close.png' alt='close' /></a></div>")
				.append(
						"<div class='divcss_right_control_device_layer_title'>设备图层</div>")
				.append(
						"<div class='divcss_right_control_device_layer_content' id='right_control_device_layer_d'></div>")
				.append(
						"<div class='divcss_right_control_device_layer_title'>设施图层</div>")
				.append(
						"<div class='divcss_right_control_device_layer_content' id='right_control_device_layer_f'></div>");

		// 设备层
		$
				.ajax({
					type : "get",
					url : "getDeviceTypeOfEquipmentJson.do",
					data : {},
					dataType : "json",
					success : function(msg) {
						if (msg != null && msg.length > 0) {
							var right_devicelayer_e_val = $(
									"#right_devicelayer_e_checkbox").val();

							var e_val_flag = false;
							var e_val_arr = null;
							if (right_devicelayer_e_val != null
									&& right_devicelayer_e_val != ""
									&& right_devicelayer_e_val.length > 0) {
								e_val_flag = true;
								e_val_arr = right_devicelayer_e_val.split(",");
							}

							for ( var i = 0; i < msg.length; i++) {
								var devicetype_id = msg[i].DEVICETYPE_ID;
								var devicetype_name = msg[i].DEVICETYPE_NAME;

								$("#right_control_device_layer_d")
										.append(
												"<div class='divcss_right_control_device_layer_content_c'>"
														+ "<input type='checkbox' name='right_devicelayer_e_checkbox' id='device_"
														+ devicetype_id
														+ "' value='"
														+ devicetype_id
														+ "' onclick='right_devicelayer_e_checkbox_onclick()' />"
														+ "<label for='device_"
														+ devicetype_id + "'>"
														+ devicetype_name
														+ "</label><div>");
								if (e_val_flag == true && e_val_arr.length > 0) {
									for ( var j = 0; j < e_val_arr.length; j++) {
										if (devicetype_id == e_val_arr[j]) {
											$("#device_" + devicetype_id).attr(
													"checked", true);
											break;
										}
									}
								}
							}
						}
					}
				});

		// 设施层
		$
				.ajax({
					type : "get",
					url : "getDeviceTypeOfFacilitiesJson.do",
					data : {},
					dataType : "json",
					success : function(msg) {
						if (msg != null && msg.length > 0) {

							var right_devicelayer_f_val = $(
									"#right_devicelayer_f_checkbox").val();

							var f_val_flag = false;
							var f_val_arr = null;
							if (right_devicelayer_f_val != null
									&& right_devicelayer_f_val != ""
									&& right_devicelayer_f_val.length > 0) {
								f_val_flag = true;
								f_val_arr = right_devicelayer_f_val.split(",");
							}

							for ( var i = 0; i < msg.length; i++) {
								var devicetype_id = msg[i].DEVICETYPE_ID;
								var devicetype_name = msg[i].DEVICETYPE_NAME;
								$("#right_control_device_layer_f")
										.append(
												"<div class='divcss_right_control_device_layer_content_c'>"
														+ "<input type='checkbox' name='right_devicelayer_f_checkbox' id='device_"
														+ devicetype_id
														+ "' value='"
														+ devicetype_id
														+ "' onclick='right_devicelayer_f_checkbox_onclick()' />"
														+ "<label for='device_"
														+ devicetype_id + "'>"
														+ devicetype_name
														+ "</label><div>");
								// 选中默认值
								if (f_val_flag == true && f_val_arr.length > 0) {
									for ( var j = 0; j < f_val_arr.length; j++) {
										if (devicetype_id == f_val_arr[j]) {
											$("#device_" + devicetype_id).attr(
													"checked", true);
											break;
										}
									}
								}
							}
						}
					}
				});

		var _div = $("#right_control_device_layer")[0];
		// 添加DOM 元素到地图中
		map.getContainer().appendChild(_div);
		// 将DOM 元素返回
		return _div;
	};
}

// ########################################################
// 4.0左下控件
// ########################################################
function BottomLeftControl() {
	this.defaultAnchor = BMAP_ANCHOR_BOTTOM_LEFT;
	this.defaultOffset = new BMap.Size(350, 5);
}

function createBottomLeftControl() {
	// 通过JavaScript 的prototype 属性继承于BMap.Control
	BottomLeftControl.prototype = new BMap.Control();

	// 自定义控件必须实现initialize 方法，并且将控件的DOM 元素返回
	// 在本方法中创建个div 元素作为控件的容器，并将其添加到地图容器中
	BottomLeftControl.prototype.initialize = function(map) {
		$("#div_hide")
				.append(
						"<div class='divcss_bottom_left_control' id='bottom_left_control'></div>");
		$("#bottom_left_control")
				.append(
						"<div class='divcss_bottom_left_control_c' id='status_0'>总数:<b id='bottom_left_b_0'>0</b></label></div>")
				.append(
						"<div class='divcss_bottom_left_control_c' id='status_1'><input id='bottom_left_input_1' name='bottom_left_input' checked='checked' type='checkbox' onclick='bottom_left_onclick()' value='1'/><label for='bottom_left_input_1'>正常:<b id='bottom_left_b_1'>0</b></label></div>")
				.append(
						"<div class='divcss_bottom_left_control_c' id='status_2'><input id='bottom_left_input_2' name='bottom_left_input' checked='checked' type='checkbox' onclick='bottom_left_onclick()' value='2'/><label for='bottom_left_input_2'>故障:<b id='bottom_left_b_2'>0</b></label></div>")
				.append(
						"<div class='divcss_bottom_left_control_c' id='status_3'><input id='bottom_left_input_3' name='bottom_left_input' checked='checked' type='checkbox' onclick='bottom_left_onclick()' value='3'/><label for='bottom_left_input_3'>拆除:<b id='bottom_left_b_3'>0</b></label></div>")
				.append(
						"<div class='divcss_bottom_left_control_c' id='status_4'><input id='bottom_left_input_4' name='bottom_left_input' checked='checked' type='checkbox' onclick='bottom_left_onclick()' value='4'/><label for='bottom_left_input_4'>停用:<b id='bottom_left_b_4'>0</b></label></div>");

		var _div = $("#bottom_left_control")[0];
		// 添加DOM 元素到地图中
		map.getContainer().appendChild(_div);
		// 将DOM 元素返回
		return _div;
	};
}

// FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
// 功能函数
// FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF
// 0.0.1
function common_doSearch(bottom_left_refresh, bottom_left_device_status) {
	mapApp.clearOverlays();
	// 获取参数
	var top_left_search_content = $("#top_left_search_content")[0].value;
	var top_right_city = $("#top_right_city")[0].value;
	var top_right_project = $("#top_right_project")[0].value;
	var top_right_area = $("#top_right_area")[0].value;
	/*
	 * 20160726 组织暂时注释掉
	var top_right_org = $("#top_right_org")[0].value;
	 */
	var right_devicelayer_e_checkbox = $("#right_devicelayer_e_checkbox")[0].value;
	var right_devicelayer_f_checkbox = $("#right_devicelayer_f_checkbox")[0].value;
	var right_devicelayer_devicetype = right_devicelayer_e_checkbox + ''
			+ right_devicelayer_f_checkbox;

	if (top_left_search_content == '请输入查询条件...') {
		top_left_search_content = '';
	}

	if (top_right_project != null && top_right_project != ""
			&& right_devicelayer_devicetype != null
			&& right_devicelayer_devicetype != "") {
		$.ajax({
			type : "get",
			url : "getGisJsonData.do",
			data : {
				,
				top_right_city : top_right_city,
				top_right_project : top_right_project,
				top_right_area : top_right_area,
				/*
				 * 20160726 组织暂时注释掉
				top_right_org : top_right_org,
				 */
				right_devicelayer_devicetype : right_devicelayer_devicetype,
				bottom_left_device_status : bottom_left_device_status
			},
			dataType : "json",
			success : function(msg) {
				if (msg != null && msg.length > 0) {
					for ( var i = 0; i < msg.length; i++) {
						var device_sn = msg[i].DEVICE_SN;
						var project_id = msg[i].PROJECT_ID;
						// 经度
						var longitude = msg[i].LONGITUDE;
						// 纬度
						var latitude = msg[i].LATITUDE;
						var img_path = msg[i].IMG_PATH;
						var devicetype_id = msg[i].DEVICETYPE_ID;
						var devicetype_name = msg[i].DEVICETYPE_NAME;

						mapApp.defaultDrowPointChangeImg(img_path, longitude,
								latitude, devicetype_name, project_id,
								device_sn, devicetype_id);
					}
				} else {
					parentView.alert("未查询到任何数据！");
				}
			}
		});
		if (bottom_left_refresh==true || bottom_left_refresh==null || bottom_left_refresh==undefined){
			//top_left_search_content=encodeURIComponent(encodeURIComponent(top_left_search_content));
			$.ajax({
				type : "get",
				url : "getGisStatisDataByDeviceStatus.do",
				data : {
					,
					top_right_city : top_right_city,
					top_right_project : top_right_project,
					top_right_area : top_right_area,
					/*
					 * 20160726 组织暂时注释掉
					top_right_org : top_right_org,
					 */
					right_devicelayer_devicetype : right_devicelayer_devicetype
				},
				dataType : "json",
				success : function(msg) {
					return;
					if (msg != null && msg.length > 0) {
						for ( var i = 0; i < msg.length; i++) {
							var status_code = msg[i].STATUS_CODE;
							// var status_name = msg[i].STATUS_NAME;
							var device_num = msg[i].DEVICE_NUM;
							$("#bottom_left_b_" + status_code).html(device_num);
						}
					} else {
						// parentView.alert("未查询到任何数据！");
					}
				}
			});
		}
	} 

	if (bottom_left_refresh==true || bottom_left_refresh==null || bottom_left_refresh==undefined){
		$("#bottom_left_b_1").html(0);
		$("#bottom_left_b_2").html(0);
		$("#bottom_left_b_3").html(0);
		$("#bottom_left_b_4").html(0);
		$("#bottom_left_b_0").html(0);
		$("#bottom_left_input_1").attr("checked", "checked");
		$("#bottom_left_input_2").attr("checked", "checked");
		$("#bottom_left_input_3").attr("checked", "checked");
		$("#bottom_left_input_4").attr("checked", "checked");
		$("#bottom_left_input_0").attr("checked", "checked");
	}
}

// 0.0.2
function device_detail_video_onclick(){
	document.getElementById("videoDiv").style.display='block';
	document.getElementById("fade").style.display='block' ;
	var bgdiv = document.getElementById("fade");
	bgdiv.style.width = document.body.scrollWidth;
	// bgdiv.style.height = $(document).height();
	$("#fade").height($(document).height());
	
	// TODO 以下代码待测试
	//登录
	var strURL = document.getElementById("URL").value;
	commonVideoActiveX.GetInstance(strURL);
	//播放视频不可操作云台
	var cameraid = document.getElementById("Camera").value;
    commonVideoActiveX.Play(cameraid, 0);
}

// 0.0.3
//关闭弹出层
function device_detail_videoDiv_close(show_div,bg_div)
{
document.getElementById(show_div).style.display='none';
document.getElementById(bg_div).style.display='none';
}

// 0.0.4
function Login()
{
  var strURL = "http://10.16.1.72:8080/VideoService/query?wsdl";
	commonVideoActiveX.GetInstance(strURL);
}

// 0.0.5
function WriteLog2(text)
{    
  log.innerHTML = text + "<br />" + log.innerHTML;
}

// 1.0.1
function top_left_input_cls() {
	var input_1 = document.getElementById("top_left_search_content");
	var value = input_1.value;
	if (value.length > 0 && value == '请输入查询条件...') {
		input_1.value = '';
		input_1.focus();
	}
}

// 1.0.2
function top_left_input_dosearch() {
	var value = document.getElementById("top_left_search_content").value;
	if (value.length > 0 && value != '请输入查询条件...') {
		common_doSearch(true, null);
	} else {
		parentView.alert("请输入设备名称或设备编号！");
		$("#top_left_search_content").focus();
	}
}

// 1.0.3
function top_left_input_pre(el) {
	el.style.color = "blue";
};

// 2.0.1
function initTopRightCity() {
	$.ajax({
		type : "get",
		url : "getCitysJson.do",
		// data: {city_code:value},
		dataType : "json",
		success : function(msg) {
			if (msg != null && msg.length > 0) {
				var innerHTML = "<option value=''>请选择...</option>";
				for ( var i = 0; i < msg.length; i++) {
					var tmp = "<option value='" + msg[i].CITY_ID + "'>"
							+ msg[i].CITY_NAME + "</option>";
					innerHTML += tmp;
				}
				var topRightCity = document.getElementById("top_right_city");
				topRightCity.innerHTML = innerHTML;
			}
		}
	});
}

// 2.0.2
function top_right_city_onchange() {
	var value = document.getElementById("top_right_city").value;
	if (value.length > 0) {
		// 设置城市中心点
		$.ajax({
			type : "get",
			url : "getCityInfoJson.do",
			data : {
				city_code : value
			},
			dataType : "json",
			success : function(msg) {
				if (msg != null && msg.length > 0) {
					var longitude = msg[0].LONGITUDE;
					var latitude = msg[0].LATITUDE;
					mapApp.setCenterAndZoom(longitude, latitude, 12);
				}
			}
		});
		// 加载城市的项目
		$.ajax({
			type : "get",
			url : "getProjectsJson.do",
			data : {
				city_code : value
			},
			dataType : "json",
			success : function(msg) {
				if (msg != null && msg.length > 0) {
					var innerHTML = "";
					if (msg.length > 1) {
						innerHTML = "<option value=''>请选择...</option>";
					}
					for ( var i = 0; i < msg.length; i++) {
						var tmp = "<option value='" + msg[i].PROJECT_ID + "'>"
								+ msg[i].PROJECT_NAME + "</option>";
						innerHTML += tmp;
					}
					var topRightProject = document
							.getElementById("top_right_project");
					topRightProject.innerHTML = innerHTML;
					var topRightArea = document
							.getElementById("top_right_area");
					topRightArea.innerHTML = "<option value=''>全部</option>";
					/*
					 * 20160726 组织暂时注释掉
					var topRightOrg = document
							.getElementById("top_right_org");
					topRightOrg.innerHTML = "<option value=''>全部</option>";
					 */
					top_right_project_onchange();
				}
			}
		});
	} else {
		var topRightProject = document.getElementById("top_right_project");
		topRightProject.innerHTML = "<option value=''>全部</option>";
		var topRightArea = document.getElementById("top_right_area");
		topRightArea.innerHTML = "<option value=''>全部</option>";
		/*
		 * 20160726 组织暂时注释掉
		var topRightOrg = document.getElementById("top_right_org");
		topRightOrg.innerHTML = "<option value=''>全部</option>";
		 */
		common_doSearch(true, null);
	}
}

// 2.0.3
function top_right_project_onchange() {
	var value = document.getElementById("top_right_project").value;
	if (value.length > 0) {
		// 加载项目所属平台的行政区划
		$
				.ajax({
					type : "get",
					url : "getAreasJson.do",
					data : {
						project_id : value
					},
					dataType : "json",
					success : function(msg) {
						if (msg != null && msg.length > 0) {
							var innerHTML = "";
							innerHTML = "<option selected='selected' value=''>全部</option>";
							for ( var i = 0; i < msg.length; i++) {
								var tmp = null;
								/*
								 * if (i == 0) { tmp = "<option
								 * selected='selected' value='" +
								 * msg[i].AREA_ID_BYSYNCH + "'>" +
								 * msg[i].AREA_NAME + "</option>"; } else { tmp = "<option
								 * value='" + msg[i].AREA_ID_BYSYNCH + "'>" +
								 * msg[i].AREA_NAME + "</option>"; }
								 */
								tmp = "<option value='"
										+ msg[i].AREA_ID_BYSYNCH + "'>"
										+ msg[i].AREA_NAME + "</option>";
								innerHTML += tmp;
							}
							var topRightArea = document
									.getElementById("top_right_area");
							topRightArea.innerHTML = innerHTML;
							top_right_area_onchange(false);
						}
					}
				});
		// 加载项目所属平台的组织
		$
				.ajax({
					type : "get",
					url : "getOrgsJson.do",
					data : {
						project_id : value
					},
					dataType : "json",
					success : function(msg) {
						if (msg != null && msg.length > 0) {
							var innerHTML = "";
							innerHTML = "<option selected='selected' value=''>全部</option>";
							for ( var i = 0; i < msg.length; i++) {
								var tmp = null;
								/*
								 * if (i == 0) { tmp = "<option
								 * selected='selected' value='" +
								 * msg[i].ORG_ID_BYSYNCH + "'>" +
								 * msg[i].ORG_NAME + "</option>"; } else { tmp = "<option
								 * value='" + msg[i].ORG_ID_BYSYNCH + "'>" +
								 * msg[i].ORG_NAME + "</option>"; }
								 */
								tmp = "<option value='" + msg[i].ORG_ID_BYSYNCH
										+ "'>" + msg[i].ORG_NAME + "</option>";
								innerHTML += tmp;
							}
							/*
							 * 20160726 组织暂时注释掉
							var topRightOrg = document
									.getElementById("top_right_org");
							topRightOrg.innerHTML = innerHTML;
							top_right_org_onchange(false);
							*/
						}
					}
				});
		common_doSearch(true, null);
	}
}

// 2.0.4
function top_right_area_onchange(flag) {
	/*
	 * var value = document.getElementById("top_right_area").value; if
	 * (value.length > 0) {
	 */
	if (flag == true || flag == null) {
		common_doSearch(true, null);
	}
	// }
}

// 2.0.5
function top_right_org_onchange(flag) {
	/*
	 * var value = document.getElementById("top_right_org").value; if
	 * (value.length > 0) {
	 */
	if (flag == true || flag == null) {
		common_doSearch(true, null);
	}
	// }
}

// 3.0.1
//右侧设备设施图层 图片选中事件
function right_device_layer_click() {
	var input_right_device_laver = document
			.getElementById("right_device_laver_show");
	var value = input_right_device_laver.value;
	// parentView.alert(value);
	if (value == "0") {
		input_right_device_laver.value = "1";
		mapApp.addRightDeviceLayerControl();
		return;
	} else if (value == "1") {
		input_right_device_laver.value = "0";
		mapApp.removeRightDeviceLayerControl();
		//common_doSearch(true, null);
		return;
	}
}

// 3.1.1
//右侧设备设施图层 设备选中事件
function right_devicelayer_e_checkbox_onclick() {
	// 选中的设备类型
	var str_checked = "";
	$("input[name='right_devicelayer_e_checkbox']").each(
			function() {
				if ($(this).attr('checked') == "checked"
						|| $(this).attr('checked') == true) {
					str_checked += $(this).val() + ",";
				}
			});
	$("#right_devicelayer_e_checkbox").val(str_checked);
	// parentView.alert($("#right_devicelayer_e_checkbox")[0].value);
	common_doSearch(true, null);
}

// 3.1.2
//右侧设备设施图层 设施选中事件
function right_devicelayer_f_checkbox_onclick() {
	// 选中的设备类型
	var str_checked = "";
	$("input[name='right_devicelayer_f_checkbox']").each(
			function() {
				if ($(this).attr('checked') == "checked"
						|| $(this).attr('checked') == true) {
					str_checked += $(this).val() + ",";
				}
			});
	$("#right_devicelayer_f_checkbox").val(str_checked);
	// parentView.alert($("#right_devicelayer_f_checkbox")[0].value);
	common_doSearch(true, null);
}

// 4.0.1
function bottom_left_onclick() {
	var str_checked = "";
	$("input[name='bottom_left_input']").each(
			function() {
				if ($(this).attr('checked') == "checked"
						|| $(this).attr('checked') == true) {
					str_checked += $(this).val() + ",";
				}
			});
	if (str_checked=="" || str_checked.length<=0){
		str_checked="-1";
	}
	common_doSearch(false, str_checked);
}

function turnoff(obj){
	document.getElementById(obj).style.display="none";
}
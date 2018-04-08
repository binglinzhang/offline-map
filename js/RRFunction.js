///**********************************///
//@fileoverview RRF js functions; some common js functions
//Created By Gy at 2016-11-08
//LastEdit By Gy at 2016-11-08
///**********************************///
//input:double_value=0.000-1.000,alpha=0.0-1.0
//return rgba(255,0,0,alpha)-rgba(0,0,255,alpha)
function RR_getColor(double_value,alpha)
{
	if(!alpha)
	{
		alpha=1;
	}	
	var rv=0;
	var gv=0;
	var bv=0;
	var cv=double_value*765;
	if(cv>=510)
	{
		rv=0;
		gv=255;
		bv=cv%510;
	}else if(cv>=255)
	{
		rv=255- cv%255;
		gv=255;
		bv=0;
	}else
	{
		rv=255;
		gv=cv;
		bv=0;
	}
	return  "rgba("+Math.floor(rv)+","+Math.floor(gv)+","+Math.floor(bv)+","+alpha+")";
}

///////////////////////////////////////////////////
//随机数处理函数
function RR_Random_checkRandom(r)
{
	r=eval(r);
	if(Math.random()<=r)
	{
		return true;
	}else
	{
		return false;
	}
}

function Fighter(name)
{
	this.id=name;
	this.name=name;
	this.blood=1000;
	this.attack=100;
	this.defense=30;
	this.baojilv=0.1;
	this.baojizhi=1.5;
	this.mingzhonglv=90;
	this.duobi=0;
	this.beatback=true;
	this.attackIt=function(fighter2,beatback)
	{
		if(this.blood<=0)
		{
			var logstr=this.name+' 你已死亡.';
			console.log(logstr);
			return fighter2;
		}
		if(fighter2.blood<=0)
		{
			var logstr='目标 '+fighter2.name+' 已死亡.';
			//console.log(logstr);
			return fighter2;
		}
		//console.log(fighter2);
		var destroy=0;
		destroy=this.attack-fighter2.defense;
		//console.log(this.attack);
		if(destroy<=0)
		{
			destroy=1;
		}
		if(!RR_Random_checkRandom((this.mingzhonglv-fighter2.duobi)/100))
		{
			destroy=0;
		}
		if(RR_Random_checkRandom(this.baojilv))
		{
			destroy=destroy*this.baojizhi;
		}
		//console.log(destroy);
		destroy=Math.ceil(destroy);
		//console.log(destroy);
		fighter2.blood-=destroy;
		if(fighter2.blood<=0)
		{
			fighter2.blood==0;
			var logstr=this.name +' 攻击 '+ fighter2.name + ' -'+destroy +' '+fighter2.name+'死亡.';
			if(beatback)
			{
				logstr=this.name +' 反击 '+ fighter2.name + ' -'+destroy +' '+fighter2.name+'死亡.';
			}
			console.log(logstr);
			//return;
		}else
		{
			if(destroy<=0)
			{
				destroy='躲避';
			}
			var logstr=this.name +' 攻击 '+ fighter2.name + ' -'+destroy +' '+fighter2.name+' 剩余：'+fighter2.blood;
			if(beatback)
			{
				logstr=this.name +' 反击 '+ fighter2.name + ' -'+destroy +' '+fighter2.name+' 剩余：'+fighter2.blood;
			}
			console.log(logstr);
		}
		return fighter2;
	}
}


var a=new Fighter('A');
var user_list=[];
function init()
{
	a.attack+=100;
	a.blood+=500;
	user_list.push(new Fighter('B1'));
	user_list.push(new Fighter('B2'));
	user_list.push(new Fighter('B3'));
	user_list[1].beatback=false;
	for(var i=0;i<=20;i++)
	{
		attack(0);
	}
	for(var i=0;i<=20;i++)
	{
		attack(1);
	}
	for(var i=0;i<=20;i++)
	{
		attack(2);
	}
	//console.log({taken:new Date().getTi；me(),username:encodeURIComponent(encodeURIComponent('灭绝师太'))}，);
	
	
	
}
function attack(idx)
{
	if(user_list[idx])
	{
		user_list[idx]=a.attackIt(user_list[idx]);
		if(user_list[idx].beatback&&user_list[idx].blood>0)
		{
			a=user_list[idx].attackIt(a,true);
		}
	}
}

//获取元素
var getElem = function(selector){
	return document.querySelector(selector);
}
//获取所有元素
var getAllElem = function(selector){
	return document.querySelectorAll(selector);
}
//获取元素样式
var getCls = function(element){
	return element.getAttribute('class');
}
//设置元素样式
var setCls = function(element,cls){
	return element.setAttribute('class',cls);
}
//元素添加样式
var addCls = function(element , cls){
	var baseCls = getCls(element);
	if( baseCls.indexOf(cls) === -1 ){
		setCls( element,baseCls+" "+cls)
	}
}
//删除样式
var delCls = function ( element, cls){
	var baseCls = getCls(element);
	if( baseCls.indexOf(cls) !== -1 ){
		setCls(element, baseCls.split(cls).join(' ').replace(/\s+/g,' '))
	}
}
//初始化样式 init
var screenAnimateElements = {
	// '.header' : [
	// 	'.header'
	// ],
	'.main' : [
		'.main-heading',
		'.main-subheading'
	],
	'.content-banner' : [
		'.content-banner-heading',
		'.content-banner-subheading'
	],
	'.banner-img' : [
		'.banner-img-peo',
		'.banner-img-rocket'
	],
	'.content-class' : [
		'.content-class-left',
	],
	'.content-class-right' : [
		'.content-class-right-heading',
		'.content-class-right-subheading',
		'.content-class-right-ele'
	],
	'.content-build' : [
		'.content-build-heading',
		'.content-build-subheading'
	],
	'.content-build-sub' : [
		'.content-build-sub'
	],
	'.content-learn' : [
		'.content-learn',
		'.content-learn-heading',
		'.content-learn-subheading'
	]
}

var setScreenAnimateInit = function(screenCls){
	var screen=document.querySelector(screenCls);//获取当前屏的元素
	var animateElements = screenAnimateElements[screenCls]; //需要设置动画元素
	for(var i=0;i<animateElements.length;i++){
		var element = document.querySelector(animateElements[i]);
		var baseCls = element.getAttribute('class');
		element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'-animate-init')
	}	
}
//滚动播放
window.onload =function(){
	for(k in screenAnimateElements){
		if(k==='.main'){
			continue;
		}
		setScreenAnimateInit(k);
	}
}
//设置播放屏幕内元素
var playScreenAnimateDone = function(screenCls){
	var screen=document.querySelector(screenCls);//获取当前屏的元素
	var animateElements = screenAnimateElements[screenCls]; //需要设置动画元素	
	for(var i=0;i<animateElements.length;i++){
		var element = document.querySelector(animateElements[i]);
		var baseCls = element.getAttribute('class');
		element.setAttribute('class',baseCls.replace('-animate-init','-animate-done'));
	}	
}
var navItems = getAllElem(".nav-item");
var outLineItems = getAllElem(".outline-item");

var switchNavItemsActive = function(index){
	for(var i=0;i<navItems.length;i++){
		delCls(navItems[i],'nav-active')
	}
		addCls(navItems[index],'nav-active')
	for(var i=0;i<outLineItems.length;i++){
		delCls(outLineItems[i],'outline-item-status-active')
	}
		addCls(outLineItems[index],'outline-item-status-active')
}
window.onscroll = function(){
	var top = document.body.scrollTop;
	if(top>600){
		addCls(getElem('.header'),'header-5')
		addCls(getElem('.outline'),'outline-in')
	}else{
 		delCls(getElem('.header'),'header-5')
 		delCls(getElem('.outline'),'outline-in')

	}
	if(top>1){
		playScreenAnimateDone(".main");
		switchNavItemsActive(0);
	}
	if(top>600*1){
		playScreenAnimateDone(".content-banner");
		playScreenAnimateDone(".banner-img");
		switchNavItemsActive(1);
	}
	if(top>600*2){
		playScreenAnimateDone(".content-class")
		playScreenAnimateDone(".content-class-right");
		switchNavItemsActive(2);		
	}
	if(top>600*3){
		playScreenAnimateDone(".content-build")
		playScreenAnimateDone(".content-build-sub")
		switchNavItemsActive(3);

	}
	if(top>600*4){
		playScreenAnimateDone(".content-learn")
		switchNavItemsActive(4);

	}
}
//双向定位 
var setNavJump = function(i,lib){
	var item = lib[i];
	item.onclick = function(){
		document.body.scrollTop = i*640;
	}
}
for(var i=0;i<navItems.length;i++){
	setNavJump(i,navItems);
}
for(var i=0;i<outLineItems.length;i++){
	setNavJump(i,outLineItems);
}

//滑动门特效
var navTip = getElem(".nav-tip")
var setTip = function(idx,lib){
	lib[idx].onmouseover = function(){
		navTip.style.left= (idx * 80+30)+'px';
	}

var activeIdx = 0;	
var j=0;
	outLineItems[j].onclick = function(){
		for(j=0;j<outLineItems.length;j++){

		}
	}	
	lib[idx].onmouseout = function(){
		for(var i=0;i<lib.length;i++){
			if( getCls(lib[i]).indexOf('nav-active')> -1 ){
				activeIdx = i;
				break;
			}
		}
		navTip.style.left= (activeIdx * 80+30)+'px';		
	}
}
for (var i=0;i<navItems.length;i++){
	setTip(i,navItems);
}
setTimeout(function(){
playScreenAnimateDone(".main")
},1000)

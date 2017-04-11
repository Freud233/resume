var screenAnimateElements={
	'.header' : [
		'.header'
	],
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
function setScreenAnimate(screenCls){
	var screen=document.querySelector(screenCls);//获取当前屏的元素
	var animateElements = screenAnimateElements[screenCls]; //需要设置动画元素
	var isSetAnimateClass = false ; //是否初始化子元素样式
	var isAnimateDone = false ; // 当前状态是DONE？
	screen.onclick = function(){
		//初始化，增加 init   A A-init
		if( isSetAnimateClass === false){
			for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');
				element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'-animate-init')
			}
			isSetAnimateClass = true ;
			return ;
		}
		// init -> done
		if (isAnimateDone === false) {
			for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');
				element.setAttribute('class',baseCls.replace('-animate-init','-animate-done'));
			}
			isAnimateDone = true ;
			return ;
		}
		// done -> init
		if (isAnimateDone === true) {
			for(var i=0;i<animateElements.length;i++){
				var element = document.querySelector(animateElements[i]);
				var baseCls = element.getAttribute('class');
				element.setAttribute('class',baseCls.replace('-animate-done','-animate-init'));
			}
			isAnimateDone = false;
			return ;
		}		
	}
}
for(k in screenAnimateElements){
	setScreenAnimate(k);
}

setScreenAnimate(".main")
setScreenAnimate(".content-banner")
setScreenAnimate(".banner-img");
setScreenAnimate(".content-class")
setScreenAnimate(".content-class-right")
setScreenAnimate(".content-build")
setScreenAnimate(".content-build-sub")
setScreenAnimate(".content-learn")

$(function(){
	
	var liNum = 5*5*5; // 暂且认为li个数为 5*5*5 个
	// 拖拽 滚轮
	(function(){
		document.addEventListener('touchmove',function(event){
			event.preventDefault();
		},false);
		var nowX , lastX , minusX = 0, nowY , lastY , minusY = 0,startX,startY;
		var roY = 0 , roX = 0 , tZ = -2000;
		var timer1 , timer2;
		var imgs = new Array();
		function preload() {
			for (i = 0; i < preload.arguments.length; i++) {
				imgs[i] = new Image();
				imgs[i].src = preload.arguments[i];
			}
		}
		preload("img/bg.png");
		/*hammer.add(new Hammer.Pinch());
		hammer.on('pinchout',function(e){
			tZ -= (e.deltaX)*80;
			tZ = Math.min(0,tZ); // Math.min()  取参数里面最小的
			tZ = Math.max(-8000,tZ); // Math.max()  …… 最大
			// -8000 < tZ < 0
			$('#main').css({
				'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
			});
		});*/
		function browserRedirect() {
			var sUserAgent = navigator.userAgent.toLowerCase();
			var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
			var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
			var bIsMidp = sUserAgent.match(/midp/i) == "midp";
			var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
			var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
			var bIsAndroid = sUserAgent.match(/android/i) == "android";
			var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
			var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
			if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
				isTouchDevice();
				function touchStart(evt){
					try{
						var touch = evt.touches[0];
						var x = Number(touch.pageX);
						var y = Number(touch.pageY);

						startX = x;
						startY = y;
					}catch(e){
						alert('touchStart: '+ e.message);
					}
				}
				function touchMove(evt){
					try{
						var touch = evt.touches[0];
						var nowX = Number(touch.pageX);
						var nowY = Number(touch.pageY);
						minusX = nowX - startX;  // 两者差值
						minusY = nowY - startY;
						roY += minusX*0.02;
						roX -= minusY*0.02;



						if(minusX>50||minusX<-50||minusY>50||minusY<-50){
							$('#main').css({
								'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
							});
						}
						startX = nowX;
						startY = nowY;
					}catch(e){
						alert('touchMove: '+ e.message);
					}
				}
				function touchEnd(evt){
					try{
						timer1 = setInterval(function(){
							minusX *= 0.95;
							minusY *= 0.95;
							if ( Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5 )
								clearInterval( timer1 );
							roY += minusX*0.2;
							roX -= minusY*0.2;
							$('#main').css({
								'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
							});
						} , 13);
					}catch(e){
						alert('touchEnd: '+ e.message);
					}
				}
				function bind(){
					document.addEventListener('touchstart',touchStart,false);
					document.addEventListener('touchmove',touchMove,false);
					document.addEventListener('touchend',touchEnd,false);
				}
				function isTouchDevice(){
					try{
						document.createEvent('TouchEvent');
						bind();
					}catch(e){
						alert(e.message);
					}
				}
			} else {
				$(document).mousedown(function(ev){
					 ev = ev || window.event;
					 lastX = ev.clientX;
					 lastY = ev.clientY;
					 clearInterval( timer1 );
					 $(this).on('mousemove',function(ev){
						 ev = ev || window.event; //ev 事件对象 存放事件的相关信息
						 nowX = ev.clientX;  // ev.clientX  clientX属性存放鼠标x坐标
						 nowY = ev.clientY;
						 minusX = nowX - lastX;  // 两者差值
						 minusY = nowY - lastY;
						 roY += minusX*0.2;
						 roX -= minusY*0.2;
						 $('#main').css({
							'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
						 });
						 lastX = nowX; // 存放前一点的x坐标
						 lastY = nowY;
					 });
				 	return false;
				 }).mouseup(function(){
				 	$(this).off('mousemove');
					 timer1 = setInterval(function(){
						 minusX *= 0.95;
						 minusY *= 0.95;
						 if ( Math.abs(minusX) < 0.5 && Math.abs(minusY) < 0.5 )
						 clearInterval( timer1 );
						 roY += minusX*0.2;
						 roX -= minusY*0.2;
						 $('#main').css({
						 	'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
						 });
					 } , 13);
				 }).mousewheel(function(e,d){ //滚轮事件
				 //var d = arguments[1]   arguments 不定参   实参的集合
				 clearInterval( timer2 );
				 tZ += d*80;
				 tZ = Math.min(0,tZ); // Math.min()  取参数里面最小的
				 tZ = Math.max(-8000,tZ); // Math.max()  …… 最大
				 // -8000 < tZ < 0
				 $('#main').css({
				 'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
				 });

				 timer2 = setInterval(function(){
				 d *= 0.85;
				 if ( Math.abs(d) < 0.01 )
				 {
				 clearInterval( timer2 );
				 }
				 tZ += d*80;
				 tZ = Math.min(0,tZ); // Math.min()  取参数里面最小的
				 tZ = Math.max(-8000,tZ); // Math.max()  …… 最大
				 // -8000 < tZ < 0
				 $('#main').css({
				 'transform' : 'translateZ('+ tZ +'px) rotateX('+ roX +'deg) rotateY('+ roY +'deg)'
				 });
				 } , 13);
				 });
			}
		}

		browserRedirect();


	})();



	init();

	function init(){
		//给#main里面添加 liNum个 li标签
		var arr = [106,107,108,111,112,113,116,117,118];

		for ( var i=0 ; i<liNum ; i++ )
		{
			var $li = $('<li><p class="title">Js</p><p class="author">未完待续</p><p class="time">2016.07.24</p></li>');
			for(var j=0;j<arr.length;j++){
				if(i==arr[j]){
					$li.find('p.author').html(data[j].text);
					$li.css('background',data[j].color);
					break;
				}
			}
			var x = (Math.random()-0.5)*5000;
			var y = (Math.random()-0.5)*5000;
			var z = (Math.random()-0.5)*5000;
			// Math.random()   [0,1)*2000  [0,2000) ->  [-1000 , 1000)
			$li.css({
				'transform' : 'translate3d('+x+'px,'+y+'px,'+z+'px)'
			});
			$('#main').append($li);
		}
		setTimeout(function(){
			Grid();
			$('#styleBtn').css({
				transform : 'scale(1)',
				opacity : 1
			});
		},300);

		$('#styleBtn li').on('click',function(){
			var index = $(this).index();
			switch ( index )
			{
				case 0:
					Table();
					break;
				case 1:
					Sphere();
					break;
				case 2:
					Helix();
					break;
				case 3:
					Grid();
					break;
			}
		});

	}

	function Grid(){
		var tX = 400 , tY = 400 , tZ = 800;  // 水平 垂直间隔
		var firstX = - 2*tX; //第一个li水平偏移量
		var firstY = - 2*tY; //第一个li垂直偏移量
		var firstZ = - 2*tZ; //第一个li Z轴偏移量
		$('#main li').each(function(i){
			var iX = (i % 25) % 5; // x方向，要增加的倍数
			var iY = parseInt((i % 25) / 5); //y方向，要增加的倍数
			var iZ = parseInt(i / 25); //z方向，要增加的倍数
			$(this).css({
				'transform' : 'translate3d('+ ( firstX + iX*tX ) +'px,'+ ( firstY + iY*tY ) +'px,'+ (firstZ + iZ*tZ) +'px)'
			});
		});
	}

	function Helix(){
		var roY = 10 , tY = 10;
		var mIndex = Math.floor($('#main li').length / 2);
		var firsttY = -tY*mIndex;
		var arry = [];
		for(var i=0;i<liNum;i++){
			arry[i]=i;
		}
		$('#main li').each(function(i){
			var ii = disorder(arry);
			$(this).css({
				'transform' : 'rotateY('+ 10*ii +'deg) translateY('+ (firsttY+tY*ii) +'px) translateZ(1000px)'
			});
		})
	}

	function disorder(arry){
		var ii = Math.floor(Math.random()*arry.length);
		ii = arry.splice(ii,1);
		return ii;
	}
	function Sphere(){
		var arr = [1,4,8,10,12,17,22,16,14,9,6,5,1];
		var roX = 180/arr.length;
		var fisrtRoX = 90;
		$('#main li').each(function(j){
			var sum = 0;
			var index , num;
			for ( var i=0;i<arr.length;i++ )
			{
				sum += arr[i];
				if ( sum >= j+1 )
				{
					index = i;
					num = arr[i] - (sum-j);
					break;
				}
			}
			var roY = 360/arr[index];
			var x = index%2?fisrtRoX+index*roX:fisrtRoX-index*roX;
			var y = num*roY;
			var z = 0;
			if ( x > 90 && x < 270 )
			{
				z = 180;
			}
			$(this).css({
				transform : 'rotateY('+y+'deg) rotateX('+x+'deg) rotateZ('+z+'deg) translateZ(800px)'
			});
		});
	}

	function Table(){
		
		var tX = 160 , tY = 200;
		var firstX = -9*tX + 60;
		var firstY = -4*tY;
		var arr = [
			{x:firstX,y:firstY},
			{x:firstX+17*tX,y:firstY},
			{x:firstX , y:firstY+tY },
			{x:firstX+tX , y:firstY+tY},
			{x:firstX+12*tX , y:firstY+tY },
			{x:firstX+13*tX , y:firstY+tY },
			{x:firstX+14*tX , y:firstY+tY },
			{x:firstX+15*tX , y:firstY+tY },
			{x:firstX+16*tX , y:firstY+tY },
			{x:firstX+17*tX , y:firstY+tY },
			{x:firstX , y:firstY+tY*2 },
			{x:firstX+tX , y:firstY+tY*2},
			{x:firstX+12*tX , y:firstY+tY*2 },
			{x:firstX+13*tX , y:firstY+tY*2 },
			{x:firstX+14*tX , y:firstY+tY*2 },
			{x:firstX+15*tX , y:firstY+tY*2 },
			{x:firstX+16*tX , y:firstY+tY*2 },
			{x:firstX+17*tX , y:firstY+tY*2 }
		];
		$('#main li').each(function(i){
			var x , y;
			if ( i < 18 )
			{
				x = arr[i].x;
				y = arr[i].y;
			}else
			{
				var iX = (i+18) % 18;
				var iY = parseInt((i+18)/18) + 1;
				x = firstX+iX*tX;
				y = firstY+iY*tY;
			}
			$(this).css({
				transform : 'translate('+x+'px,'+y+'px)'
			});
		});
	}
	
	(function(){
		var $mainLi = $('#main li');
		var $show = $('#show');
		var $title = $('#show div.s-title h1');
		var $author = $('#show div.s-author h1');
		var $dec = $('#show div.s-dec h3');
		var hammer = new Hammer(document.getElementById('show'));
		var hammer2 = new Hammer(document.getElementById('back'));
		var arr = [106,107,108,111,112,113,116,117,118];
		var index;
		for(var i=0;i<arr.length;i++){
			$mainLi[arr[i]].index = i;
			$mainLi[arr[i]].addEventListener("click",bindClick);
		}
		function bindClick(ev){

				index = this.index;
				ev = ev || window.event;
				$show.fadeIn(1000).css({
					'transform' : 'rotateY(0deg)scale(1)'
				});
				$title.html(data[index].title);
				$author.html(data[index].author);
				$dec.html(data[index].dec);
				ev.stopPropagation();
		}

		$(document).click(function(){
			$show.fadeOut(1000,function(){
				/*$(this).css({
					'transform' : 'rotateY(0deg) scale(1.5)'
				});*/
			}).css({
				'transform' : 'rotateY(180deg) scale(0.1)'
			});
		});

		$('img.img').lazyload();
		/*hammer.on('tap',function(ev){
			$('#wrap').animate({
				'marginLeft' : '-100%'
			},1000,function(){
				$('#show').css({
					'transform' : 'rotateY(0deg) scale(1.5)',
					display : 'none'
				});
			});
			$('#frame').show().animate({
				left : 0
			},1000).find('iframe').attr('src' , 'https://htmlpreview.github.com/?https://github.com/xiaocc0007/3d/blob/master/demo.html');
			ev.stopPropagation();
		});*/
		$show.click(function(ev){
			$('#wrap').animate({
				'marginLeft' : '-100%'
			},1000,function(){
				$show.css({
					'transform' : 'rotateY(0deg) scale(1.5)',
					display : 'none'
				});
			});
			/*$('#frame').show().animate({
				left : 0
			},1000).find('iframe').attr('src' ,data[index].src);*/
			window.location.href = data[index].src;


			ev.stopPropagation();
		});
		$('#back').click(function(ev){
			$('#wrap').animate({
				'marginLeft' : 0
			},1000);
			$('#frame').animate({
				left :'100%'
			},1000);
			setTimeout(function(){
				$('#frame').hide();
			},1000);
			ev.stopPropagation();
		});
		/*hammer2.on('tap',function(ev){
			$('#wrap').animate({
				'marginLeft' : 0
			},1000);
			$('#frame').animate({
				left :'100%'
			},1000);
			setTimeout(function(){
				$('#frame').hide();
			},1000);
			ev.stopPropagation();
		})*/
	})();

});

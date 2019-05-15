	
//CHARACTER ANIMATIONS
function breath(id){

	unit = $('#unit'+id);

	head = unit.children('.head');
	
	head.animate({
	top: 19
	}, 1300,function(){
	
		head.animate({
		top: 16
		}, 1300,function(){
			
			breath(id);
		
		});
	
	});
	
	trunk = unit.children('.trunk,.shoulder');
	
	trunk.animate({
	top: 50
	}, 1300,function(){
	
		trunk.animate({
		top: 52 
		}, 1300,function(){
			
			
		
		});
	
	});
	
}

function walk(id){

	unit = $('#unit'+id);
	
	legLeft = $('.leg.left',unit);
	legRight = $('.leg.right',unit);
	
	armLeft = $('.arm.left',unit);
	armRight = $('.arm.right',unit);
	
	legLeft
		.animate({rotate: '40deg'}, 400)
		.animate({rotate: '-40deg'}, 400);
	
	legRight
		.animate({rotate: '-40deg'}, 400)
		.animate({rotate: '40deg'}, 400);
	
	setTimeout(function(){
	
		if(app.chars[id].state=='none'){
		
			walk(id);
			
		}
	
	},800);
	
	

}

function bounce(id){
	
	unit = $('#unit'+id);
	
	unit
		.animate({'margin-top': "-="+5}, 100)
		.animate({'margin-top': "+="+5}, 100);
	
	setTimeout(function(){
	
		bounce(id);
	
	},400);
	
}

function move(id,targetX,targetY){

	unit = $('#unit'+id);
	
	unit.animate({top:targetY, left: targetX}, { duration: 1000, queue: false });

}

function slash(id){

	unit = $('#c'+id);
	
	app.chars[id].state='attacking';
	
	head = $('.head',unit);
	trunk = $('.trunk',unit);
	armRight = $('.arm.right',unit);
	armLeft = $('.arm.left',unit);
	legRight = $('.leg.right',unit);
	legLeft = $('.leg.left',unit);
	
	armRight
		.animate({rotate: '-242deg'}, 500)
		.animate({rotate: '0deg'}, 100)
		.animate({rotate: '-31deg'}, 500);
	
	armLeft
		.animate({rotate: '-214deg'}, 500)
		.animate({rotate: '20deg'}, 100)
		.animate({rotate: '-9deg'}, 500);
	
	legLeft
		.animate({rotate: '-59deg'}, 500)
		.animate({rotate: '0deg'}, 500);
	
	legRight
		.animate({rotate: '50deg'}, 500)
		.delay(100)
		.animate({rotate: '0deg'}, 500);
	
	unit
		.animate({rotate: '-19deg'}, 500)
		.animate({rotate: '19deg'}, 100)
		.animate({rotate: '0deg'}, 500,	function(){
	
		app.chars[id].state='none';
		
		unit.css('-webkit-transform','');
		
	
	});
	
	
	
}

function blink(id){

	unit = $('#unit'+id);
	
	eyes = unit.find('.eye');

	eyes.animate({height: '1'}, 100);
	eyes.delay().animate({height: '4'}, 100);
	
	setTimeout(function(){
	
	
		blink(id);
	
	},1500);
	
	
}

//DRAW CHAR

function printChar(id){

	app.chars[id];
	
	a = '<div id="unit'+id+'" class="char"><div class="head"><img class="hair" src="assets/svg/hair.svg"><div class="eye left"></div><div class="eye right"></div></div><img class="shoulder" src="assets/svg/shoulder.svg"></div><div class="trunk"><canvas class="chest" height="75" width="50"></canvas></div><div class="arm left"><img class="weapon" src="assets/svg/axe.svg"><canvas class="gloves" height="50" width="50"></canvas><div class="hand"><div class="thumb"></div></div></div><div class="arm right"><canvas class="weapon" height="175" width="150"></canvas><canvas class="gloves" height="50" width="50"></canvas><div class="hand"><div class="thumb"></div></div></div><div class="leg left"><canvas class="boots" height="50" width="30"></canvas></div><div class="leg right"><canvas class="boots" height="50" width="30"></canvas></div></div>';
	$("#c0").append(a);
	
	

var c= $(".chest");
	
	for(i=0;i<c.length;i++){
	
		var ctx=c[i].getContext("2d");

		studdedLeather(ctx);

	}
	
	//
	
	
	// var c= $(".left .weapon");
	
	// for(i=0;i<c.length;i++){
	
		// var ctx=c[i].getContext("2d");

		// axe(ctx);

	// }

	//
	
	// var c= $(".hair");
	
	// for(i=0;i<c.length;i++){
	
		// var ctx=c[i].getContext("2d");

		// hair(ctx);

	// }
	
	//
	
	// var c= $(".shoulder");
	
	// for(i=0;i<c.length;i++){
	
		// var ctx=c[i].getContext("2d");

		// shoulder(ctx);

	// }
	
	//
	
	var c= $(".boots");
	
	for(i=0;i<c.length;i++){
	
		var ctx=c[i].getContext("2d");

		boots(ctx);

	}
	//
	var c= $(".gloves");
	
	for(i=0;i<c.length;i++){
	
		var ctx=c[i].getContext("2d");

		gloves(ctx);

	}
	
	
}


jQuery.easing.def = "easeOutQuad";

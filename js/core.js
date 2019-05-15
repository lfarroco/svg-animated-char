var Game = {
	baseMove : 100,
	char : {
		width : 100,
		height : 100
	},
	ui : {
		clickX : 10,
		clickY : 10

	},
	units : [{
		name : "Zé",
		hp : 50,
		clickX : 10,
		clickY : 10,
		moving : 0
	}, {}
		]

};


app = {

	player :[
		{id: 0,	name: 'Farroco', zone: 1, spot: 1, gold: 1000, active:1}
	],

	chars: [
			{
			id: 0,
			name: 'Khastan',
			class: 'barbarian',
			player: 1,
			state:'none',
			sqd: 1,
			lvl:1,
			str:5,
			agi:5,
			int:5,
			basestr:5,
			baseagi:5,
			baseint:5,
			xp:0,
			hp:240,
			curr_hp:240,
			x: 1,
			y: 3,
			skill:0,
			item1:6,
			item2:14,
			item3:17,
			item4:21,
			buffs:[],
			
			hair:0,
			chest:0,
			shoulder:0,
			gloves:0,
			weapon:0,
			boots:0
			},
			
	],
	
}


var clicked = 0;

function clickDot(x, y) {
	"use strict";

	$('#click').css('left', x + 15).css('top', y + 115);

}

herohp = 50;

function clickMove(activeUnit) {

	x = Game.units[0].clickX;
	y = Game.units[0].clickY;
	

	// debug.html('');

	clickDot(x+Game.char.width/2, y+Game.char.height/2);

	//CHAR CURRENT POSITION
	pos = activeUnit.position();
	chaX = pos.left;
	chaY = pos.top;

	distX = x - chaX;
	distY = y - chaY;
	
	dist = distX+distY;
	
	if(dist<0){
	
		dist = dist*-1;
	
	}
	
	if(distX<0){
	
		activeUnit.addClass('faceleft')
		
	}else{
	
		activeUnit.removeClass('faceleft')
	
	}
	
	if(finishedX == 0){
	
		if (chaX < x) {
		
			if (distX <= Game.char.width) {

				moveX = distX;
				finishedX = 1;

			} else {
				moveX = Game.baseMove;
			}

		}

		if (chaX > x) {

			if (distX >= -Game.char.width) {
				
				moveX = distX;
				finishedX = 1;

			} else {
				moveX = -Game.baseMove;
			}

		}
	
	}else{
		moveX = 0;
	}

	
	if(finishedY == 0){
	
		if (chaY < y) {

		log('moving down');
		
			if (distY <= Game.char.width) {

				log('close gap');
			
				moveY = distY;
				finishedY = 1;

			} else {
			
				log('step');
			
				moveY = Game.baseMove;
			}

		}

		if (chaY > y) {
		
		log('moving up');

			if (distY >= -Game.char.width) {
			
				log('close gap');

				moveY = distY;
				finishedY = 1;

			} else {
				
				log('step');
			
				moveY = -Game.baseMove;
			}

		}
	
	}else{
		moveY = 0;
	}
	

	log('chaX:' + chaX + ' , ' + 'chaY:' + chaY + ', clickX:' + clickX + ', clickY: ' + clickY);
	log('movex:' + moveX + ' , ' + 'movey:' + moveY + ', Distx:' + distX + ', DistY: ' + distY);

	speed = Math.abs(moveX)+Math.abs(moveY);
	speed = speed*5
	log('speed: '+speed);
	
	activeUnit
	.animate({
		left : '+=' + moveX,
		top : '+=' + moveY
	}, speed, "linear", function () {

		if (finishedX == 1 && finishedY == 1) {

			// log('arrived');
			activeUnit.toggleClass('moving');
			activeUnit.toggleClass('standing');
			
			Game.units[0].moving = 0;
			finishedX = 0;
			finishedY = 0;
			
		} else {

			clickMove(activeUnit);

		}

	});

}

function moveToactiveUnit(activeUnit, target) {

	//CALCULATE DISTANCE
	//TARGET activeUnit
	tgtX = target.position().left,
	tgtY = target.position().top;

	//CHAR CURRENT POSITION
	pos = activeUnit.position();
	chaX = pos.left;
	chaY = pos.top;

	//CALCULATE
	posX = tgtX - chaX;
	posY = tgtY - chaY;

	if (tgtX < chaX) {
		offset = Game.char.width/2;

	} else {
		offset = -Game.char.width/2;
	}

	posX = posX + offset;
	posY = posY;

	distance = posX + posY;

	speed = distance * speed;
	speed = parseInt(speed, 10);

	if (speed < 0) {
		speed = speed * -1;
	}

	debug.append('<br/>speed: ' + speed);

	activeUnit
	.animate({
		left : chaX += posX,
		top : chaY += posY
	}, speed, 'easeInSine', function () {

		if (!verifySide(activeUnit, target)) {

			moveToactiveUnit(activeUnit, target);

		}

	});

}

function attack(activeUnit, target) {

	setTimeout(function () {

		activeUnit
		.animate({
			left : '-=' + 10
		}, 50, function () {

			activeUnit
			.animate({
				left : '+=' + 10
			}, 50, function () {

				herohp = herohp - 10;

				if (herohp <= 0) {
					herohp = 0;
					$('#char').remove();
				} else {

					if (verifySide(activeUnit, target)) {

						if ($(activeUnit.attr('id'))) {

							attack(activeUnit, target);

						}

					} else {

						if (activeUnit.hasClass('enem')) {
							steps(activeUnit, target);
						}

					}

				}

				$('#hp').html(herohp);

			});

		});

	}, 600);

}

function steps(activeUnit, target) {

	if (!verifySide(activeUnit, target)) {

		//CALCULATE DISTANCE
		//TARGET activeUnit
		tgtX = target.position().left,
		tgtY = target.position().top;

		//CHAR CURRENT POSITION
		pos = activeUnit.position();
		chaX = pos.left;
		chaY = pos.top;

		distX = tgtX - chaX;
		distY = tgtY - chaY;

		if (chaX < tgtX) {

			if (distX < Game.char.width) {

				moveX = distX - Game.char.width/2;

			} else {
				moveX = Game.baseMove;
			}

		} else {

			if (distX > -Game.char.width) {

				moveX = distX + Game.char.width/2;

			} else {
				moveX = -Game.baseMove;
			}

		}

		if (chaY < tgtY) {

			if (distY < Game.char.width) {

				moveY = distY;

			} else {
				moveY = Game.baseMove;
			}

		} else {

			if (distY > -Game.char.width) {

				moveY = distY;

			} else {
				moveY = -Game.baseMove;
			}

		}

		activeUnit
		.animate({
			left : '+=' + moveX,
			top : '+=' + moveY
		}, 800, "linear");

		setTimeout(function () {

			if (verifySide(activeUnit, target)) {

				attack(activeUnit, target);

			} else {

				steps(activeUnit, target);

			}

		}, 800);

	} else {
		attack(activeUnit, target);
	}
}

function verifySide(activeUnit, target) {

	// log(activeUnit.position().left);
	// log(target.position().left);

	if (activeUnit.position().left <= target.position().left + Game.char.width/2 &&
		activeUnit.position().left >= target.position().left - Game.char.width/2 &&
		activeUnit.position().top <= target.position().top + Game.char.width/2 &&
		activeUnit.position().top >= target.position().top - Game.char.width/2) {

		return true;

	} else {

		return false;
	}

}

function log(str) {

	console.log(str);
	$('#debug').append('<br/>' + str);

}

function start() {

	floor = $('#floor');

	activeUnit = $('#c0');

	debug = $('#debug');

	floor.click(function (e) {

		if (!$(e.target).hasClass('enem')) {

			//CALCULATE DISTANCE
			//CLICKED SPOT
			clickX = $(this).offset().left,
			clickY = $(this).offset().top;
			clickX = e.pageX - clickX;
			clickY = e.pageY - clickY;
			Game.units[0].clickX = clickX-70;
			Game.units[0].clickY = clickY-170;
			
			finishedX = 0;
			finishedY = 0;

			if(Game.units[0].moving == 0){
			
				Game.units[0].moving = 1;
				
				activeUnit.toggleClass('moving');
				
				clickMove(activeUnit);
			
			}
			
		}

	});

	
	//HERO COMMANDS
	
	$('.hero.activeUnit').click(function(){
	
		$('.selected').removeClass('selected');
	
		$(this).toggleClass('selected');

	});
	
	
	$('.enem').click(function () {

		steps(activeUnit, $(this));

	});

	// a = $('#enem');
	// b = $('#char');
	// moveToactiveUnit(a,b);

	// steps($('.enem.orc'),$('#char'));
	// steps($('.enem.ogre'),$('#char'));

}

//CREATE A UNIT
function Unit(name,attack,hitPoints,x,y){
  this.name = name;
  this.attack = attack;
  this.hitPoints = hitPoints;
  this.x = x;
  this.y = y;
}

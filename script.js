

function Ant(crslId) {

	let id = document.getElementById(crslId);
    
	if(id) {
		this.crslRoot = id
	}
	else {
		
	};


    this.root = document.querySelector('.ant-carousel')
    

	// Carousel objects
	this.list = this.root.querySelector('.ant-carousel-list');
    // this.list = $('.ant-carousel-list')
    console.log(this.list);

	this.crslElements = this.list.querySelectorAll('.ant-carousel-element');
	this.crslElemFirst = this.list.querySelector('.ant-carousel-element');
	this.leftArrow = this.root.querySelector('div.ant-carousel-arrow-left');
	this.rightArrow = this.root.querySelector('div.ant-carousel-arrow-right');

	// Initialization
	this.options = Ant.defaults;
	Ant.initialize(this)


    

};

Ant.defaults = {

	// Default options for the carousel
	elemVisible: 4, // Кол-во отображаемых элементов в карусели
	loop: true,     // Бесконечное зацикливание карусели 
	speed: 300,     // Скорость анимации (мс)
	touch: true,    // Прокрутка  прикосновением
	arrows: true,   // Прокрутка стрелками
};

Ant.prototype.elemPrev = function(num) {
	num = num || 1;

	this.currentElement -= num;

	if(!this.options.loop) {  // сдвиг вправо без цикла
		this.currentOffset += this.elemWidth*num;
		this.list.style.marginLeft = this.currentOffset + 'px';
		if(this.currentElement == 0) {
			this.leftArrow.style.display = 'none'; this.touchPrev = false
		}
		this.rightArrow.style.display = 'block'; this.touchNext = true
	}
	else {                    // сдвиг вправо с циклом
		let elm, buf, this$ = this;
		for(let i=0; i<num; i++) {
			elm = this.list.lastElementChild;
			buf = elm.cloneNode(true);
			this.list.insertBefore(buf, this.list.firstElementChild);
			this.list.removeChild(elm)
		};
		this.list.style.marginLeft = '-' + this.elemWidth*num + 'px';
		let compStyle = window.getComputedStyle(this.list).marginLeft;
		this.list.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
		this.list.style.marginLeft = '0px';
		setTimeout(function() {
			// this$.crslList.style.cssText = 'transition:none;'
		}, this.options.speed)
	}
};

Ant.prototype.elemNext = function(num) {
	num = num || 1;

	this.currentElement += num;

	if(!this.options.loop) {  // сдвиг влево без цикла
		this.currentOffset -= this.elemWidth*num;
		this.list.style.marginLeft = this.currentOffset + 'px';
		this.leftArrow.style.display = 'block'; this.touchPrev = true
	}
	else {                    // сдвиг влево с циклом
		let elm, buf, this$ = this;
		this.list.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
        console.log(this.list);
		this.list.style.marginLeft = '-' + (this.elemWidth*num) + 'px';
		setTimeout(function() {
			this$.list.style.cssText = 'transition:none;';
			for(let i=0; i<num; i++) {
				elm = this$.list.firstElementChild;
				buf = elm.cloneNode(true); this$.list.appendChild(buf);
				this$.list.removeChild(elm)
			};
			this$.list.style.marginLeft = '0px'
		}, this.options.speed)
	}
};

Ant.initialize = function(that) {

	// Constants
	that.elemCount = that.crslElements.length; // Количество элементов
	let elemStyle = window.getComputedStyle(that.crslElemFirst);
	that.elemWidth = that.crslElemFirst.offsetWidth +  // Ширина элемента (без margin)
	  parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);

	// Variables
	that.currentElement = 0; that.currentOffset = 0;
	that.touchPrev = true; that.touchNext = true;
	let bgTime = getTime();

	// Functions
	function getTime() {
		return new Date().getTime();
	};

	// Start initialization
	if(that.elemCount <= that.options.elemVisible) {   // Отключить навигацию
		that.options.auto = false; that.options.touch = false;
		that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
	};



	if(that.options.arrows) {  // инициализация стрелок
		
		that.leftArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > that.options.speed) {
				bgTime = fnTime; that.elemPrev()
			}
		}, false);
		that.rightArrow.addEventListener('click', function() {
			let fnTime = getTime();
			if(fnTime - bgTime > that.options.speed) {
				bgTime = fnTime; that.elemNext()
			}
		}, false)
	}
	else {
		that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none'
	};

	
};


$(document).ready(function() {
    new Ant();
});
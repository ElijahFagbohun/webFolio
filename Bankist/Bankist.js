'use strict'

const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnCloseModal = document.querySelector('.btn--close-modal')
const btnOpenModal = document.querySelectorAll('.btn--show-modal')

const openModal = function(){ 
	modal.classList.remove('hidden')
	overlay.classList.remove('hidden')
}

const closeModal = function(){
	modal.classList.add('hidden')
	overlay.classList.add('hidden')
}

btnOpenModal.forEach(btn => btn.addEventListener
	('click', openModal))

	btnCloseModal.addEventListener('click', closeModal)
	overlay.addEventListener('click', closeModal)

	document.addEventListener('keydown', function(e) {
		if(e.key === 'Escape' && !modal.classList.contains('hidden')){
			closeModal()
		}

	})
	
	//scroll into view (learn more)
	const btnScrollTo = document.querySelector('.btn--scroll-to')
	const section1 = document.querySelector('#section--1')

	btnScrollTo.addEventListener('click', function(e){
		//const s1coords = section1.getBoundingClientRect()

		section1.scrollIntoView({behavior: 'smooth'})
	})

	/*page navigation*/
    // document.querySelectorAll('.nav__link').forEach(
	// 	function(link){
	// 		link.addEventListener('click', function(e){
	// 			e.preventDefault()
	// 			const id = this.getAttribute('href')
	// 			document.querySelector(id).scrollIntoView({
	// 				behavior: 'smooth '
	// 			})
	// 		})
	// 	}
	// )

	/*Event delegation
	- Add event listener to common parent element
	- Determine what element originated the event*/
    //for scrolling into view
	document.querySelector('.nav__links').addEventListener(
		'click', function(e){
			e.preventDefault()
            
			//Matching strategy
	  if(e.target.classList.contains('nav__link')){
		const id = e.target.getAttribute('href')
		document.querySelector(`${id}`).scrollIntoView({
		behavior: 'smooth'
	    	})
		}
		})

    //Tabbed component
	const tabs = document.querySelectorAll('.operations__tab')
	const tabsContainer = document.querySelector('.operations__tab-container')
	const tabsContent = document.querySelectorAll('.operations__content')

    tabsContainer.addEventListener('click', function(e){
		const clicked = e.target.closest('.operations__tab')
		//Guard clause
		if(!clicked) return
        
		// remove active classes
		tabs.forEach(tab => tab.classList.remove(
			'operations__tab--active'
		))
		tabsContent.forEach(con=> con.classList.remove('operations__content--active'))
		// Active tab
		clicked.classList.add('operations__tab--active')

		// Activate content area
       document.querySelector(`.operations__content--${clicked.dataset.tab}`)
	   .classList.add('operations__content--active')
	}) 


	   /*Creating background colors for nav__links*/
	// const randomInt = (min, max) =>
	// Math.floor(Math.random() * (max - min + 1) + min)

	// const randomColor = () => 
	// `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

	// document.querySelector('.nav__link').addEventListener('click', function(e){
	// 	this.style.backgroundColor = randomColor()
    //     //To stop propagation
	// 	/*e.stopPropagation()*/
	// })
	// document.querySelector('.nav__links').addEventListener('click', function(e){
	// 	this.style.backgroundColor = randomColor()
	// })
	// document.querySelector('.nav').addEventListener('click', function(e){
	// 	this.style.backgroundColor = randomColor()
	// }) 
/*menu fade animation*/
const nav = document.querySelector('.nav')

nav.addEventListener('mouseover', function(e){
	if(e.target.classList.contains('nav__link')){
		const link = e.target
		const siblings = link.closest('.nav').querySelectorAll('.nav__link')
		const logo = link.closest('.nav').querySelectorAll('img')

		siblings.forEach(el =>{
			if(el !== link) el.style.opacity = 0.5
		})
		logo.style.opacity = 0.5
	}
})
 
nav.addEventListener('mouseout', function(e){
	if(e.target.classList.contains('nav__link')){
		const link = e.target
		const siblings = link.closest('.nav').querySelectorAll('.nav__link')
		const logo = link.closest('.nav').querySelectorAll('img')

		siblings.forEach(el =>{
			if(el !== link) el.style.opacity = 1
		})
		logo.style.opacity = 1
	}
})

/* sticky navigation*/
// const initialCoords = section1.getBoundingClientRect()

// window.addEventListener('scroll', function(){
// 	if(window.scrollY > initialCoords.top){
// 		nav.classList.add('sticky')
// 	}else{
// 		nav.classList.remove('sticky')
// 	}
// })

//Better way of doing it
const header = document.querySelector('.header')
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries){
	const [entry] = entries

	if(!entry.isIntersecting){
		nav.classList.add('sticky')
	}else{
		nav.classList.remove('sticky')
	}
}

const headerObserver = new IntersectionObserver(stickyNav,
	{
		root: null,
		threshold: 0,
		rootMargin:`-${navHeight}px`,
	})

	headerObserver.observe(header)

// Reveal sections
const allSections = document.querySelectorAll('.section')

const revealSection = function(entries, observer){
	const [entry] = entries

	if(!entry.isIntersecting) return

	entry.target.classList.remove('section--hidden')
	observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
	root: null,
	threshold:0,
}) 

allSections.forEach(function(section){
	sectionObserver.observe(section)
	section.classList.add('section--hidden')
}) 

//lazy loading images
const targetImage = document.querySelectorAll('img[data-src]');

const ImgLoader = function(entries, observer){
        const [entry] = entries

		if(!entry.isIntersecting) return

		// Replace src with data-src
		entry.target.src = entry.target.dataset.src

		entry.target.addEventListener('load', function(){
			entry.target.classList.remove('lazy-img')
		})
        observer.unobserve(entry.target)
}

 const imgObserver = new IntersectionObserver(ImgLoader, {
	 root:null,
	 threshold:0.15
	//  rootMargin:'200px'
 })

 targetImage.forEach(img=>imgObserver.observe(img)) 

 // Slider
 const slides = document.querySelectorAll('.slide')
 const btnLeft = document.querySelector('.slider__btn--left')
 const btnRight = document.querySelector('.slider__btn--right')
 const dotContainer = document.querySelector('.dots')
 
 let currentSld = 0
 let maxSlide = slides.length

 //creating Dots
 const createDots = function (){
	 slides.forEach(function(_, i){
		 dotContainer.insertAdjacentHTML( 'beforeend', `<button class="dots__dot" data-slide="${i}"></button>`
		 )
	 })
 }
 createDots()

 //creating active class for the Dots 
 const activateDot = function (slide){
	 document.querySelectorAll('.dots__dot')
	 .forEach(dot =>dot.classList.remove('dots__dot--active'))

	 document.querySelector(`.dots__dot[data-slide="${slide}"]`)
	 .classList.add('dots__dot--active')
 }
activateDot(0)

 const gotoSlide = function(slide){   
	 slides.forEach((s, i)=>{
		 s.style.transform = `translateX(${100 * (i - slide)}%)`
	 })
 }
 gotoSlide(0)

 // Moving to the next Slide
const nextSlide = function(){
	if (currentSld === maxSlide - 1){
		currentSld = 0
	}else{
		currentSld++
	}
	gotoSlide(currentSld)
	activateDot(currentSld)
}
//Moving to the previous slide
const preSlide = function (){
	if (currentSld === 0){
		currentSld = maxSlide - 1
	}else{
		currentSld--
	}
	gotoSlide(currentSld)
	activateDot(currentSld)
}

btnRight.addEventListener('click', nextSlide)
btnLeft.addEventListener('click', preSlide)

//Making the dots work
dotContainer.addEventListener('click', function(e){
	if (e.target.classList.contains('dots__dot')){
		const slide = e.target.dataset.slide 
		gotoSlide(slide)
		activateDot(slide)
	}
})
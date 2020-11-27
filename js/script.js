window.addEventListener('DOMContentLoaded', function(){
    'use strict';
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a){
        for (let i = a; i< tabContent.length; i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    };

    hideTabContent(1);
    function showTabContent(b){
        if (tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');
        }
    };

    info.addEventListener('click', function(e){
        let target = e.target;
        console.log(target);
        if (target && target.classList.contains('info-header-tab')){
            for (let i = 0; i< tab.length; i++){
                if (target == tab[i]) {
                    hideTabContent(0);
                    showTabContent(i);
                    break;
                }
            }
        }
    });


// Timer

    let deadline = '2020-10-21';

    function getTimeRemaining(endtime){
        // opr ostatok vremeni i vychlenyaet chasy minuty i secundy
        let t = Date.parse(endtime)-Date.parse(new Date()),
        seconds = Math.floor(t/1000 % 60),
        minutes = Math.floor((t/1000/60)%60),
        hours = Math.floor(t/(1000*60*60));
        if (t<=0){
            hours = minutes = seconds = 0;
        }
        return {
            'total':t,
            'hours': hours,
            'minutes' : minutes,
            'seconds':seconds
        }


    }
    function insertLeadingZero(number){
        if (('' + number).length < 2) {
            return '0' + number;
        };
        return  '' + number
    }
    function setClock(id,endtime){
        let timer = document.getElementById(id),
        hours = timer.querySelector('.hours'),
        minutes = timer.querySelector('.minutes'),
        seconds = timer.querySelector('.seconds'),
        timeinterval = setInterval(updateClock,1000);


        function updateClock(){
            let t = getTimeRemaining(endtime);
            hours.textContent = insertLeadingZero(t.hours);
            minutes.textContent =insertLeadingZero(t.minutes);
            seconds.textContent =insertLeadingZero(t.seconds);
            if (t.total <= 0 ){
                clearInterval(timeinterval);
            }
        }


    }

    setClock('timer', deadline);

    // modal window

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow='hidden';
    });

    close.addEventListener('click', function(){
        overlay.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow='';
    });


    // otpravka formy

    let message = {
        loading: "Loading...",
        success: "Thank you! We will get in touch!",
        failure: "Something went wrong"
    };

    let form = document.querySelector(".main-form"),
        statusMessage = document.createElement('div');

    statusMessage.classList.add('status');



    let contact = document.querySelector('.contact-form'),
        contForm = contact.getElementsByTagName('form')[0];

    function send(elem){
        
        let input = elem.getElementsByTagName('input');
        elem.addEventListener('submit', function(e){
            e.preventDefault();
            elem.appendChild(statusMessage);

            let formData = new FormData(elem);

            function postData(data){
                return new Promise(function(resolve,reject){
                    
                    let request = new XMLHttpRequest();
                    request.open('POST', 'server.php');
                    request.setRequestHeader('Content-Type','application/json; charset=utf-8');
                    request.onreadystatechange = function(){
                        if (request.readyState < 4) {
                            resolve();
                        } else if (request.readyState === 4) {
                            if (request.status == 200) {
                                resolve();
                            } else {
                                reject();
                            }
                        }
                    };
                    request.send(data);
                    
                });
            }

            function clearInput(){
                for (let i = 0; i<input.length; i++) {
                    input[i].value = '';
                }
            }

            let obj = {};

            formData.forEach(function(value,key){
                obj[key]=value;
                console.log(`${key} ${value}`);
            });
    
            let json = JSON.stringify(obj);

            postData(json)
                .then(() => {
                    statusMessage.innerHTML = message.loading;
                })
                .then(() => {
                    statusMessage.innerHTML = message.success;
                })
                .catch(() => {statusMessage.innerHTML = message.failure;})
                .finally(clearInput);
                
            
        });
    }

    send(contForm);
    send(form);

    //Slider


    let slideIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = dotsWrap.querySelectorAll('.dot');

    function showSlides(index){
        if (index > slides.length ) {slideIndex = 1};
        if (index < 1) {slideIndex = slides.length };

        slides.forEach((item) => item.style.display = 'none');
        dots.forEach((item) => item.classList.remove('dot-active'));
        slides[slideIndex-1].style.display = 'block';
        dots[slideIndex-1].classList.add('dot-active');

    }

    function nextSlide(index){
        showSlides(slideIndex += index);
        
    }
    function currentSlide(index){
        showSlides(slideIndex = index);
        
    }

    currentSlide(1);
    prev.addEventListener('click', function(){nextSlide(-1)});
    next.addEventListener('click', function(){nextSlide(1)});

    dotsWrap.addEventListener('click', function(e){
        for (let i=1; i<=dots.length; i++) {
            if (e.target.classList.contains('dot') && e.target == dots[i-1]) {
                currentSlide(i);
            }
        }
    });

    // Calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        base = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personSum = 0,
        daysSum = 0,
        total = 0;

        totalValue.innerHTML = '0';

        persons.addEventListener('change', function(){
            personSum = +this.value;
            
            total = (daysSum+personSum) + 4000;

            if ((restDays.value == '') || (persons.value == '')){
                totalValue.innerHTML = '0';
            } else {
                totalValue.innerHTML = total;
            }

        });

        restDays.addEventListener('change', function(){
            daysSum = +this.value;
            total = (daysSum+personSum) * 4000;

            if ((restDays.value == '') || (persons.value == '')){
                totalValue.innerHTML = '0';
            } else {
                totalValue.innerHTML = total;
            }

        });

        base.addEventListener('change', function(){
            if ((restDays.value == '') || (persons.value == '')) {
                totalValue.innerHTML = '0';
            } else {
                let a = total;
                totalValue.innerHTML = a * +this.options[this.selectedIndex].value;
                
            }
        })
})
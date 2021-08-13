AOS.init({
    // Global settings:
    disable: 'mobile', // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 100, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 500, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: true, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-center', // defines which position of the element regarding to window should trigger the animation

});
;(function () {
    "use strict"
    
    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('form');
        form.addEventListener('submit', formSend);
    
        async function formSend(e) {
            e.preventDefault();
    
            let error = formValidate(form);
    
            let formData = new FormData(form);
    
            if (error === 0) {
                form.classList.add('_sending');
                alert("Some popup...");
                let response = await fetch('sendmail.php',{
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    form.reset();
                    form.classList.remove('_sending');
                }else{
                    alert("Some popup...");
                    form.classList.remove('_sending')
                }
            }else{
                alert('Заполните обязательные поля');
            }
        }
    
        function formValidate(form) {
            let error = 0;
            let formReq = document.querySelectorAll('._req');
    
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);
        
                if (input.classList.contains('_email')) {
                        if (emailTest(input)) {
                            formAddError(input);
                            error++;
                        }
                }else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                    formAddError(input);
                    error++;
                }else{
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
        
            }
            return error;
        }
    
        function formAddError(input) {
           input.parentElement.classList.add('_error');
           input.classList.add('_error');
        }
        function formRemoveError(input) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        }
        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        }
    });
})();
;(function () {
    "use strict"
    
    document.addEventListener('DOMContentLoaded', function() {
        const call = document.getElementById('call');
        call.addEventListener('submit', formSend);
    
        async function formSend(e) {
            e.preventDefault();
    
            let error = formValidate(call);
    
            let formData = new FormData(form);
    
            if (error === 0) {
                call.classList.add('_sending');
                alert("Some popup...");
                let response = await fetch('sendmail.php',{
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    call.reset();
                    call.classList.remove('_sending');
                }else{
                    alert("Some popup...");
                    call.classList.remove('_sending')
                }
            }else{
                alert('Заполните обязательные поля');
            }
        }
    
        function formValidate(call) {
            let error = 0;
            let formReq = document.querySelectorAll('._reqC');
    
            for (let index = 0; index < formReq.length; index++) {
                const input = formReq[index];
                formRemoveError(input);
        
                if (input.classList.contains('_email')) {
                        if (emailTest(input)) {
                            formAddError(input);
                            error++;
                        }
                }else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                    formAddError(input);
                    error++;
                }else{
                    if (input.value === '') {
                        formAddError(input);
                        error++;
                    }
                }
        
            }
            return error;
        }
    
        function formAddError(input) {
           input.parentElement.classList.add('_error');
           input.classList.add('_error');
        }
        function formRemoveError(input) {
            input.parentElement.classList.remove('_error');
            input.classList.remove('_error');
        }
        function emailTest(input) {
            return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
        }
    });
})();
;(function name(params) {
    window.lib = {};

    window.lib.body = document.querySelector('body');

    window.lib.closestAttr = function (item, attr) {
        var node = item;

        while(node){
            var attrValue = node.getAttribute(attr);
            if (attrValue) {
                return attrValue;
            }
            node = node.parentElement; 
        }
        return null;
    };

    window.lib.closestItemByClass = function (item, className) {
        var node = item;

        while(node){
            if (node.classList.contains(className)) {
                return node;
            }
            node = node.parentElement; 
        }
        return null;
    };

    window.lib.togleScroll = function () {
        lib.body.classList.toggle('lock');
    }
})();
;(function () {
    var showPopup = function (target) {
        target.classList.add('is-active');
    };

    var closePopup = function (target) {
      target.classList.remove('is-active');  
    };

    lib.body.addEventListener('click', function (e) {
       var target = e.target; 
       var popupClass = lib.closestAttr(target, 'data-popup');

        if (popupClass === null) {
            return;
        }

        e.preventDefault();
        var popup = document.querySelector('.' + popupClass);

        if (popup) {
            showPopup(popup);
            setTimeout (function() {
                lib.togleScroll();
              
            }, 800);
        }
    });
    
    lib.body.addEventListener('click', function (e) {
      var target = e.target;

      if (target.classList.contains('popup-close') ||
          target.classList.contains('popup__inner')) {
           var popup = lib.closestItemByClass(target, 'popup');

           
            closePopup(popup);
            lib.togleScroll();
      }
    });

    lib.body.addEventListener('keydown', function (e) {
        if (e.keyCode != 27) {
            return;
        }
        var popup = document.querySelector('.popup.is-active');

        if (popup) {
            closePopup(popup);
            lib.togleScroll();
        }

     });

})();
;(function () {
    var works = document.querySelector('.works__items');

    if (works === null) {
        return;
    }

    var changeWorksOrderInfo = function (target) {
        var product = lib.closestItemByClass(target, 'works');
        var order = document.querySelector('.popup-order');


        var productImgSrc = product.querySelector('.works__img').getAttribute('src');
        
      
        order.querySelector('.order__img').setAttribute('src',productImgSrc);
    };

    works.addEventListener('click', function (e) {
        var target = e.target;
        if (target.classList.contains('works__btn-popup')) {
            e.preventDefault();
            changeWorksOrderInfo(target);
        }
    })
})();
const selectSingle = document.querySelector('.__select');
const selectSingle_title = selectSingle.querySelector('.__select__title');
const selectSingle_labels = selectSingle.querySelectorAll('.__select__label');

// Toggle menu
selectSingle_title.addEventListener('click', () => {
  if ('active' === selectSingle.getAttribute('data-state')) {
    selectSingle.setAttribute('data-state', '');
  } else {
    selectSingle.setAttribute('data-state', 'active');
  }
});

// Close when click to option
for (let i = 0; i < selectSingle_labels.length; i++) {
  selectSingle_labels[i].addEventListener('click', (evt) => {
    selectSingle_title.textContent = evt.target.textContent;
    selectSingle.setAttribute('data-state', '');
  });
}
;(function () {
    var lazyLoadInstance = new LazyLoad({
        elements_selector: ".lazy"
      });
})();
;(function () {

    var canUseWebP = function() {
        var elem = document.createElement('canvas');
    
        if (!!(elem.getContext && elem.getContext('2d'))) {
          
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }
    
      
        return false;
      };
      
      var isWebpSupported = canUseWebP();
    
      if (isWebpSupported === false) {
        var lazyItems = document.querySelectorAll('[data-src-replace-webp]');
    
        for (var i = 0; i < lazyItems.length; i += 1) {
          var item = lazyItems[i];
    
          var dataSrcReplaceWebp = item.getAttribute('data-src-replace-webp');
          if (dataSrcReplaceWebp !== null) {
            item.setAttribute('data-src', dataSrcReplaceWebp);
          }
        }
      }
    
})();
;(function () {
const popupLinks = document.querySelectorAll(".popup-link");
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout =  800;

if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
        const popupLink = popupLinks[index];
        popupLink.addEventListener("click", function (e) {
            const popupName = popupLink.getAttribute('href').replace('#', '');
            const curentPopup = document.getElementById(popupName);
            popupOpen(curentPopup);
            e.preventDefault();
        });
    }
}

const popupCloseIcon = document.querySelectorAll(".popup__btn-close");
if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}

function popupOpen(currentPopup) {
    if (currentPopup && unlock) {
        const popupActive = document.querySelector('.popup.open');
        if (popupActive) {
            popupClose(popupActive, false);
        } else{
            bodyLock(); 
        }
        currentPopup.classList.add('open');
        currentPopup.addEventListener("click", function (e) {
            if (!e.target.closest('.popup__content')) {
                popupClose(e.target.closest('.popup'));
            }
        });
    }
}

function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
        popupActive.classList.remove('open');
        if (doUnlock) {
            bodyUnLock();
        }
    }
}

function bodyLock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
            const el = lockPadding[index];
            el.style.paddingRight = lockPaddingValue;
        }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout (function() {
        unlock = true;
    }, timeout);
}

function bodyUnLock() {
    setTimeout(function(){
        if (lockPadding.length > 0) {
            for (let index = 0; index < lockPadding.length; index++) {
                const el = lockPadding[index];
                el.style.paddingRight = '0px';
            }
        }
        body.style.paddingRight = '0px';
        body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
        unlock = true;
    }, timeout);
}


})();
(function () {
    if (!Element.prototype.closest) {
        Element.prototype.closest = function (css) {
            var node =  this;
            while (node) {
                if (node.matches(css)) return node;
                    else node = node.parentElement;
                }
                return null;
            };
        }
})();
(function () {
    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
})();


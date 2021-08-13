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
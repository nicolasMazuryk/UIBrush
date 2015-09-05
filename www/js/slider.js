
function slider() {
    var $slider = $('#slider'),
        $sliderLi = $('#slider ul li'),
        $sliderUl = $('#slider ul'),
        sliderAmount = $sliderLi.length,
        sliderWidth = $sliderLi.width(),
        sliderHeight = $sliderLi.height(),
        sliderUlWidth = sliderAmount * sliderWidth,
        launchSlider = setInterval(function(){
            moveRight();
        }, 3000);

    $slider.css({ width: sliderWidth, height: sliderHeight });
    $sliderUl.css({ width: sliderUlWidth, marginLeft: - sliderWidth });
    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveLeft() {
        $sliderUl.animate({ left: + sliderWidth,  opacity: 0 }, 600, function(){
            $('#slider ul li:last-child').prependTo('#slider ul');
            $sliderUl.css({left: '', opacity: 1});
        });
    }
    function moveRight() {
        $sliderUl.animate({ left: - sliderWidth, opacity: 0 }, 600, function(){
            $('#slider ul li:first-child').appendTo('#slider ul');
            $sliderUl.css({left: '', opacity: 1});
        });
    }
    $('a.control-prev').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        moveRight();
    });
    $('a.control-next').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        moveLeft();
    });

    $slider.hover(function () {
        clearInterval(launchSlider);
    }, function () {
        launchSlider = setInterval(function(){
            moveRight();
        }, 3000);
    });
}

slider();

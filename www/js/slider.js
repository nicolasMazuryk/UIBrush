
function slider() {
    setInterval(function(){
        moveLeft();
    }, 3000);

    var $sliderLi = $('#slider ul li'),
        $sliderUl = $('#slider ul'),
        sliderAmount = $sliderLi.length,
        sliderWidth = $sliderLi.width(),
        sliderHeight = $sliderLi.height(),
        sliderUlWidth = sliderAmount * sliderWidth;

    $('#slider').css({ width: sliderWidth, height: sliderHeight });
    $sliderUl.css({ width: sliderUlWidth, marginLeft: - sliderWidth });

    $('#slider ul li:last-child').prependTo('#slider ul');

    function moveRight() {
        $sliderUl.animate({ left: + sliderWidth,  opacity: 0 }, 600, function(){
            $('#slider ul li:last-child').prependTo('#slider ul');
            $('#slider ul').css({left: '', opacity: 1});
        });
    }
    function moveLeft() {
        $sliderUl.animate({ left: - sliderWidth, opacity: 0 }, 600, function(){
            $('#slider ul li:first-child').appendTo('#slider ul');
            $('#slider ul').css({left: '', opacity: 1});
        });
    }

    $('a.control-prev').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        moveLeft();
    });
    $('a.control-next').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        moveRight();
    });

}

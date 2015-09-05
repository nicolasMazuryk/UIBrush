var $aboutUsImg = $('#aboutUs img'),
    $aboutUsP1 = $('.aboutUs_p-1'),
    $aboutUsP2 = $('.aboutUs_p-2');

// Navigation bar scrolling to target-ID
$('header ul li a').on('click', function (e) {
    var $self = this;
    e.preventDefault();
    e.stopPropagation();

    $('body').animate({
        scrollTop: $( $(this).attr('href') ).offset().top
    }, 600, function () {
        $('header li.active').removeClass('active');
        $($self).parent().addClass('active');
    });
});
// #Banner and #Pricing - buttons scrolling
$('#bannerButton , #pricing li.btn').on('click', function () {
    $('body').animate({
        scrollTop: $('#contacts').offset().top
    }, 600);
});
// #AboutUs buttons handlers
$('#ourHistory').on('click', function () {
    $aboutUsImg.attr('src', "img/our-history.jpg");
    $aboutUsP1.text('Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet blanditiis consequuntur cupiditate deserunt dignissimos earum, fuga, impedit iure, iusto laborum modi quas quod rerum veritatis. Accusamus adipisci atque blanditiis consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto commodi hic quae sit, suscipit voluptatibus?');
    $aboutUsP2.text('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam amet dolores nihil possimus quos veritatis, voluptatum. Consectetur consequatur dolores earum et odio perferendis qui temporibus. Amet asperiores aspernatur corporis cum dolor ducimus, earum eveniet exercitationem fugiat hic illo, inventore itaque iusto labore laboriosam maiores minima mollitia nesciunt nihil obcaecati odio qui quos ratione repudiandae similique temporibus ullam veritatis vitae voluptatem voluptatibus!')
    $('#aboutUs input.active').removeClass('active');
    $(this).addClass('active');
});
$('#ourMission').on('click', function () {
    $aboutUsImg.attr('src', "img/our-mission.jpg");
    $aboutUsP1.text('Impedit iure, iusto laborum modi quas quod rerum veritatis. Accusamus adipisci atque blanditiis consequatur. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto commodi hic quae sit, suscipit voluptatibus? Aliquam amet dolores nihil possimus quos veritatis, voluptatum. Consectetur consequatur dolores earum et odio perferendis qui temporibus. Amet asperiores aspernatur corporis cum dolor ducimus, earum eveniet exercitationem fugiat hic illo, inventore itaque iusto labore laboriosam maiores minima mollitia nesciunt nihil obcaecati odio qui quos ratione repudiandae similique temporibus ullam veritatis vitae voluptatem voluptatibus!');
    $aboutUsP2.text('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. A amet blanditiis consequuntur cupiditate deserunt dignissimos earum, fuga.');
    $('#aboutUs input.active').removeClass('active');
    $(this).addClass('active');
});
// OnScroll CSS-animations
function showOnScroll() {
    var $window = $(window),
        windowHeightPadded = $window.height() * 0.9;

    $window.on('scroll', function() {
        var scrolled = $window.scrollTop();

        $('.revealOnScroll:not(.animated)').each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + windowHeightPadded > offsetTop) {
                $this.addClass('animated ' + $this.data('animation')).css('opacity', '1');
            }
        });
        $('.revealOnScroll.animated').each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;

            if (scrolled + $window.height() < offsetTop) {
                $this.removeClass('animated ' + $this.data('animation')).css('opacity', '0');
            }
        });
    });
}
showOnScroll();


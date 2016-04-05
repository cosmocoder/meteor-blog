Template.navbar.onRendered(function() {

    // show header nav on scroll up
    var MQL = 1170,
        $navbar = $('.navbar-custom');

    // primary navigation slide-in effect
    if ($(window).width() > MQL) {
        var headerHeight = $navbar.height();

        $(window).on('scroll', {previousTop: 0}, debounce(function(e) {
            var currentTop = $(window).scrollTop();

            // check if user is scrolling up
            if (currentTop < e.data.previousTop) {

                // if scrolling up...
                if (currentTop > 0 && $('.navbar-custom').hasClass('is-fixed')) {
                    $navbar.addClass('is-visible');
                }
                else {
                    $navbar.removeClass('is-visible is-fixed');
                }
            }
            else {

                // if scrolling down...
                $navbar.removeClass('is-visible');

                if (currentTop > headerHeight && !$navbar.hasClass('is-fixed')) {
                    $navbar.addClass('is-fixed');
                }
            }

            e.data.previousTop = currentTop;
        }, 50));
    }
});


// function to enable debouncing
function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};



Template.navbar.helpers({

    // set special class on navbar when in admin area
    isAdmin: function() {
        var currentRoute = Router.current();
        return currentRoute && currentRoute.url.indexOf('admin') !== -1 ? '-admin' : '';
    },

    // set "active" class on current nav item
    activeTemplateIs: function(templateName) {
        var currentRoute = Router.current();

        if (templateName === 'blogAdmin') {
            return currentRoute && currentRoute.url.indexOf('admin') !== -1 ? 'active' : '';
        }
        else if (templateName === 'blog') {
            return currentRoute && currentRoute.url.indexOf('blog') !== -1 && currentRoute.url.indexOf('admin') === -1 ? 'active' : '';
        }
        else {
            return currentRoute && templateName === currentRoute.route.getName() ? 'active' : '';
        }
    }
});
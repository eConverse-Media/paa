$(function () {
    handleFooter();
    handleCopyrightDate();
    handleHomepageColumns();
    handleTiles();
    handleBlueBackground();
    handlePublications();
    handleLandingControls();
    handleMemberSpotlight();
    handleSlick();
    handleHeaderImages();
    handleSearch();
    handleEventImages();
});

function handleFooter() {
    $('.footer-social, .footer-promo-img').wrapAll('<div class="footer-right-column" />');
}

function handleCopyrightDate() {
    var year = new Date().getFullYear();

    $('.copyright-year').text(year);
}

function handleHomepageColumns() {
    $('.home .row > .col-md-9[class*="section"]').addClass('col-md-8').removeClass('col-md-9');
    $('.home .row > .col-md-3[class*="section"]').addClass('col-md-4').removeClass('col-md-3');
}

function handleTiles() {
    $('.cta-tile').closest('div[class*="section"]').wrapInner('<div class="tiles" />');
}

function handleBlueBackground() {
    if ($('.home-events .HLLandingControl.HLEventList .Content').html()) {
        $('.home-events').closest('.row').addClass('events-wrapper');
    }
}

function handlePublications() {
    $('.publication').each(function () {
        var self = $(this);
        $(self).find('.HtmlContent img').wrap('<div class="img-container" />');
        $(self).find('.HtmlContent .img-container').prependTo($(self).find('.HtmlContent'));
        $(self).find('.HtmlContent > *:not(.img-container)').wrapAll('<div class="text-container" />');
        handleBgImage($(self).find('.img-container'), $(self).find('.img-container'));
    });
}

function handleLandingControls() {

    // insert byline after content
    $('.HLLandingControl ul li').each(function () {
        var self = $(this),
            ByLine = $(self).find('.ByLine'),
            postedIn = $(self).find('h5');

        $(ByLine).appendTo(self);
        if (!!($(postedIn).html())) {
            $(postedIn).insertAfter(ByLine);
        }
    });

    // handle commas in bylines
    $('.HLLandingControl.SearchResults ul li').each(function() {
        var byline = $(this).find('.ByLine');
        var byLineLink = $(byline).find('a[id*="Name"]');
        if (byLineLink.length === 0) {
            var trimmedByline = $(byline).text().trim().slice(2, $(byline).text().trim().length);
            $(byline).text(trimmedByline);
        }        
    });

    // handle news section
    $('.home-news .HLLandingControl ul li').each(function () {
        var self = $(this);

        handleAjaxCall(self);

        var self = $(this),
            link = $(self).find('h3 a'),
            href = $(link).attr('href');

        $(self).wrapInner('<a href="' + href + '" />');
        $(link).contents().unwrap();
    });

    // handle events section 
    $('.home-events .HLEventList ul li').each(function () {
        var self = $(this),
            imgContainer = $(self).find('.row.title-row > .col-md-3');

        handleBgImage(imgContainer, imgContainer);

        var eventType = $(self).find('.title-row .col-md-9 h4'),
            location = $(self).find('.title-row .col-md-9 div[id*="Location"]');

        if (!!$(location).html()) {
            $(eventType).insertAfter(location);
        }
    });

}

function handleMemberSpotlight() {
    $('.member-spotlight .HtmlContent img').wrap('<div class="img-container" />');
    $('.member-spotlight .HtmlContent > h3, .member-spotlight .HtmlContent em').wrapAll('<div class="text-container" />');
    $('.member-spotlight .img-container, .member-spotlight .text-container').wrapAll('<div class="flex-container" />');
    $('.member-spotlight .flex-container').prependTo($('.member-spotlight .HtmlContent'));
    $('.member-spotlight .HtmlContent > *:not(.flex-container)').wrapAll('<div class="spotlight-content" />');
}

function handleSlick() {
    $('.main-slide').wrapAll('<div class="slider slick-dotted" />');
    $('.slider').slick({
        dots: false,
        arrows: true,
        infinite: true,
        fade: true,
        autoplay: true,
        prevArrow: '<button type="button" class="slick-arrow prev-arrow"><i class="ft ft-arrow-back"></i></button>',
        nextArrow: '<button type="button" class="slick-arrow next-arrow"><i class="ft ft-arrow-forward"></i></button>'
    });

    handleSlideCount();
}

function handleSlideCount() {
    var slideArray = $('.main-slide').toArray(),
        slideCount = slideArray.length;

    for (var i = 0; i < slideCount; i++) {
        var slide = slideArray[i],
            number = i + 1,
            h6Text = '<h6>' + number + '/' + slideCount + '</h6>';

        $(slide).find('.HtmlContent').prepend(h6Text);
    }
}

function handleHeaderImages() {
    // handle header bg
    var headerImg = !!($('.header-bg').html()) ? $('.header-bg') : $('.default-header-bg');

    if (!($('#PageTitleH1').attr('aria-hidden') == 'true')) {
        $('#PageTitleH1').wrap('<div class="interior-header" />');
        $('.interior-header').append($('#BreadCrumb'));
        handleBgImage(headerImg, $('.interior-header'));
    }

    // handle big header
    $('.big-header').closest('#MPOuter').addClass('big-header');
    $('#MainCopy_ContentWrapper').removeClass('big-header');
    $('.big-header .add-to-header').appendTo('#PageTitleH1');
}

function handleSearch() {
    $('#MPheader > div.row:first-child > .col-md-12').append('<button type="button" class="search-btn-top" onclick="toggleSearch();"></button>');
    $('.search-bar-top').appendTo('#MPheader > div.row:first-child > .col-md-12');
    $('.search-bar-top .form-control').attr('placeholder', 'Type search terms here...');
    $('#searchColumn .form-control').attr('placeholder', 'Type search terms here...');
    $(document).click(function (e) {
        var searchBar = $('.search-bar-top'),
            searchButton = $('.search-btn-top'),
            target = e.target;

        if (!($(target).is(searchBar)) &&
            !($(target).is(searchButton)) &&
            !($(target).closest('.search-bar-top').html()) &&
            !($(target).closest('.search-btn-top').html())) {
                closeSearch();
        }
    });
}

function toggleSearch() {
    if ($('.search-bar-top').hasClass('open')) {
        closeSearch();
    } else {
        openSearch();
    }
}
    
function closeSearch() {
    $('.search-bar-top').removeClass('open');
    $('.search-btn-top').removeClass('open');
}

function openSearch() {
    $('.search-bar-top').addClass('open');
    $('.search-btn-top').addClass('open');
    $('.search-bar-top .form-control').focus();
}

function handleEventImages() {
    $('.home .HLEventList ul li').each(function () {
        var self = $(this),
            noImage = !!($(self).find('.row.title-row > .col-md-12').html());

        if (noImage) {
            $(self).find('.row.title-row > .col-md-12').addClass('col-md-9').removeClass('col-md-12');
            $(self).find('.row.title-row').append('<div class="col-md-3 pull-right" />');
        }
    });
}
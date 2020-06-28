import $ from 'jquery';
import window from 'global/window';

$(window).on('load', function() {
    // page loding animation
    $('.js-overlay').addClass('is-hide');

    // thumb pick
    const $pickThumb = $('.js-pick-thumb');
    $pickThumb.on('click', function() {
        const thumb = $(this).attr('src');
        $('.js-pick-panel').attr('src', thumb);

        $pickThumb.removeClass('is-active');
        $(this).addClass('is-active');

        return false;
    });

    // pagetop
    const $pageTopBtn = $('.js-pagetop-btn');
    $pageTopBtn.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 200);
        return false;
    });
});

function sum(x = 0, y = 0, z = 0) {
    return x + y + z;
}
export default sum;

const pageDataUrl = `${window.location.origin}/json/data.json`;
fetch(pageDataUrl)
    .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error();
        }
    })
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });

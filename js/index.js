$('.list-group-item-actio a').on('click', function (event) {
    event.preventDefault();
    $(".active").tab('hide');
    $(this).tab('show');
})

$('body').scrollspy({ target: '#toScrollspy' })

function borrowBook(id){
    $.ajax({
        url: '/books/borrow/' + id,
        type: 'GET',
        data: $('#borrow_book').serialize(),
        success: function (result){
            window.location.replace("./");
        }
    })
}
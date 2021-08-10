function updateBook(id){
    console.log("check")
    $.ajax({
        url: '/books/' + id,
        type: 'PUT',
        data: $('#update_book').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
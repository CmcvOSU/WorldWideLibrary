function updatePatron(id){
    console.log("working")
    $.ajax({
        url: '/patron_reservation/' + id,
        type: 'PUT',
        data: $('#patron_reservation').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
};
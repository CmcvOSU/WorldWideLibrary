function updatePatron(id){
    console.log("working")
    $.ajax({
        url: '/' + id,
        type: 'PUT',
        data: $('#patron_reservation').serialize(),
        success: function(result){
            window.location.replace("/");
        }
    })
};
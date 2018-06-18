console.log("I'm here!");

$('#createAccount').on('shown.bs.modal', function (){
    $('#accountModal').modal('show');
    console.log("Show modal");
})

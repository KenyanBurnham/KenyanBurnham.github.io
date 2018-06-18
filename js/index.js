console.log("has it changed yet?");

$('#createAccount').on('shown.bs.modal', function (){
    $('#accountModal').modal('show');
    console.log("Show modal");
})

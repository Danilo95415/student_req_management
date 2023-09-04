$(document).ready(function () {

  $('input[name="role"]').change(function () {
    var value = $(this).val();
    if (value == 2) {
      $("#add_detail").css("display", "none");
    } else {
      $("#add_detail").css("display", "block");
    }
  });

  $("#registrationForm").submit(function (event) {
    event.preventDefault();

    var user_id = $("#user_id").val();
    var user_name = $("#user_name").val();
    var password = $("#password").val();
    var cpassword = $("#cpassword").val();
    var department_name = $("#department_name").val();
    var user_type = $('input[name="role"]:checked').val();
    var data = {
      user_id,
      user_fullname: user_name,
      user_pass: password,
      user_type,
      department: department_name,
    };
    $.post("/std_req_manager/controller/register.php",
    data,
    function(data, status){
        alert(data);
        window.location.href = './login.html';
    });
  });
  
});

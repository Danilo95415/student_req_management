$(document).ready(function () {
  $('input[name="role"]').change(function () {
    var value = $(this).val();
    if ((value == "1") | (value == "2")) {
      $("#add_detail").css("display", "none");
    } else {
      $("#add_detail").css("display", "block");
    }
  });

  $("#registrationForm").submit(function (event) {
    event.preventDefault();

    var email = $("#email").val();
    var user_name = $("#user_name").val();
    var password = $("#password").val();
    var cpassword = $("#cpassword").val();
    var department_name = $("#department_name").val();
    var data = {
      email,
      user_name,
      password,
      cpassword,
      department_name,
    };
    console.log(data);
  });

  $("#loginForm").submit(function (event) {
    event.preventDefault();

    var email = $("#email").val();
    var password = $("#password").val();
    var data = {
      email,
      password,
    };
    console.log(data);
  });
  $("#addForm").click(function () {
    var user_name = $("#user_name").val();
    var user_date = $("#user_date").val();
    var department_name = $("#department_name").val();
    var text = $("#user_text").val();
    var status = $("#status").val();

    var data = {
      user_name,
      user_date,
      department_name,
      text,
      status,
    };
    console.log(data);
  });

  $("#handleEdit").click(function () {
    console.log("ddddd");
    var user_name = $("#user_name").val();
    var user_date = $("#user_date").val();
    var department_name = $("#department_name").val();
    var text = $("#user_text").val();
    var status = $("#status").val();
    var data = {
      user_name,
      user_date,
      department_name,
      text,
      status,
    };
    console.log(data);
  });
  var color_list = {
    1: "read",
    2: "blue",
    3: "vloleta",
    4: "orange",
    5: "green",
    6: "red",
  };
  $("#status_color").css("background-color", "red");
});

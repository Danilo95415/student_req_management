$(document).ready(function () {
  

  $("#loginForm").submit(function (event) {
    event.preventDefault();

    var user_id = $("#user_id").val();
    var password = $("#password").val();
    var data = {
      user_id,
      user_pass: password,
    };
    $.post("/std_req_manager/controller/login.php",
    data,
    function(data, status){
        const login = JSON.parse(data);
        if (login.state == "success") {
          alert("login success")
          localStorage.setItem('user', JSON.stringify(login?.user))
          setTimeout (() => {
            if (login.user.type == 0) window.location.href = "./student.html"
            if (login.user.type == 1) window.location.href = "./teacher.html"
            if (login.user.type == 2) window.location.href = "./secretary.html"
          }, 500)
        }
        else alert(login.state)
    });
    console.log(data);
  });
  
});

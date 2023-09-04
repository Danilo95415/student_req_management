showAllData = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const data = {
    user_id: user.id,
    user_type: user.type,
    department: user.department
  }
  $.post("/std_req_manager/controller/get_requests.php",
  data,
  function(data, status){
    const requests = JSON.parse(data);
    var row;
    var color_list = ["darkgray", "blue", "purple", "orange", "green", "red"];
    var status_list = ["Recibida", "Aceptada", "Rechazada", "En proceso", "Autorizada", "Negada"];
    requests.map((req, index) => {
      row += `<tr>
        <th>${index+1}</th>
          <td>${req.created_at}</td>
          <td>${req.department}</td>
          <td class="truncate">${req.content}</td>
          <td>${status_list[req.status]}<div class="status" style="background: ${color_list[req.status]}"><div></td>
          <td class="d-flex justify-content-center align-items-center">
            <button
              type="button"
              id="handleEdit"
              class="btn btn-outline-info"
              data-bs-toggle="modal"
              data-bs-target="#edit"
              onclick="edit(${req.id})"
            >
              Editar
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-toggle="modal"
              data-bs-target="#delete"
              onclick="remove(${req.id})"
            >
              Borrar
            </button>
          </td>
        </tr>`;
    });
    $("#display_data").html(row);
  });
}
$(document).ready(function () {

  user = localStorage.getItem("user");
  if (!user) window.location.href = "./login.html"
  console.log(user)

  initAddModal = () => {
    $("#add_department_name").val("");
    $("#add_user_text").val("");
    console.log("clear")
  }


  $("#addForm").click(function () {
    var department_name = $("#add_department_name").val();
    var text = $("#add_user_text").val();
    const user = JSON.parse(localStorage.getItem("user"));

    var data = {
      user_id: user.id,
      department: department_name,
      content: text,
    };

    $.post("/std_req_manager/controller/add_request.php",
    data,
    function(data, status){
      if (data == "success") showAllData();
      alert("state: " + data);
      $(".btn_close_add_modal").click();
    });
    console.log(data);
  });

  $("#handleEdit").click(function () {
    var req_id = $("#req_id").val();
    var content = $("#edit_user_text").val();
    var department = $("#edit_department_name").val();
    var data = {
      req_id,
      content,
      department
    };
    $.post("/std_req_manager/controller/update_request.php",
    data,
    function(data, status){
      if (data == "success") showAllData();
      alert(data)
      $(".btn_close_edit_modal").click();
    });
  });

  edit = req_id => {
    $("#req_id").val(req_id);
    $.post("/std_req_manager/controller/get_request.php",
    {req_id},
    function(data, status){
      const req = JSON.parse(data);
      console.log(req)
      $("#edit_user_text").val(req.content)
      $("#edit_department_name").val(req.department)
    });
  }

  remove = req_id => {
    $("#req_id").val(req_id);
  }

  $(".delete_confirm").click(function () {
    var req_id = $("#req_id").val();
    
    $.post("/std_req_manager/controller/delete_request.php",
    {req_id},
    function(data, status){
      if (data == "success") showAllData();
      alert(data)
      $(".btn_close_delete_modal").close()
    });
  });
  handlelogout = () => {
    localStorage.removeItem("user");
    window.location.href ='./login.html'
  }
});

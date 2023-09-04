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
          <td>${req.name}</td>
          <td>${req.created_at}</td>
          <td>${req.department}</td>
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
            <a
              type="button"
              class="btn btn-outline-secondary"
              onclick="download_pdf(${req.id})"
            >
              Descargar
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

  initAddModal = () => {
    $("#add_department_name").val("");
    $("#add_user_text").val("");
    console.log("clear")
  }

  

  edit = req_id => {
    $("#req_id").val(req_id);
    console.log(req_id)
    $.post("/std_req_manager/controller/get_request_edit.php",
    {req_id},
    function(data, status){
      const req = JSON.parse(data);
      console.log(req)
      $("#user_name").val(req.name)
      $("#user_date").val(req.created_at)
      $("#department_name").val(req.department)
      $("#status").val(req.status)
    });
  }

  $("#handleEdit").click(function () {
    var req_id = $("#req_id").val();
    var status = $("#status").val();
    var data = {
      req_id,
      status
    };
    $.post("/std_req_manager/controller/update_status_request.php",
    data,
    function(data, status){
      if (data == "success") showAllData();
      alert(data)
      $(".btn_close_edit_modal").click();
    });
  });

  handlelogout = () => {
    localStorage.removeItem("user");
    window.location.href ='./login.html'
  }

  download_pdf = req_id => {
    window.location.href = "/std_req_manager/controller/download.php?req_id=" + req_id;
  }
});

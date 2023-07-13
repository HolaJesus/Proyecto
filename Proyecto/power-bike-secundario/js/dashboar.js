let idUserlocal = localStorage.getItem("idUser")
function ok() {
  $('#username').val(idUser);
  console.log(idUser)
}
function prueba() {
  
  console.log("ZZ");
}

$(document).ready(function () {
  updateUser(idUserlocal);
});

////////////        FUNCION PARA ACTUALIZAR EL NOMBRE      /////////////////////
function updateUser(idUserlocal) {
  console.log(idUserlocal);
  $.ajax({
      url: "http://localhost:8080/api/User/" + idUserlocal,
      //url:"http://155.248.195.219:8080/api/Client/"+idCliente, 
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
        console.log(respuesta);
          $("#username").html(respuesta.nombreUsuario);
          console.log(respuesta.nombreUsuario);
         
      }
  });
}
function getInfoUser() {
  $.ajax({
      url: "http://localhost:8080/api/User/all",
      //url:"http://155.248.195.219:8080/api/Client/all",
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
        $('#listadoDeportistas').css('display', 'block');
          console.log(respuesta);
          showInfoClient(respuesta);
      }
  }); 
}

function showInfoClient(items) {
  console.log("hola")
  let myTable = "<table class='table'>";
  myTable += "<tr>";
  myTable += "<th scope='col'>Nombre</th>";
  myTable += "<th scope='col'>Apellidos</th>";
  myTable += "<th scope='col'>Email</th>";
  myTable += "<th scope='col'>NumeroDocumento</th>";
  myTable += "<th scope='col'>Contraseña</th>";
  myTable += "<th>Editar</th>";
  myTable += "<th>Borrar</th>";
  for (i = 0; i < items.length; i++) {
      myTable += "<tr>";
      myTable += "<td>" + items[i].nombreUsuario + "</td>";
      myTable += "<td>" + items[i].apellidoPaterno+ ' ' + items[i].apellidoMaterno +"</td>";
      myTable += "<td>" + items[i].correoElectronico + "</td>";
      myTable += "<td>" + items[i].numeroDocumento + "</td>";
      myTable += "<td>" + items[i].password + "</td>";
      myTable += "<td> <button class='btn bg-danger text-white' onclick='saveUser(" + items[i].idUser + ")'>Editar</button>";
      myTable += "<td> <button type='submit' class='btn bg-danger text-white' onclick='deleteUser(" + items[i].idUser + ")'>Borrar</button>";
      myTable += "</tr>";
  }
  myTable += "</table>";
  $("#listadoDeportistas").html(myTable);
}
function deleteUser(idUser) {
  $.ajax({
      url: "http://localhost:8080/api/User/" + idUser,
      //url:"http://155.248.195.219:8080/api/Client/"+idCliente, 
      type: "DELETE",
      success: function (respuesta) {
          $("#resultadoCliente").empty();
          getInfoClient();
          alert("Se ha ELIMINADO el cliente de la base de datos.")
      }
  });
}

function saveUser(idUser) {

  let myData = {
      tipoDocumento: "cc",
      numeroDocumento: 313123,
      nombreUsuario: $("#first_name").val(),
     
      apellidoPaterno: $("#surname").val(),
      apellidoMaterno: $("#second_surname").val(),
      password : $("#regpassword").val(),
      correoElectronico: $("#email").val(),
      rolUser: "deportista",
  };
  
  $.ajax({
      type: "POST",
      contentType: "application/json; charset=utf-8",
      url: "http://localhost:8080/api/User/save",
      //url:"http://155.248.195.219:8080/api/Client/save",
      datatype: "JSON",
      data: JSON.stringify(myData),

      success: function (respuesta) {
          
          alert("Se ha GUARDADO el cliente en la base de datos")
      }
  });

}
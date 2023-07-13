let idUser = null;

function prueba() {
  console.log(idUser)
}

function registrar() {
  $('#formulario-login').css('display', 'none');
  $('#card-login').css('display', 'none');
  $('#formulario-registro').css('display', 'block');
  $('#card-registro').css('display', 'block');


}
function restablecer() {
  $('#form_login').css('display', 'none');

  $('#formulario-restablecer').css('display', 'block');



}
function registrarResponse() {
  $('#formulario-login').css('display', 'none');

  $('#formulario-registro').css('display', 'block');



}
function registro() {
  if ($("#first_name").val().length == 0 || $("#second_name").val().length == 0
      || $("#surname").val().length == 0 || $("#second_surname").val().length == 0 || $("#email").val().length == 0) {
      alert("Todos los campos son obligatorios");
  } else{
    $('#registro1').css('display', 'none');
    $('#registro2').css('display', 'block');
  }



}
function registro2() {
  if ($("#regpassword").val().length == 0) {
      alert("Todos los campos son obligatorios");
  }if($("#regpassword").val() != $("#confirm_password").val()){
      alert("Contraseñas deben ser iguales")
  }
  else{
    console.log("dasdsa")
    saveUser()
  }



}
function backregistro(){
  $('#registro1').css('display', 'block');
    $('#registro2').css('display', 'none');
}
function loginver() {
  $('#formulario-login').css('display', 'block');
  $('#card-login').css('display', 'block');
  $('#formulario-registro').css('display', 'none');
  $('#card-registro').css('display', 'none');
}
function loginResponse() {
  $('#formulario-login').css('display', 'block');

  $('#formulario-registro').css('display', 'none');

}








////////////        FUNCION PARA TRAER TODOS LOS CLIENTES      /////////////////////
function getInfoClient() {
  $.ajax({
      url: "http://localhost:8080/api/Client/all",
      //url:"http://155.248.195.219:8080/api/Client/all",
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
          console.log(respuesta);
          showInfoClient(respuesta);
      }
  }); 
}

////////////        FUNCION PARA EL LOGIN   /////////////////////
function login() {
  email= $("#users").val();
  password= $("#password").val();
  $.ajax({
      url: "http://localhost:8080/api/User/"+email+"/"+password,
      //url:"http://155.248.195.219:8080/api/Client/all",
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
        if (!respuesta){
          console.log("error")
          return false
        }else{
          console.log(respuesta);
          idUser= respuesta;
          console.log(idUser)
          localStorage.setItem("idUser", idUser); // Almacenar en el almacenamiento local
          location.href = ('../html/dashboar.html')
        }
          
      }
  }); 
}

////////////        FUNCION PARA MOSTAR LOS DATOS DE LOS CLIENTES EN LA TABLA     /////////////////////
// function showInfoClient(items) {
//   let myTable = "<table>";
//   myTable += "<tr>";
//   myTable += "<th>Nombre</th>";
//   myTable += "<th>Email</th>";
//   myTable += "<th>Edad</th>";
//   myTable += "<th>Editar</th>";
//   myTable += "<th>Borrar</th>";
//   for (i = 0; i < items.length; i++) {
//       myTable += "<tr>";
//       myTable += "<td>" + items[i].name + "</td>";
//       myTable += "<td>" + items[i].email + "</td>";
//       myTable += "<td>" + items[i].age + "</td>";
//       myTable += "<td> <button onclick='preUpdateClient(" + items[i].idClient + ")'>Editar</button>";
//       myTable += "<td> <button onclick='deleteInfoClient(" + items[i].idClient + ")'>Borrar</button>";
//       myTable += "</tr>";
//   }
//   myTable += "</table>";
//   $("#resultadoClientes").html(myTable);
// }

////////////        FUNCION PARA GUARDAR LOS DATOS DE UN CLIENTE      /////////////////////
function saveUser() {

      let myData = {
          tipoDocumento: "cc",
          numeroDocumento: $("#identification_number").val(),
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
            location.reload();
            $("#identification_number").val('');
            $("#first_name").val('');
            $("#second_name").val('');

            $("#surname").val('');
            $("#second_surname").val('');
            $("#regpassword").val('');
            $("#confirm_password").val('');
            $("#email").val('');
              alert("Se ha GUARDADO el cliente en la base de datos")

          }
      });
  
}




////////////        FUNCION PARA ACTUALIZAR LOS DATOS DE UN CLIENTE      /////////////////////
function updateInfoClient() {
  if ($("#clEmail").val().length == 0 || $("#clPassword").val().length == 0
      || $("#clName").val().length == 0 || $("#clAge").val().length == 0) {
      alert("Todos los campos son obligatorios");
  } else {
      let myData = {
          idClient: $("#clId").val(),
          email: $("#clEmail").val(),
          password: $("#clPassword").val(),
          name: $("#clName").val(),            
          age: $("#clAge").val(),
          
      };
      console.log(myData);
      let dataToSend = JSON.stringify(myData);
      $.ajax({
          url: "http://localhost:8080/api/Client/update",
          //url:"http://155.248.195.219:8080/api/Client/update",
          type: "PUT",
          data: dataToSend,
          contentType: "application/JSON",
          datatype: "JSON",
          success: function (respuesta) {
              $("#resultadoCliente").empty();
              $("#clId").val("");
              $("#clEmail").val("");
              $("#clPassword").val("");
              $("#clName").val("");
              $("#clAge").val("");
              $("#btnCrearCliente").css('visibility', 'visible');
              $("#btnActualizarCliente").css('visibility', 'hidden');
              getInfoClient();
              alert("Se ha ACTUALIZADO los datos del cliente")
          }
      });
  }

}

////////////        FUNCION PARA BORRAR LOS DATOS DE UN CLIENTE      /////////////////////
function deleteInfoClient(idCliente) {
  $.ajax({
      url: "http://localhost:8080/api/Client/" + idCliente,
      //url:"http://155.248.195.219:8080/api/Client/"+idCliente, 
      type: "DELETE",
      success: function (respuesta) {
          $("#resultadoCliente").empty();
          getInfoClient();
          alert("Se ha ELIMINADO el cliente de la base de datos.")
      }
  });
}



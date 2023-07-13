package com.usa.ciclo3.ciclo3.web;

import com.usa.ciclo3.ciclo3.model.User;
import com.usa.ciclo3.ciclo3.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

//Url desde donde el controlador va a ser alcanzado
@RestController
@RequestMapping("/api/User")
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
public class UserController {

    @Autowired
    private UserService userService;

    //Peticion GET Consultar todo
    @GetMapping("/all")
    public List<User> getClients() {
        return userService.getAll();
    }

    //Peticion GET Consultar con id
    @GetMapping("/{idUser}")
    public Optional<User> getClient(@PathVariable("idUser") int id) {
        return userService.getUser(id);
    }

    //Peticion POST Crear
    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public User save(@RequestBody User user) {
        return userService.save(user);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user) {
        return userService.update(user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int idUser) {
        return userService.deleteUser(idUser);
    }

    @GetMapping("/{emailUser}/{passwordUser}")
    public ResponseEntity<Integer> Login(@PathVariable("emailUser") String email, @PathVariable("passwordUser") String password) {
        return ResponseEntity.ok(userService.login(email, password));
    }
}


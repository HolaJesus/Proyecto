package com.usa.ciclo3.ciclo3.repository;

import com.usa.ciclo3.ciclo3.model.User;
import com.usa.ciclo3.ciclo3.repository.crud.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {

    @Autowired
    private UserCrudRepository userCrudRepository;

    //Metodo que trae todos los elementos de la tabla
    public List<User> getAll() {
        return (List<User>) userCrudRepository.findAll();
    }

    //Metodo para traer cliente por id
    public Optional<User> getUser(int id) {    //Optional maneja los null investigar mas
        return userCrudRepository.findById(id);
    }

    //Metodo para guardar un objeto cliente, tambien sirve para actualizar
    public User save(User user) {
        return userCrudRepository.save(user);
    }

    //Metodo para borarr cliente
    public void delete(User user) {
        userCrudRepository.delete(user);
    }

    public Optional<User> login(String email, String password) {
        return userCrudRepository.login(email, password);
    }

}

package com.usa.ciclo3.ciclo3.service;

import com.usa.ciclo3.ciclo3.model.User;
import com.usa.ciclo3.ciclo3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

//Este metodo busca todos los usuarios
    public List<User> getAll() {
        return userRepository.getAll();
    }

    //
    public Optional<User> getUser(int id) {
        return userRepository.getUser(id);
    }

    public User save(User user) {
        if (user.getIdUser() == null) {
            return userRepository.save(user);
        } else {
            Optional<User> userAux = userRepository.getUser(user.getIdUser());
            if (userAux.isEmpty()) {
                return userRepository.save(user);
            } else {
                return user;
            }
        }
    }

    public User update(User user){
        if(user.getIdUser()!=null){
            Optional<User> userOptional= userRepository.getUser(user.getIdUser());
            if(!userOptional.isEmpty()){
                if(userOptional.get()!=null){
                    userOptional.get().setCorreoElectronico(user.getCorreoElectronico());
                }

                userRepository.save(userOptional.get());
                return userOptional.get();
            }else{
                return user;
            }
        }else{
            return user;
        }
    }

    public boolean deleteUser(int userId) {
        Boolean aBoolean = getUser(userId).map(user -> {
            userRepository.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public Integer login(String email, String password) {
        Optional<User> userAux = userRepository.login(email, password);
        if (userAux.isEmpty()) {
            return null;
        }
        return userAux.get().getIdUser();
    }
    
}


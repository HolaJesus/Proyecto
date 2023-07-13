package com.usa.ciclo3.ciclo3.repository.crud;

import com.usa.ciclo3.ciclo3.model.User;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;


public interface UserCrudRepository extends CrudRepository<User, Integer> {

    
    //public boolean existsByEmailAndPassword(String email, String password);

    // SELECT clientid, COUNT(*) AS total FROM reservacion group by clientid order by desc;
    //SELECT * FROM user WHERE email=() and password=()

    @Query("SELECT a from User a WHERE a.correoElectronico = ?1 and a.password = ?2")
    public Optional<User> login(String email, String password);
}

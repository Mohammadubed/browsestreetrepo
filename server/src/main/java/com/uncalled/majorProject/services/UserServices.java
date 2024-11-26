package com.uncalled.majorProject.services;

import com.uncalled.majorProject.entities.User;
import com.uncalled.majorProject.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.beans.Encoder;
import java.util.Collections;

@Service
@Slf4j
public class UserServices {

    @Autowired
    private UserRepository userRepository;

    private static final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public boolean saveNewUser(User user) {

        try {

            user.setPassword(passwordEncoder.encode(user.getPassword()));
            user.setRoles(Collections.singletonList("User"));
            userRepository.save(user);
            return true;
        } catch (Exception e) {

            log.error("An Exception Occurred in thread saveNewUser with massage :{}",e.getMessage());
            return false;
        }
    }

    public User getUserById(ObjectId id){

        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email){

        return userRepository.findUserByEmail(email).orElse(null);
    }

    public boolean saveUser(User user){

        try {

            userRepository.save(user);
            return true;
        } catch (Exception e) {

            log.error("An Exception occur in thread App/services/UserServices/saveUser with massage{}",e.getMessage());
            return false;
        }
    }

    public boolean deleteById(ObjectId id){

        try{

            return deleteById(id);
        } catch (Exception e){

            log.error("An Exception occur in thread App/services/UserServices/deleteById with massage{}",e.getMessage());
            return false;
        }
    }

    public boolean deleteByEmail(String email){

        try{

            return userRepository.deleteByEmail(email);
        } catch (Exception e){

            log.error("An Exception occur in thread App/services/UserServices/deleteByEmail with massage{}",e.getMessage());
            return false;
        }
    }
}

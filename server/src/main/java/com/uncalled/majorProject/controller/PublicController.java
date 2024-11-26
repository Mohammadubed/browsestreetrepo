package com.uncalled.majorProject.controller;

import com.uncalled.majorProject.entities.User;
import com.uncalled.majorProject.services.EmailServices;
import com.uncalled.majorProject.services.UserDetailsServiceImpl;
import com.uncalled.majorProject.services.UserServices;
import com.uncalled.majorProject.utilis.JWTutil;
import io.swagger.v3.core.util.Json;
import lombok.extern.slf4j.Slf4j;
import org.bson.json.JsonObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@Slf4j
@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserServices userServices;

    @Autowired
    private EmailServices emailServices;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JWTutil jwtUtil;

    @PostMapping("/otp")
    public ResponseEntity<String> sendOtp(@RequestBody User email){

        try{

            User user = userServices.getUserByEmail(email.getEmail());
            if(user==null) {

                String otp = emailServices.generateNSendOtp(email.getEmail());
                return new ResponseEntity<>(otp, HttpStatus.OK);
            } else {

                return new ResponseEntity<>("Exist" , HttpStatus.CONFLICT);
            }

        } catch (Exception e) {

            log.error("An Exception occurred in thread App/controller/PublicController/sendOtp with massage:{}",e.getMessage());
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/health-check")
    public ResponseEntity<String> healthcheck(){
        return new ResponseEntity<>("ok",HttpStatus.OK);
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> createUser(@RequestBody User user){

        try{

            userServices.saveNewUser(user);
            Map<String,String> resp = new HashMap<>();
            resp.put("message","An OTP was sent to your email.");
            return new ResponseEntity<>(resp,HttpStatus.OK);
        } catch (Exception e){

            log.error("An Exception occurred in thread App/controller/PublicController/createUser with massage:{}",e.getMessage());
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String,String>> loginUser(@RequestBody User user){

        try{

            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(),user.getPassword()));
            UserDetails userDetails = userDetailsService.loadUserByUsername(user.getEmail());
            String jwts = jwtUtil.generateToken(user.getEmail());
            Map<String,String> response  = new HashMap<>();
            User userFromDb = userServices.getUserByEmail(user.getEmail());
            response.put("token",jwts);
            String exist = userFromDb.getShop()!=null?"Exist":"Not Exist";
            response.put("Shop",exist);
            return  new ResponseEntity<>(response,HttpStatus.OK);
        
        } catch (Exception e) {

            log.error("An Exception occurred in thread App/controller/PublicController/loginUser with massage:{}",e.getMessage());
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }
}

package com.uncalled.majorProject.controller;

import com.uncalled.majorProject.dtos.ShopDTO;
import com.uncalled.majorProject.entities.Shop;
import com.uncalled.majorProject.entities.User;
import com.uncalled.majorProject.services.DropBoxServices;
import com.uncalled.majorProject.services.ShopServices;
import com.uncalled.majorProject.services.UserServices;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/User")
public class UserController {

    @Autowired
    private ShopServices shopServices;

    @Autowired
    private UserServices userServices;

    @Autowired
    private DropBoxServices DBox;

    @PostMapping("/Shop")
    public ResponseEntity<String> createShop(
            @RequestParam(value = "lng") double longitude ,
            @RequestParam(value = "lat") double latitude,
            @ModelAttribute ShopDTO shop ){

        GeoJsonPoint point = new GeoJsonPoint(longitude,latitude);
        try{

            shop.getShop().setCord(point);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userServices.getUserByEmail(username);
            log.info("{},{}",shop.getShop().getCord().getX(),shop.getShop().getCord().getY());
            String ImageLink = DBox.uploadFile(shop.getProfile());
            shop.getShop().setProfile(ImageLink);
            if(shop.getShop().getProfile()==null){

                return new ResponseEntity<>("Error",HttpStatus.BAD_REQUEST);
            }

            if(shopServices.saveNewShop(shop.getShop() , user)){

                userServices.saveUser(user);
                return new ResponseEntity<>("Success", HttpStatus.CREATED);
            } else {

                return new ResponseEntity<>("message:Check Your Credential Again", HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {

            log.error("An Exception occurred in thread app/controller/UserController.createShop with message:{}",e.getMessage());
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-shop")
    public ResponseEntity<Object> getShop (
            @RequestParam(value = "lng" ) double longitude,
            @RequestParam(value = "lat" ) double latitude ,
            @RequestParam(value = "d" , required = false) Double distance){

        try{

            GeoJsonPoint point = new GeoJsonPoint(longitude,latitude);
            List<Shop> shops = shopServices.retrieveShopWithDistance(point ,distance!=null?distance:20000);
            if(shops==null){

                return new ResponseEntity<>("Shop Not Found" , HttpStatus.NOT_FOUND);
            }
            return new ResponseEntity<>(shops , HttpStatus.OK);
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/controller/UserController.getShop with message:{}",e.getMessage());
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

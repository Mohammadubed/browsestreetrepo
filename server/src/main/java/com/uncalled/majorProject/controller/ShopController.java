package com.uncalled.majorProject.controller;

import com.uncalled.majorProject.entities.Deal;
import com.uncalled.majorProject.entities.Item;
import com.uncalled.majorProject.entities.Shop;
import com.uncalled.majorProject.entities.User;
import com.uncalled.majorProject.services.ItemServices;
import com.uncalled.majorProject.services.ShopServices;
import com.uncalled.majorProject.services.UserServices;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/Shop")
public class ShopController {

    @Autowired
    private ShopServices services;

    @Autowired
    private UserServices userServices;

    @Autowired
    private ItemServices itemServices;

    @GetMapping
    public ResponseEntity<?> getShop(){

        try{

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            User user = userServices.getUserByEmail(username);
            Shop shop = services.retrieveShop(user.getShop().getId());
            if(shop!=null){

                return new ResponseEntity<>(shop,HttpStatus.OK);
            } else {

                return new ResponseEntity<>("Looks like you have no shop",HttpStatus.BAD_REQUEST);
            }

        } catch (Exception e) {

            log.error("An Exception occurred in thread app/controller/ShopController.getShop with message:{}",e.getMessage());
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-deals")
    public ResponseEntity<Object> getDeal(){

        try{

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String userName = auth.getName();
            User user = userServices.getUserByEmail(userName);
            return new ResponseEntity<>(itemServices.getDeals(user.getShop().getId()),HttpStatus.OK);
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/controller/ShopController.getDeal with message:{}",e.getMessage());
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/get-items")
    public ResponseEntity<Object> getItems(){

        try{

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            String userName = auth.getName();
            User user = userServices.getUserByEmail(userName);
            List<Item> items = user.getShop().getItems();

            return new ResponseEntity<>(user.getShop().getItems(),HttpStatus.OK);
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/controller/ShopController.getItems with message:{}",e.getMessage());
            return new ResponseEntity<>("Something went wrong", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/new-deal")
    public ResponseEntity<Object> createDeal(
            @RequestParam(value = "i" ) ObjectId id,
            @RequestBody Deal deal )
    {

        Map<Object,Object> map = new HashMap<>();
        try {

            Item item = itemServices.retrieveItem(id);
            itemServices.createDeal(deal, item);
            map.put("Status","Success");
            map.put("Message" , "Deal Successfully Created");
            return new ResponseEntity<>(map , HttpStatus.CREATED);
        } catch (Exception e){

            log.error("An Exception Occurred in thread app/controller/ItemController.createDeal with message:{}" , e.getMessage());
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

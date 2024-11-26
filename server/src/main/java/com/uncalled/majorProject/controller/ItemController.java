package com.uncalled.majorProject.controller;

import com.uncalled.majorProject.dtos.ItemDTO;
import com.uncalled.majorProject.entities.Deal;
import com.uncalled.majorProject.entities.Item;
import com.uncalled.majorProject.entities.Shop;
import com.uncalled.majorProject.entities.User;
import com.uncalled.majorProject.services.DropBoxServices;
import com.uncalled.majorProject.services.ItemServices;
import com.uncalled.majorProject.services.ShopServices;
import com.uncalled.majorProject.services.UserServices;
import lombok.extern.slf4j.Slf4j;
import org.apache.tomcat.util.http.parser.HttpParser;
import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("Item")
public class ItemController {

    @Autowired
    private ItemServices itemServices;

    @Autowired
    private ShopServices shopServices;

    @Autowired
    private UserServices userServices;

    @Autowired
    private DropBoxServices DBServices;

    Map<String,Object> map = new HashMap<>();
    @PostMapping
    public ResponseEntity<Map<String, Object>> addItem (@ModelAttribute ItemDTO itemDTO ) {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userServices.getUserByEmail(username);
        Item item = itemDTO.getItem();

        try{

            item.setPhoto(DBServices.uploadFile(itemDTO.getPhoto()));
            if(itemServices.createItem(item ,user.getShop().getId())) {

                map.put("Status", "Created");
                map.put("Message", "Your Item is being created successfully");
                return new ResponseEntity<>(map, HttpStatus.CREATED);
            } else {

                map.put("Status","Error");
                map.put("Message","An Error occurred");
                return new ResponseEntity<>(map , HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {

            log.error("An Exception occurred in thread App/controller/ItemController.addItem with message:{}" , e.getMessage()) ;
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<Object> getItem(
            @RequestParam(value = "i" ) ObjectId id
    ){

        try{


            map.clear();
            map.put("Status","Success");
            map.put("Message","Data SuccessFully Send");
            map.put("Data" , itemServices.retrieveItem(id));
            return new ResponseEntity<>(map,HttpStatus.OK);
        } catch (Exception e) {

            log.error("An Exception occurred in thread App/controller/ItemController.getItem with message:{}" , e.getMessage()) ;
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/search")
    public ResponseEntity<Object> retrieveItem (
            @RequestParam(value = "d") Double distance,
            @RequestParam(value = "s", required = false) String search,
            @RequestParam(value = "lng")Double lng,
            @RequestParam(value = "lat")Double lat,
            @RequestParam(value = "dl", required = false) Boolean deal,
            @RequestParam(value = "srt", required = false) Boolean sort
            ){

        GeoJsonPoint cord = new GeoJsonPoint(lng,lat);
        try {

            map.clear();
            map.put("Status","Success");
            map.put("Message","Data SuccessFully retrieved");
            List<Item> items = itemServices.retrieveItemWithDistance(cord,distance,search, deal != null && deal,sort != null && sort);
            if(items==null) {

                map.clear();
                map.put("Status" , "Not Found ");
                map.put("Message" , "Data isn't Exist ");
                return new ResponseEntity<>(map,HttpStatus.BAD_REQUEST);
            }

            map.put("Data" , items);
            return new ResponseEntity<>(map,HttpStatus.OK);
        } catch (Exception e) {

            log.error("An Exception occurred in thread App/controller/ItemController.retrieveItem with message:{}" , e.getMessage()) ;
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }
}

package com.uncalled.majorProject.services;

import com.mongodb.lang.Nullable;
import com.uncalled.majorProject.entities.Deal;
import com.uncalled.majorProject.entities.Item;
import com.uncalled.majorProject.entities.Shop;
import com.uncalled.majorProject.repository.ItemRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.*;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.regex.Pattern;

@Slf4j
@Service
public class ItemServices {

    @Autowired
    private ItemRepository itemRepository;

    @Autowired
    private  ShopServices shopServices;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private DealServices dealServices;

    @Transactional
    public boolean createItem(Item item,ObjectId id){

        try {

            Shop shop = shopServices.retrieveShop(id);
            item.setShop(shop);
            Item itemSaved = itemRepository.save(item);
            shop.setItem(itemSaved);
            shopServices.saveShop(shop);
            return true;
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/services/ItemServices.createItem with message:{}",e.getMessage());
            return false;
        }
    }


    public Item retrieveItem(ObjectId id ){

        try{

            return itemRepository.findById(id).orElse(null);
        } catch (Exception e){

            log.error("An Exception occurred in thread app/services/ItemServices.retrieveItem with message:{}",e.getMessage());
            return null;
        }
    }

    public List<Item> retrieveItemWithDistance(GeoJsonPoint location , double distance , @Nullable String name ,boolean deal , boolean sort){

        try {

            List<ObjectId> shops = shopServices.retrieveShopWithDistance(location,distance)
                                        .stream()
                                        .map(Shop::getId)
                                        .toList();
            Query query = new Query();
            query.addCriteria(Criteria.where("shop").in(shops));
            if(name!=null) query.addCriteria(Criteria.where("name").regex(Pattern.compile(Pattern.quote(name), Pattern.CASE_INSENSITIVE)));
            return mongoTemplate.find(query,Item.class);
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/services/ItemServices.retrieveItemWithDistance with message:{}",e.getMessage());
            return null;
        }
    }

    @Transactional
    public void createDeal (Deal deal , Item item) {

        Deal storedDeal = dealServices.createDeal(deal);
        item.setDeal(storedDeal);
        itemRepository.save(item);
    }

    public List<Item> getDeals (ObjectId id){

        Query query = new Query();
        query.addCriteria(Criteria.where("deal").exists(true));
        query.addCriteria(Criteria.where("shop").is(id));
        return mongoTemplate.find(query,Item.class);
    }
}

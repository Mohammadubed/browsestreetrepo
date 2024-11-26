package com.uncalled.majorProject.services;

import com.uncalled.majorProject.config.SpringSecurity;
import com.uncalled.majorProject.entities.Shop;
import com.uncalled.majorProject.entities.User;
import com.uncalled.majorProject.repository.ShopRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeospatialIndex;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ShopServices {

    @Autowired
    private ShopRepository shopRepository;

    @Autowired
    private MongoTemplate mongoTemplate;
    public boolean saveNewShop(Shop shop , User user){

        try{

            user.getRoles().add("Owner");
            user.setShop(shop);
            shopRepository.save(shop);
            return true;
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/services/ShopServices.saveNewShop with massage:{}", e.getMessage());
            return false;
        }
    }

    public boolean saveShop(Shop shop){

        try{

            shopRepository.save(shop);
            return true;
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/services/ShopServices.saveShop with massage:{}", e.getMessage());
            return false;
        }
    }

    public Shop retrieveShop(ObjectId id){

        try{

            return shopRepository.findById(id).orElse(null);
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/services/ShopServices.getShop with massage:{}", e.getMessage());
            return null;
        }
    }

    public Shop findByMobileNumber (String  mobile ){

        try{

            return shopRepository.findByMobile(mobile).orElse(null);
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/services/ShopServices.findByMobileNumber with massage:{}", e.getMessage());
            return null;
        }
    }

    public List<Shop> retrieveShopWithDistance(GeoJsonPoint location , double distance){

        try {

            Query query = new Query();
            query.addCriteria(Criteria.where("cord").nearSphere(location).maxDistance(distance));
            return mongoTemplate.find(query,Shop.class);
        } catch (Exception e) {

            log.error("An Exception occurred in thread app/services/ShopServices.retrieveShopWithDistance with massage:{}", e.getMessage());
            return null;
        }
    }

    @Bean
    public void createGeoIndex() {
        mongoTemplate.indexOps("shop") // Name of your collection
                .ensureIndex(
                        new GeospatialIndex("cord").typed(GeoSpatialIndexType.GEO_2DSPHERE)
                );
    }

}

package com.uncalled.majorProject.repository;

import com.uncalled.majorProject.entities.Shop;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface ShopRepository extends MongoRepository<Shop, ObjectId> {

    Optional<Shop> findByMobile(String mobile);
}

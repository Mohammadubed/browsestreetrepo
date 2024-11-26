package com.uncalled.majorProject.repository;

import com.uncalled.majorProject.entities.Item;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ItemRepository extends MongoRepository<Item, ObjectId>{
}

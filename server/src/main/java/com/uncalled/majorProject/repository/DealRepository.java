package com.uncalled.majorProject.repository;

import com.uncalled.majorProject.entities.Deal;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DealRepository extends MongoRepository<Deal , ObjectId> {
}

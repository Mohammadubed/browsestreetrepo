package com.uncalled.majorProject.repository;

import com.uncalled.majorProject.entities.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,ObjectId> {

    Optional<User> findUserByEmail(String email);
    boolean deleteByEmail(String email);
}

package com.uncalled.majorProject.services;

import com.uncalled.majorProject.entities.Deal;
import com.uncalled.majorProject.repository.DealRepository;
import jakarta.annotation.PostConstruct;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.index.Index;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.concurrent.TimeUnit;

@Service
public class DealServices {

    @Autowired
    private DealRepository dealRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    public Deal createDeal (Deal deal){

        return dealRepository.save(deal);
    }

    public Deal GetDeal (ObjectId id ) {

        return dealRepository.findById(id).orElse(null);
    }

    @Scheduled(cron = "0 0 0 * * ?")
    public void RemoveDeal(){

        LocalDate today = LocalDate.now();
        Query query = new Query();
        query.addCriteria(Criteria.where("expireDate").lt(today));
        mongoTemplate.remove(query,Deal.class);
    }
}

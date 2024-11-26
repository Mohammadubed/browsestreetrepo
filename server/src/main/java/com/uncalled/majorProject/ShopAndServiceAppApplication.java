package com.uncalled.majorProject;

import com.mongodb.client.MongoClient;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@EnableTransactionManagement
@SpringBootApplication
@EnableScheduling
public class ShopAndServiceAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ShopAndServiceAppApplication.class, args);
	}

	@Bean
	public PlatformTransactionManager Tmanager(MongoDatabaseFactory dbFactory){

		return new MongoTransactionManager(dbFactory);
	}


	@Bean
	public MongoTemplate mongoTemplate(MongoDatabaseFactory factory) {
		// This will automatically use the MongoClient and database configured in application.yml
		return new MongoTemplate(factory); // Not needed if using application.yml
	}
}

package com.uncalled.majorProject.entities;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Document
@Setter
@Getter
public class Deal {

    @Id
    private ObjectId id ;
    @NotNull
    private LocalDate expireDate;

    @CreatedDate
    @NotNull
    private LocalDate beginDate;
    private String newPrice;

}

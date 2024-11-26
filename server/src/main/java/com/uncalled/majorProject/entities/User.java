package com.uncalled.majorProject.entities;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@Document
public class User {

    @Id
    private ObjectId id;

    @Indexed(unique = true)
    private String email;

    private String name;

    @NotNull
    private String password;

    private LocalDate dob;

    private List<String> Roles = new ArrayList<>();

    @DBRef
    private Shop shop;
}

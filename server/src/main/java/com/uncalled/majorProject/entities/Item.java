package com.uncalled.majorProject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.lang.Nullable;
import lombok.Getter;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Item")
@Setter
@Getter
public class Item {

    @Id
    private ObjectId id;

    private String photo;
    private String name;
    private String price;
    private String description;
    private int upVotes;
    private int downVotes;
    private String type;
    @DBRef(lazy = true)
    private Shop shop;

    @DBRef(lazy = true)
    private Deal deal;
}

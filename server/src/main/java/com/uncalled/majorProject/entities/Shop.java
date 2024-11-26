package com.uncalled.majorProject.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.mongodb.client.model.geojson.Point;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.geo.GeoJsonPoint;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexType;
import org.springframework.data.mongodb.core.index.GeoSpatialIndexed;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "shop")
@Setter
@Getter
public class Shop {

    @Id
    private ObjectId id;
    @NotNull
    private String name;
    private String profile;

    @NotNull
    @GeoSpatialIndexed(type = GeoSpatialIndexType.GEO_2DSPHERE)
    private GeoJsonPoint cord;
    @NotNull
    private String address;
    @NotNull
    @Indexed(unique = true)
    private String mobile;
    @NotNull
    private String category;
    @NotNull
    private LocalTime closingTime;
    @NotNull
    private LocalTime openingTime;

    private float rating;
    private int  itemSold;
    private int  reputation;

    @DBRef(lazy = true)
    @JsonIgnore
    private List<Item> items = new ArrayList<>();

    public void setItem(Item item){

        items.add(item);
    }

    Shop () {

        rating = 0;
        itemSold = 0;
        reputation = 0;
    }
}

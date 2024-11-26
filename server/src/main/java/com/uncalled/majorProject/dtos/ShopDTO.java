package com.uncalled.majorProject.dtos;

import com.uncalled.majorProject.entities.Shop;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
public class ShopDTO {

    private Shop shop;
    private MultipartFile profile;
}

package com.uncalled.majorProject.dtos;

import com.uncalled.majorProject.entities.Item;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Setter
@Getter
public class ItemDTO {

    private MultipartFile photo;
    private Item item;
}

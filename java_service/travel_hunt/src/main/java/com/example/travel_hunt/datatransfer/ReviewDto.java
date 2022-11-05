package com.example.travel_hunt.datatransfer;

import com.example.travel_hunt.model.User;
import lombok.*;

import javax.persistence.Column;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class ReviewDto {
    private Integer id;
    private String reviewText;
    private Integer stars;
    private UserDto user;
    private Integer buildingId;
}

package com.example.travel_hunt.datatransfer.mapper;

import com.example.travel_hunt.datatransfer.ReviewDto;
import com.example.travel_hunt.model.Review;

public class ReviewMapper {
    public static ReviewDto reviewToDto(Review review) {
        return ReviewDto.builder()
                .id(review.getId())
                .reviewText(review.getReviewText())
                .stars(review.getStars())
                .user(UserMapper.userToDto(review.getUser()))
                .buildingId(review.getBuildingId())
                .build();
    }
}

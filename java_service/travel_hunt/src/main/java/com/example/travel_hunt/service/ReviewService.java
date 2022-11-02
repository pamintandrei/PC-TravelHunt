package com.example.travel_hunt.service;

import com.example.travel_hunt.model.Review;

import java.util.List;

public interface ReviewService {
    Review findReviewById(Integer id);

    Review saveReview(Review review);

    List<Review> findAllReviews();
}

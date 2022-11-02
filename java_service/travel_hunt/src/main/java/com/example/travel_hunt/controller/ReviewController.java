package com.example.travel_hunt.controller;


import com.example.travel_hunt.model.Review;
import com.example.travel_hunt.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/{id}")
    public ResponseEntity<Review> findReviewById(@PathVariable Integer id) {
        return new ResponseEntity<>(reviewService.findReviewById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Review> saveReview(@RequestBody Review review) {
        return new ResponseEntity<>(reviewService.saveReview(review), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Review> findAllReviews() {
        return reviewService.findAllReviews();
    }

}

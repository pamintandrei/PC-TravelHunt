package com.example.travel_hunt.controller;


import com.example.travel_hunt.datatransfer.ReviewDto;
import com.example.travel_hunt.datatransfer.mapper.ReviewMapper;
import com.example.travel_hunt.model.Review;
import com.example.travel_hunt.service.LoginService;
import com.example.travel_hunt.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;
    private final LoginService loginService;

    @GetMapping("/{id}")
    public ResponseEntity<ReviewDto> findReviewById(@PathVariable Integer id) {
        return new ResponseEntity<>(ReviewMapper.reviewToDto(reviewService.findReviewById(id)), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<ReviewDto> saveReview(@RequestBody Review review) {
        review.setUser(loginService.getLoggedUser());
        return new ResponseEntity<>(ReviewMapper.reviewToDto(reviewService.saveReview(review)), HttpStatus.CREATED);
    }

    @GetMapping
    public List<ReviewDto> findAllReviews() {
        return reviewService.findAllReviews()
                .stream()
                .map(ReviewMapper::reviewToDto)
                .collect(Collectors.toList());
    }

}

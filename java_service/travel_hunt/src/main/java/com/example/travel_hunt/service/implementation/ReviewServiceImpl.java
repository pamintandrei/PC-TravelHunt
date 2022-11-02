package com.example.travel_hunt.service.implementation;

import com.example.travel_hunt.model.Review;
import com.example.travel_hunt.model.Review;
import com.example.travel_hunt.repository.ReviewRepository;
import com.example.travel_hunt.service.ReviewService;
import com.example.travel_hunt.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {
    private final ReviewRepository reviewRepository;

    @Override
    public Review findReviewById(Integer id) {
        Optional<Review> optionalReview = reviewRepository.findById(id);
        if (optionalReview.isPresent()) {
            return optionalReview.get();
        }
        throw new NotFoundException("Review " + NotFoundException.NOT_FOUND);
    }

    @Override
    public Review saveReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> findAllReviews() {
        return reviewRepository.findAll();
    }
}

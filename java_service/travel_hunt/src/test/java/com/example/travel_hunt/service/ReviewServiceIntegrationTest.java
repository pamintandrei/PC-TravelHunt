package com.example.travel_hunt.service;

import com.example.travel_hunt.TravelHuntApplication;
import com.example.travel_hunt.model.Review;
import com.example.travel_hunt.model.Review;
import com.example.travel_hunt.repository.ReviewRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.stream.Collectors;

import static com.example.travel_hunt.utils.TestUtils.MOCK_USER;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = TravelHuntApplication.class)
class ReviewServiceIntegrationTest {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private ReviewRepository reviewRepository;
    private Review review;

    @BeforeEach
    void setUp() {
        review = new Review(null, "great", 5, MOCK_USER, 1);
    }

    @AfterEach
    void tearDown() {
        reviewRepository.delete(review);
    }

    @Test
    public void createReviewTest() {
        Review savedReview = reviewService.saveReview(review);
        testFieldsForReview(savedReview);
    }

    @Test
    public void testFindBydId() {
        Review savedReview = reviewService.saveReview(review);
        Review retrievedReview = reviewService.findReviewById(savedReview.getId());
        testFieldsForReview(retrievedReview);
    }

    @Test
    public void testFindAllReviews() {
        Review savedReview = reviewService.saveReview(review);
        assertThat(reviewService.findAllReviews()).isNotEmpty();
        testFieldsForReview(reviewService.findAllReviews()
                .stream()
                .filter(event1 -> event1.getId().equals(savedReview.getId()))
                .collect(Collectors.toList())
                .get(0));
    }

    private void testFieldsForReview(Review savedReview) {
        assertThat(savedReview.getId()).isNotNull();
        assertThat(savedReview.getBuildingId()).isEqualTo(1);
        assertThat(savedReview.getStars()).isEqualTo(5);
    }
}

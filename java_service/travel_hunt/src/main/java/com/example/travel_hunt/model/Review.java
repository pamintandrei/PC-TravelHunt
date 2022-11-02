package com.example.travel_hunt.model;

import lombok.*;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "review_text", nullable = false)
    private String reviewText;
    @Column(name = "stars", nullable = false)
    private Integer stars;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @Column(name = "building_id", nullable = false)
    private Integer buildingId;

}

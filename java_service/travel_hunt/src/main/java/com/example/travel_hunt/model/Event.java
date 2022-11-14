package com.example.travel_hunt.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description", nullable = false)
    private String description;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "start_date")
    private LocalDateTime startDate;
    @JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
    @Column(name = "end_date")
    private LocalDateTime endDate;
    @Column(name = "building_id", nullable = false)
    private Integer buildingId;
}
package com.example.travel_hunt.service;

import com.example.travel_hunt.TravelHuntApplication;
import com.example.travel_hunt.model.Event;
import com.example.travel_hunt.repository.EventRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(SpringExtension.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK, classes = TravelHuntApplication.class)
public class EventServiceIntegrationTest {
    private static final String NAME = "Christmas Party";
    private static final String DESCRIPTION = "Coolest in town";

    @Autowired
    private EventRepository eventRepository;
    private Event event;

    @BeforeEach
    void setUp() {
        event = new Event(null, NAME, DESCRIPTION, LocalDateTime.now(), LocalDateTime.now().plusDays(1), 1);
    }

    @AfterEach
    void tearDown() {
        eventRepository.delete(event);
    }

    @Test
    public void createEventTest() {
        Event savedEvent = eventRepository.save(event);
        testFieldsForEvent(savedEvent);
    }

    @Test
    public void testFindBydId() {
        Event savedEvent = eventRepository.save(event);
        Event retrievedEvent = eventRepository.findById(savedEvent.getId()).get();
        testFieldsForEvent(retrievedEvent);
    }

    @Test
    public void testFindAllEvents() {
        Event savedEvent = eventRepository.save(event);
        assertThat(eventRepository.findAll()).isNotEmpty();
        testFieldsForEvent(eventRepository.findAll()
                .stream()
                .filter(event1 -> event1.getId().equals(savedEvent.getId()))
                .collect(Collectors.toList())
                .get(0));
    }

    private void testFieldsForEvent(Event savedEvent) {
        assertThat(savedEvent.getId()).isNotNull();
        assertThat(savedEvent.getDescription()).isEqualTo(DESCRIPTION);
        assertThat(savedEvent.getName()).isEqualTo(NAME);
        assertThat(savedEvent.getStartDate()).isNotNull();
        assertThat(savedEvent.getEndDate()).isAfter(LocalDateTime.now());
        assertThat(savedEvent.getBuildingId()).isEqualTo(1);
    }
}

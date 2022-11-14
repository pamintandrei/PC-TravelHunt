package com.example.travel_hunt.controller;

import com.example.travel_hunt.model.Event;
import com.example.travel_hunt.service.EventService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/events")
@RequiredArgsConstructor
public class EventController {
    private final EventService eventService;

    @GetMapping("/{id}")
    public ResponseEntity<Event> findEventById(@PathVariable Integer id) {
        return new ResponseEntity<>(eventService.findEventById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Event> saveEvent(@RequestBody Event event) {
        return new ResponseEntity<>(eventService.saveEvent(event), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Event> findAllEvents() {
        return eventService.findAllEvents();
    }
}

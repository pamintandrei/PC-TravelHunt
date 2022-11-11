package com.example.travel_hunt.service;

import com.example.travel_hunt.model.Event;

import java.util.List;

public interface EventService {
    Event findEventById(Integer id);

    Event saveEvent(Event event);

    List<Event> findAllEvents();


}

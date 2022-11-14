package com.example.travel_hunt.service.implementation;

import com.example.travel_hunt.model.Event;
import com.example.travel_hunt.repository.EventRepository;
import com.example.travel_hunt.service.EventService;
import com.example.travel_hunt.service.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EventServiceImpl implements EventService {
    private final EventRepository eventRepository;
    @Override
    public Event findEventById(Integer id) {
        Optional<Event> optionalEvent = eventRepository.findById(id);
        if (optionalEvent.isPresent()) {
            return optionalEvent.get();
        }
        throw new NotFoundException("Event " + NotFoundException.NOT_FOUND);
    }

    @Override
    public Event saveEvent(Event event) {
        return eventRepository.save(event);
    }

    @Override
    public List<Event> findAllEvents() {
        return eventRepository.findAll();
    }
}

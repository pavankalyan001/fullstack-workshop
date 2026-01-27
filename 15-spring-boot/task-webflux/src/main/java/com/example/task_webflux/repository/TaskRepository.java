package com.example.task_webflux.repository;

import com.example.task_webflux.model.Task;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;

@Repository
public interface TaskRepository
        extends ReactiveCrudRepository<Task, Long> {

    Flux<Task> findByStatus(String status);
}

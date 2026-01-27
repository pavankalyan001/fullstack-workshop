package com.example.task_webflux.controller;

import com.example.task_webflux.model.Task;
import com.example.task_webflux.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    // ✅ Create task
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Task> create(@RequestBody Task task) {
        return service.create(task);
    }

    // ✅ Get all tasks
    @GetMapping
    public Flux<Task> getAll() {
        return service.getAll();
    }

    // ✅ Get task by id
    @GetMapping("/{id}")
    public Mono<Task> getById(@PathVariable Long id) {
        return service.getById(id);
    }

    // ✅ Get tasks by status
    @GetMapping("/status/{status}")
    public Flux<Task> getByStatus(@PathVariable String status) {
        return service.getByStatus(status);
    }

    // ✅ Update task
    @PutMapping("/{id}")
    public Mono<Task> update(@PathVariable Long id,
                             @RequestBody Task task) {
        return service.update(id, task);
    }

    // ✅ Delete task
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public Mono<Void> delete(@PathVariable Long id) {
        return service.delete(id);
    }
}
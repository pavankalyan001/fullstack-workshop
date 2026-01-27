package com.example.task_webflux.service;

import com.example.task_webflux.model.Task;
import com.example.task_webflux.repository.TaskRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    // ✅ Create task with basic validation
    public Mono<Task> create(Task task) {
        if (task.getTitle() == null || task.getTitle().isBlank()) {
            return Mono.error(new IllegalArgumentException("Title cannot be empty"));
        }
        if (task.getStatus() == null) {
            task.setStatus("PENDING");
        }
        return repository.save(task);
    }

    // ✅ Get all tasks
    public Flux<Task> getAll() {
        return repository.findAll();
    }

    // ✅ Get task by id
    public Mono<Task> getById(Long id) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Task not found")));
    }

    // ✅ Get tasks by status
    public Flux<Task> getByStatus(String status) {
        return repository.findByStatus(status);
    }

    // ✅ Update task (important reactive pattern)
    public Mono<Task> update(Long id, Task updatedTask) {
        return repository.findById(id)
                .switchIfEmpty(Mono.error(new RuntimeException("Task not found")))
                .flatMap(existingTask -> {
                    existingTask.setTitle(updatedTask.getTitle());
                    existingTask.setDescription(updatedTask.getDescription());
                    existingTask.setStatus(updatedTask.getStatus());
                    return repository.save(existingTask);
                });
    }

    // ✅ Delete task
    public Mono<Void> delete(Long id) {
        return repository.deleteById(id);
    }
}
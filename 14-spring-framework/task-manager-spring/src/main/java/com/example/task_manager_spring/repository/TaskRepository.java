package com.example.task_manager_spring.repository;

import com.example.task_manager_spring.model.Task;
import com.example.task_manager_spring.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByStatus(TaskStatus status);
}

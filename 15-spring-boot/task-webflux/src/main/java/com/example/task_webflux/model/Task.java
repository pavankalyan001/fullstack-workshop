package com.example.task_webflux.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table("tasks")
public class Task {

    @Id
    private Long id;

    private String title;
    private String description;
    private String status;

    // ✅ No-args constructor (required by Spring)
    public Task() {
    }

    // ✅ Constructor without id (for create operations)
    public Task(String title, String description, String status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }

    // ✅ Full constructor (optional)
    public Task(Long id, String title, String description, String status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.status = status;
    }

    // getters & setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    // ✅ Helpful for debugging
    @Override
    public String toString() {
        return "Task{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
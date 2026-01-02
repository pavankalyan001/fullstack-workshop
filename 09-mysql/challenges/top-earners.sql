SELECT
    department,
    name,
    salary,
    DENSE_RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) AS rank_in_dept
FROM employees
WHERE DENSE_RANK() OVER (
        PARTITION BY department
        ORDER BY salary DESC
    ) <= 3;

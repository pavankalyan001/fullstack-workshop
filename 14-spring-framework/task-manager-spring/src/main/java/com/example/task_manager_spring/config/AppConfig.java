package com.example.task_manager_spring.config;

import jakarta.persistence.EntityManagerFactory;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.*;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Properties;

@Configuration
@ComponentScan("com.example.task_manager_spring")
@PropertySource("classpath:db.properties")
@EnableJpaRepositories(basePackages = "com.example.task_manager_spring.repository")
@EnableTransactionManagement
public class AppConfig {

    // 1️⃣ DataSource (connects to MySQL)
    @Bean
    public DataSource dataSource(Environment env) {
        DriverManagerDataSource ds = new DriverManagerDataSource();
        ds.setDriverClassName("com.mysql.cj.jdbc.Driver");

        String url = "jdbc:mysql://" +
                env.getProperty("db.host") + ":" +
                env.getProperty("db.port") + "/" +
                env.getProperty("db.name") +
                "?useSSL=false&serverTimezone=UTC";

        ds.setUrl(url);
        ds.setUsername(env.getProperty("db.username"));
        ds.setPassword(env.getProperty("db.password"));

        return ds;
    }

    // 2️⃣ EntityManagerFactory (JPA + Hibernate)
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {

        LocalContainerEntityManagerFactoryBean emf =
                new LocalContainerEntityManagerFactoryBean();

        emf.setDataSource(dataSource);
        emf.setPackagesToScan("com.example.task_manager_spring.model");

        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        adapter.setShowSql(true);
        adapter.setGenerateDdl(true);

        emf.setJpaVendorAdapter(adapter);

        Properties props = new Properties();
        props.put("hibernate.hbm2ddl.auto", "update");
        props.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");

        emf.setJpaProperties(props);

        return emf;
    }

    // 3️⃣ Transaction Manager
    @Bean
    public PlatformTransactionManager transactionManager(EntityManagerFactory emf) {
        return new JpaTransactionManager(emf);
    }
}

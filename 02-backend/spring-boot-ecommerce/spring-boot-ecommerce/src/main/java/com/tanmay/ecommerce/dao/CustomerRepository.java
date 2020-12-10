package com.tanmay.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tanmay.ecommerce.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long>{

}

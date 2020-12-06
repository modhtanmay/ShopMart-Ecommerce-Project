package com.tanmay.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tanmay.ecommerce.entity.User;

@Repository
public interface RegistrationRepository extends JpaRepository<User, Integer>{

	User findByEmailid(String email);

	User findByEmailidAndPassword(String email,String password);

}

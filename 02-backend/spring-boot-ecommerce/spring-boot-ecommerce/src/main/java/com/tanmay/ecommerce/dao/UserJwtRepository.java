package com.tanmay.ecommerce.dao;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tanmay.ecommerce.entity.UserJwt;


@Repository
public interface UserJwtRepository extends JpaRepository<UserJwt, Long> {
	Optional<UserJwt> findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);
}
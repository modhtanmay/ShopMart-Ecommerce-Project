package com.tanmay.ecommerce.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tanmay.ecommerce.dao.RegistrationRepository;
import com.tanmay.ecommerce.entity.User;

@Service
public class RegistrationService {

	@Autowired
	private RegistrationRepository regisRepository;
	
	
	public User saveUser(User user) {
		return regisRepository.save(user);
	}
	
	public User fetchUserByEmailId(String email) {
		return regisRepository.findByEmailid(email);
	}
	
	public User fetchUserByEmailIdAndPassword(String email,String password) {
		return regisRepository.findByEmailidAndPassword(email,password);
	}
	
}

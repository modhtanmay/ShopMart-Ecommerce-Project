package com.tanmay.ecommerce.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tanmay.ecommerce.entity.User;
import com.tanmay.ecommerce.service.RegistrationService;

@CrossOrigin("http://localhost:4200")
@RestController
@RequestMapping("/signin")
public class RegistrationController {

	@Autowired
	RegistrationService regService;
	
	@PostMapping("/register")
	public User registerUser(@RequestBody User user) throws Exception {
		String tempemail = user.getEmailid();
		if(!tempemail.isBlank() && !tempemail.isEmpty()) {
			User userObj = regService.fetchUserByEmailId(tempemail);
			if(userObj != null)
				throw new Exception("User with "+tempemail+" already exist"); 
		}
		return regService.saveUser(user);
	}
	
	@PostMapping("/login")
	public User loginUser(@RequestBody User user) throws Exception {
		String tempemail = user.getEmailid();
		String temppass = user.getPassword();
		User userObj = null;
		if(!tempemail.isEmpty() && !temppass.isEmpty()) {
			userObj = regService.fetchUserByEmailIdAndPassword(tempemail, temppass);
		}
		if(userObj == null)
			throw new Exception("Bad credentials");
		return userObj;
	}
	
}

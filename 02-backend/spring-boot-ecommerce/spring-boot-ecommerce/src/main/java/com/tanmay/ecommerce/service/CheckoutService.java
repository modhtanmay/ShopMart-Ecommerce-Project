package com.tanmay.ecommerce.service;

import org.springframework.stereotype.Service;

import com.tanmay.ecommerce.dto.Purchase;
import com.tanmay.ecommerce.dto.PurchaseResponse;

@Service
public interface CheckoutService {

	PurchaseResponse placeOrder (Purchase purchase);
}

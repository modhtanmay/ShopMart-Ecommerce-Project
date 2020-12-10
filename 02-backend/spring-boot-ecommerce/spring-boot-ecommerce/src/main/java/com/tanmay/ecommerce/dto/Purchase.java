package com.tanmay.ecommerce.dto;

import java.util.Set;

import com.tanmay.ecommerce.entity.Address;
import com.tanmay.ecommerce.entity.Customer;
import com.tanmay.ecommerce.entity.Order;
import com.tanmay.ecommerce.entity.OrderItem;

import lombok.Data;

@Data
public class Purchase {

	private Customer customer;
	
	private Address shippingAddress;
	
	private Address billingAddress;
	
	private Order order;
	
	private Set<OrderItem> orderItems;
}

package com.tanmay.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import com.tanmay.ecommerce.entity.Country;
import com.tanmay.ecommerce.entity.Product;
import com.tanmay.ecommerce.entity.ProductCategory;
import com.tanmay.ecommerce.entity.State;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

	// Autowiring JPA Entity Manager
	private EntityManager entityManager;
	
	@Autowired
	public MyDataRestConfig(EntityManager theEntityManager) {
		entityManager = theEntityManager;
	}
	
	
	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
		// TODO Auto-generated method stub
		HttpMethod[] theUnSupportedActions = { HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST };

		// disable HTTP Methods for Product: PUT,POST,DELETE
		disableHttpMethods(Product.class,config, theUnSupportedActions);

		// disable HTTP Methods for ProductCategory: PUT,POST,DELETE
		disableHttpMethods(ProductCategory.class,config, theUnSupportedActions);
		
		// disable HTTP Methods for Country: PUT,POST,DELETE
		disableHttpMethods(Country.class,config, theUnSupportedActions);
		
		// disable HTTP Methods for State: PUT,POST,DELETE
		disableHttpMethods(State.class,config, theUnSupportedActions);
				
		// Call an internal helper method
		exposeIds(config);
	}


	private void disableHttpMethods(Class theClass,RepositoryRestConfiguration config, HttpMethod[] theUnSupportedActions) {
		config.getExposureConfiguration().forDomainType(theClass)
				.withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions))
				.withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnSupportedActions));
	}

	private void exposeIds(RepositoryRestConfiguration config) {
		// TODO Auto-generated method stub
		
		// expose entity ids
		//
		
		// -- gets a list of all entity classes from the entity manager
		Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
		
		// -- Creating an array of entity type
		List<Class> entityClasses = new ArrayList<Class>();
		
		// -- get the Entity types for the entities
		for(EntityType tempEntityType : entities) {
			entityClasses.add(tempEntityType.getJavaType());
		}
		
		// -- Expose the entity ids for the array of entity/domain Types
		Class[] domainTypes = entityClasses.toArray(new Class[0]);
		config.exposeIdsFor(domainTypes);
		
		
		
	}

}

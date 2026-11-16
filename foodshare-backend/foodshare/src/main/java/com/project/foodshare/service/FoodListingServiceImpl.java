package com.project.foodshare.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.project.foodshare.entity.FoodListing;
import com.project.foodshare.exception.ResourceNotFoundException;
import com.project.foodshare.repository.FoodListingRepository;
import com.project.foodshare.service.FoodListingService;

import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class FoodListingServiceImpl implements FoodListingService {

	private final FoodListingRepository foodListingRepository;

	public FoodListingServiceImpl(FoodListingRepository foodListingRepository) {
		this.foodListingRepository = foodListingRepository;
	}

	@Override
	public FoodListing createFoodListing(FoodListing food) {

		if (food.getFoodName() == null || food.getFoodName().isBlank()) {
			throw new IllegalArgumentException("Food name is required");
		}

//  Add the quantity validation here
		if (food.getQuantity() == null || food.getQuantity() <= 0) {
			throw new IllegalArgumentException("Quantity must be greater than zero");
		}

		if (food.getLocation() == null || food.getLocation().isBlank()) {
			throw new IllegalArgumentException("Location is required");
		}

		food.setStatus("AVAILABLE");

		return foodListingRepository.save(food);
	}

	@Override
	@Transactional(readOnly = true)
	public List<FoodListing> getAllFoodListings() {
		return foodListingRepository.findAll();
	}

	@Override
	@Transactional(readOnly = true)
	public FoodListing getFoodListingById(Long id) {

		return foodListingRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Food listing not found with ID: " + id));

	}

	@Override
	public FoodListing updateFoodListing(Long id, FoodListing updatedFood) {

		FoodListing existingFood = getFoodListingById(id);

		if (updatedFood.getFoodName() == null || updatedFood.getFoodName().isBlank()) {
			throw new IllegalArgumentException("Food name is required");
		}

		if (updatedFood.getQuantity() == null || updatedFood.getQuantity() <= 0) {
			throw new IllegalArgumentException("Quantity must be greater than zero");
		}

		if (updatedFood.getLocation() == null || updatedFood.getLocation().isBlank()) {
			throw new IllegalArgumentException("Location is required");
		}

		existingFood.setFoodName(updatedFood.getFoodName());
		existingFood.setDescription(updatedFood.getDescription());
		existingFood.setQuantity(updatedFood.getQuantity());
		existingFood.setLocation(updatedFood.getLocation());
		existingFood.setExpiryDate(updatedFood.getExpiryDate());

		return foodListingRepository.save(existingFood);
	}

	@Override
	public void deleteFoodListing(Long id) {

		FoodListing food = getFoodListingById(id);

		foodListingRepository.delete(food);
	}
}

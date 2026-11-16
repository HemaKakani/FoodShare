package com.project.foodshare.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.foodshare.entity.FoodListing;
import com.project.foodshare.service.FoodListingService;

@RestController
@RequestMapping("/api/food")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodListingController {

	private final FoodListingService foodListingService;

	public FoodListingController(FoodListingService foodListingService) {
		this.foodListingService = foodListingService;
	}

	@PostMapping
	public ResponseEntity<FoodListing> createFoodListing(@RequestBody FoodListing food) {

		FoodListing savedFood = foodListingService.createFoodListing(food);

		return ResponseEntity.status(HttpStatus.CREATED).body(savedFood);
	}

	@GetMapping
	public List<FoodListing> getAllFoodListings() {
		return foodListingService.getAllFoodListings();
	}

	@GetMapping("/{id}")
	public ResponseEntity<FoodListing> getFoodListingById(@PathVariable Long id) {

		return ResponseEntity.ok(foodListingService.getFoodListingById(id));
	}

	@PutMapping("/{id}")
	public ResponseEntity<FoodListing> updateFoodListing(@PathVariable Long id, @RequestBody FoodListing food) {

		return ResponseEntity.ok(foodListingService.updateFoodListing(id, food));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteFoodListing(@PathVariable Long id) {

		foodListingService.deleteFoodListing(id);

		return ResponseEntity.noContent().build();
	}
}
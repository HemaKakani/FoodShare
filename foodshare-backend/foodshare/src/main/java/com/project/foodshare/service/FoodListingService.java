package com.project.foodshare.service;

import java.util.List;
import com.project.foodshare.entity.FoodListing;

public interface FoodListingService {

    FoodListing createFoodListing(FoodListing food);

    List<FoodListing> getAllFoodListings();

    FoodListing getFoodListingById(Long id);

    FoodListing updateFoodListing(Long id, FoodListing updatedFood);

    void deleteFoodListing(Long id);
}
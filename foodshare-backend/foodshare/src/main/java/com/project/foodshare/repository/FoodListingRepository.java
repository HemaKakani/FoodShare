package com.project.foodshare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.foodshare.entity.FoodListing;

@Repository
public interface FoodListingRepository extends JpaRepository<FoodListing, Long>{

}

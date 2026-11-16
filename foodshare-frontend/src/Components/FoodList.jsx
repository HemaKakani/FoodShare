import { useEffect, useState } from "react";

import {
  getAllFood,
  updateFood,
  deleteFood
} from "../Services/FoodService.js";

function FoodList({ refreshKey }) {

    const [foodList, setFoodList] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const loadFood = async () => {
        try {
            setLoading(true);

            const response = await getAllFood();

            setFoodList(response.data);
            setMessage("");

        } catch (error) {
            console.error("Error retrieving food:", error);

            setMessage(
                "Unable to load food listings. Check whether Spring Boot is running."
            );

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadFood();
    }, [refreshKey]);

    const handleUpdate = async (food) => {

        const input = window.prompt(
            "Enter the new quantity:",
            String(food.quantity)
        );

        if (input === null) {
            return;
        }

        const quantity = Number(input);

        if (
            input.trim() === "" ||
            !Number.isInteger(quantity) ||
            quantity <= 0
        ) {
            setMessage("Enter a valid positive whole-number quantity.");
            return;
        }

        const updatedFood = {
            foodName: food.foodName,
            description: food.description,
            quantity: quantity,
            location: food.location,
            expiryDate: food.expiryDate
        };

        try {
            await updateFood(food.id, updatedFood);

            setMessage("Food quantity updated successfully.");

            await loadFood();

        } catch (error) {
            console.error("Error updating food:", error);

            setMessage(
                "Unable to update food. Check your PUT endpoint."
            );
        }
    };

    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this food listing?"
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteFood(id);

            setMessage("Food listing deleted successfully.");

            await loadFood();

        } catch (error) {
            console.error("Error deleting food:", error);

            setMessage(
                "Unable to delete food. Check your DELETE endpoint."
            );
        }
    };

    if (loading) {
        return <p>Loading food listings...</p>;
    }

    return (
        <section className="list-section">

            <h2>Available Food Listings</h2>

            {message && <p className="message">{message}</p>}

            {foodList.length === 0 && !message && (
                <p>No food listings available.</p>
            )}

            {foodList.map((food) => (

                <div className="food-card" key={food.id}>

                    <h3>{food.foodName}</h3>

                    <p>
                        <strong>Description:</strong>{" "}
                        {food.description || "No description provided"}
                    </p>

                    <p>
                        <strong>Quantity:</strong> {food.quantity}
                    </p>

                    <p>
                        <strong>Location:</strong> {food.location}
                    </p>

                    <p>
                        <strong>Expiry Date:</strong> {food.expiryDate}
                    </p>

                    {food.status && (
                        <p>
                            <strong>Status:</strong> {food.status}
                        </p>
                    )}

                    <button onClick={() => handleUpdate(food)}>
                        Update Quantity
                    </button>

                    <button
                        className="delete-button"
                        onClick={() => handleDelete(food.id)}
                    >
                        Delete
                    </button>

                </div>

            ))}

        </section>
    );
}

export default FoodList;
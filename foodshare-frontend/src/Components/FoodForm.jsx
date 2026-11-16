import { useState } from "react";

import { insertFood } from "../Services/FoodService.js";

function FoodForm({ onFoodAdded }) {

    const [food, setFood] = useState({
        foodName: "",
        description: "",
        quantity: "",
        location: "",
        expiryDate: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFood((previousFood) => ({
            ...previousFood,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage("");

        if (!food.foodName.trim()) {
            setMessage("Please enter the food name.");
            return;
        }

        if (!food.location.trim()) {
            setMessage("Please enter the location.");
            return;
        }

        if (
            food.quantity === "" ||
            !Number.isInteger(Number(food.quantity)) ||
            Number(food.quantity) <= 0
        ) {
            setMessage("Quantity must be a positive whole number.");
            return;
        }

        if (!food.expiryDate) {
            setMessage("Please select the expiry date.");
            return;
        }

        try {
            setLoading(true);

            const foodData = {
                ...food,
                quantity: Number(food.quantity)
            };

            await insertFood(foodData);

            setMessage("Food listing added successfully!");

            setFood({
                foodName: "",
                description: "",
                quantity: "",
                location: "",
                expiryDate: ""
            });

            onFoodAdded();

        } catch (error) {
            console.error("Error inserting food:", error);

            setMessage(
                error.response?.data?.message ||
                "Unable to add food. Check the backend and API endpoint."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="form-section">

            <h2>Add Surplus Food</h2>

            <form onSubmit={handleSubmit}>

                <label htmlFor="foodName">Food Name</label>
                <input
                    id="foodName"
                    type="text"
                    name="foodName"
                    value={food.foodName}
                    onChange={handleChange}
                    placeholder="Enter food name"
                    required
                />

                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={food.description}
                    onChange={handleChange}
                    placeholder="Enter food description"
                />

                <label htmlFor="quantity">Quantity</label>
                <input
                    id="quantity"
                    type="number"
                    name="quantity"
                    value={food.quantity}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    placeholder="Enter quantity"
                    required
                />

                <label htmlFor="location">Location</label>
                <input
                    id="location"
                    type="text"
                    name="location"
                    value={food.location}
                    onChange={handleChange}
                    placeholder="Enter pickup location"
                    required
                />

                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                    id="expiryDate"
                    type="date"
                    name="expiryDate"
                    value={food.expiryDate}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Adding..." : "Add Food"}
                </button>

            </form>

            {message && <p className="message">{message}</p>}

        </section>
    );
}

export default FoodForm;
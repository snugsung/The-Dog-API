# The Dog API Project

A simple, interactive web app built with **HTML**, **CSS**, and **JavaScript** that uses [The Dog API](https://thedogapi.com/) to display random dog images and detailed breed information.

---

## Overview

This project demonstrates how to work with an **open source REST API** using JavaScript’s `fetch` and `async/await`.  
Users can:
- View random dog images with breed details.
- Browse and select specific breeds to view information like temperament, lifespan, and origin.
- Fetch a new image for any chosen breed.

The app makes requests to **two endpoints** of The Dog API:
1. `/images/search` — fetches random or breed-specific dog images  
2. `/breeds` — fetches a list of all recognized dog breeds

---

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/snugsung/dog-api-project.git
cd dog-api-project
```

### 2. Create a config.js file
Inside the config.js file, paste the following:

export const DOG_API_BASE = "https://api.thedogapi.com/v1";
export const DOG_HEADERS = {
  "x-api-key": "YOUR_API_KEY_HERE"
};

Replace "YOUR_API_KEY_HERE" with your own key from TheDogAPI. 

### 3. Add .gitignore
Make sure your API key is not pushed to GitHub by adding config.js in your .gitignore file. 

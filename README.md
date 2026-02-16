# Banana Rush

**Banana Rush** is a retro-themed quiz game developed as a 1st Semester Degree project. The game features dynamic gameplay with sound effects, secure authentication, and real-time leaderboards. User data is stored and managed securely in Firestore.

## Project Link

[Live Demo](https://banana-rush-retro.vercel.app/)

## Figma Design

[Figma Design Placeholder](#)  
*Replace this link with the actual Figma design URL.*

## Overview

Banana Rush is designed to provide an interactive quiz experience where users can compete and track their scores on a leaderboard. The project demonstrates the integration of authentication systems, database management, and external APIs within a React application.

### Key Features

- Retro-themed quiz game with dynamic questions and sound effects.
- Secure user authentication and authorization using **Asgardeo** and **Firebase**.
- Real-time leaderboard with points tracking using **Firestore**.
- Integration of **Banana Quiz API** for quiz questions and **Random Number Generator API** for randomization.
- ContextAPI for global state management.

## Technical Stack

- **Frontend:** React
- **Authentication & Authorization:** Asgardeo, Firebase
- **Database:** Firebase Firestore
- **APIs:** Banana Quiz API, Random Number Generator API
- **State Management:** ContextAPI

## Architecture

1. Users can sign up or log in via Asgardeo or Firebase authentication.
2. Quiz questions are fetched dynamically from the Banana Quiz API.
3. User answers are validated, and points are updated in Firestore.
4. Real-time leaderboard displays top scores and user rankings.
5. ContextAPI manages global states such as points, user authentication, and quiz data.

## Medium Article

A detailed walkthrough of Asgardeo integration in a React app is available on Medium:  
[Medium Article](https://medium.com/@sabiques1/integrating-asgardeo-in-a-react-application-for-simplified-authentication-and-identity-management-631e0d6e68ff)  

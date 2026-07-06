# Smart Parking - Mobile Application (Frontend)

Smart Parking is a mobile application developed with React Native and Expo that enables users to search for parking locations, reserve parking spots, perform check-in/check-out operations, and manage their vehicles and reservations.

## Features

- User authentication (Login / Register)
- View available parking locations
- Interactive parking spot selection
- Create parking reservations
- Cancel active reservations
- Parking check-in
- Parking check-out
- Reservation history
- Vehicle management
- Responsive mobile interface

---

## Technologies

- React Native
- Expo
- TypeScript
- Expo Router
- React Navigation
- Axios
- Context API

---

## Project Structure

```
app/
    (auth)/
    (tabs)/
    reservations/

src/
    api/
    components/
    context/
    services/
    types/
    utils/
```

---

## Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate to the project:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

or

```bash
yarn
```

---

## Running the Application

Start Expo:

```bash
npx expo start
```

Run on Android:

```bash
a
```

Run on iOS:

```bash
i
```

Run in Web browser:

```bash
w
```

---

## Backend Connection

The application communicates with the Smart Parking REST API.

Example configuration:

```ts
const API_URL = "http://localhost:8000";
```

---

## Main Screens

### Authentication

- Login
- Registration

### Home

- Active reservation
- Check In
- Check Out
- Reservation countdown

### Parking

- List of parking locations
- Parking spot availability

### Vehicles

- View vehicles
- Add vehicle
- Delete vehicle

### Reservations

- Reservation history
- Reservation details

---

## Parking Workflow

1. User selects a parking location.
2. User chooses an available parking spot.
3. Reservation is created.
4. User performs Check In upon arrival.
5. Parking session becomes active.
6. User performs Check Out when leaving.
7. Reservation is completed.

---

## API Communication

The frontend communicates with the backend using Axios.

Main modules:

- Authentication
- Vehicles
- Parking
- Reservations
- Parking Sessions

---

## Project Architecture

The project follows a layered architecture:

```
UI Components
      │
      ▼
Screens
      │
      ▼
Services
      │
      ▼
API Layer
      │
      ▼
REST Backend
```

---

## Author

Developed as part of the Smart Parking project using React Native and Expo.
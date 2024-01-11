# GUESS WHAT I'M THINKING?

This project is a React Native application built using Expo. It's a unique app where the aim is to take a picture of your environment, and the app uses Google Vision API to identify objects within that environment. The app then selects a random object, and the user has to guess what it is.

## Key Features

- **Google Vision API**: Leverages Google's powerful Vision API for object detection. [Learn more about Google Vision API](https://cloud.google.com/vision/).
- **React Awesome Button**: A React Native component for an awesome button. [Check it out on GitHub](https://github.com/rcaferati/react-awesome-button).

## Project Status

This project is currently in the prototype phase. There are some known issues and limitations:

- **Infinite Loading Issue**: The app may get stuck in an infinite loading state if you attempt to reload the project while the camera is active. Reloading before or after using the camera should work fine.
- **Gallery Functionality**: The 'Open Gallery' feature is not fully operational. It currently redirects to the camera component, as the app is not accepting images from the gallery at the moment.

## Getting Started

To get started with this project:

1. Clone the repository.
2. Run `npm install` to install the required dependencies.
3. Start the project using `expo start`.

Ensure you have Expo installed. [Learn more about Expo](https://expo.dev/).

## Contribution

Feel free to contribute to this project. However, please adhere to the following guidelines:

- Before creating a pull request, please create an issue to discuss the changes.
- Keep the code clean and well-documented.

## Author

Shay Kelly

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Google Vision API](https://cloud.google.com/vision/)
- [React Awesome Button](https://github.com/rcaferati/react-awesome-button)

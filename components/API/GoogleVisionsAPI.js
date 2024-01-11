import { View, Text } from 'react-native'
import React from 'react'

const API_KEY = 'AIzaSyDaoNemYFLYR_uJ17SXmoZGbGkwmOmXlyw';
const API_URL = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`;

/**
 * Calls the Google Vision API to perform object localization on an image.
 * @param {string} image - The image content to be processed.
 * @returns {Promise<Array<string>>} - A promise that resolves to an array of localized object names.
 */
const callGoogleVisionAsync = async (image) => {
    const body = {
        requests: [
            {
                image: { content: image },
                features: [{ type: 'OBJECT_LOCALIZATION', maxResults: 5 }],
            },
        ],
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        const result = await response.json();
        if (result.responses && result.responses.length > 0) {
            return result.responses[0].localizedObjectAnnotations.map((annotation) => annotation.name);
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error calling Google Vision API:', error.message);
        return [];
    }
};

export default callGoogleVisionAsync;
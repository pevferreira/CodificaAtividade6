/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./app.js"
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#3b82f6',
                    dark: '#60a5fa'
                },
                background: {
                    light: '#ffffff',
                    dark: '#1f2937'
                },
                text: {
                    light: '#1f2937',
                    dark: '#f9fafb'
                }
            }
        }
    },
    plugins: []
}

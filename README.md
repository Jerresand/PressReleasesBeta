# Press Release Viewer

A simple web application that displays press releases for 100 major companies using the Intrinio API.

## Features

- Browse 100 major publicly traded companies
- View recent press releases for each company
- Clean, responsive interface
- Real-time data from Intrinio API

## Setup Instructions

### 1. Get an Intrinio API Key

1. Visit [Intrinio](https://intrinio.com/)
2. Sign up for a free account
3. Get your API key from the dashboard

### 2. Configure the Application

1. Open `script.js`
2. Replace `YOUR_INTRINIO_API_KEY_HERE` with your actual API key:
   ```javascript
   const INTRINIO_API_KEY = 'your_actual_api_key_here';
   ```

### 3. Run the Application

Since this is a client-side application that makes API calls, you'll need to serve it from a web server to avoid CORS issues.

#### Option A: Using Python (if you have Python installed)
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Option B: Using Node.js (if you have Node.js installed)
```bash
npx http-server
```

#### Option C: Using PHP (if you have PHP installed)
```bash
php -S localhost:8000
```

### 4. Access the Application

Open your browser and navigate to:
- `http://localhost:8000` (if using Python/PHP)
- `http://localhost:8080` (if using Node.js http-server)

## Usage

1. **Set API Key**: Click the "Set API Key" button and enter your Intrinio API key
2. **Select Company**: Choose a company from the dropdown menu
3. **View Releases**: Browse through the company's recent press releases
4. **Read Full Releases**: Click "Read Full Release" to open the complete press release

## File Structure

```
PressReleaseBeta/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
├── companies.csv       # List of 100 companies
└── README.md           # This file
```

## API Information

This application uses the Intrinio News API endpoint:
- **Endpoint**: `https://api-v2.intrinio.com/companies/{ticker}/news`
- **Method**: GET
- **Authentication**: Bearer token (API key)

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure you're serving the files from a web server rather than opening the HTML file directly in your browser.

### API Key Issues
- Ensure your API key is valid and active
- Check that you have sufficient API credits
- Verify the API key is correctly set in the script.js file

### No Press Releases
Some companies may not have recent press releases available through the API. This is normal and depends on the company's communication frequency.

## Customization

### Adding More Companies
Edit the `companies.csv` file to add more companies. The format is:
```
Company Name,Ticker Symbol,Sector
```

### Styling Changes
Modify `styles.css` to change the appearance of the application.

### API Endpoint Changes
Update the `INTRINIO_BASE_URL` and API endpoint in `script.js` if needed.

## Notes

- This is a demo application for educational purposes
- The Intrinio API has rate limits and usage restrictions
- Some companies may have limited press release data available
- The application is designed to be simple and functional rather than production-ready
# PressReleasesBeta

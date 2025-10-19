// Configuration - API calls will go through our backend
const API_BASE_URL = '/api';

// Global variables
let companies = [];
let currentCompany = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadCompanies();
    setupEventListeners();
});


// Load companies from CSV
async function loadCompanies() {
    try {
        const response = await fetch('top100PRs.csv');
        const csvText = await response.text();
        companies = parseCSV(csvText);
        populateCompanySelector();
    } catch (error) {
        console.error('Error loading companies:', error);
        showError('Failed to load companies list');
    }
}

// Parse CSV text into array of objects
function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    const companies = [];
    
    for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(';');
        companies.push({
            name: values[0],
            ticker: values[1]
        });
    }
    
    return companies;
}

// Populate the company selector dropdown
function populateCompanySelector() {
    const selector = document.getElementById('company-select');
    selector.innerHTML = '<option value="">Select a company...</option>';
    
    companies.forEach(company => {
        const option = document.createElement('option');
        option.value = company.ticker;
        option.textContent = `${company.name} (${company.ticker})`;
        selector.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    const selector = document.getElementById('company-select');
    selector.addEventListener('change', function() {
        const ticker = this.value;
        if (ticker) {
            const company = companies.find(c => c.ticker === ticker);
            loadPressReleases(company);
        } else {
            showWelcomeMessage();
        }
    });
}

// Load press releases for a specific company
async function loadPressReleases(company) {
    currentCompany = company;
    showLoading();
    
    try {
        const pressReleases = await fetchPressReleases(company.ticker);
        displayPressReleases(pressReleases, company);
    } catch (error) {
        console.error('Error loading press releases:', error);
        showError(`Failed to load press releases for ${company.name}`);
    }
}

// Fetch press releases from our backend API
async function fetchPressReleases(ticker) {
    const url = `${API_BASE_URL}/press-releases?ticker=${encodeURIComponent(ticker)}`;
    
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    return data.news || [];
}

// Display press releases
function displayPressReleases(pressReleases, company) {
    const container = document.getElementById('press-releases');
    
    if (pressReleases.length === 0) {
        container.innerHTML = `
            <div class="no-releases">
                <h3>No Press Releases Found</h3>
                <p>No recent press releases were found for ${company.name} (${company.ticker}).</p>
            </div>
        `;
        return;
    }
    
    let html = `
        <div style="padding: 20px; border-bottom: 1px solid #ecf0f1; background: #f8f9fa;">
            <h2 style="margin: 0; color: #2c3e50;">${company.name} (${company.ticker})</h2>
            <p style="margin: 5px 0 0 0; color: #7f8c8d;">${pressReleases.length} press releases</p>
        </div>
    `;
    
    pressReleases.forEach(release => {
        const date = new Date(release.publication_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        html += `
            <div class="press-release-item">
                <div class="press-release-title">${release.title || 'No title available'}</div>
                <div class="press-release-date">${date}</div>
                <div class="press-release-summary">${release.summary || 'No summary available'}</div>
                ${release.url ? `<a href="${release.url}" target="_blank" class="press-release-link">Read Full Release</a>` : ''}
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Show loading state
function showLoading() {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('press-releases').innerHTML = '';
}

// Show welcome message
function showWelcomeMessage() {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('press-releases').innerHTML = `
        <div class="welcome-message">
            <h2>Welcome!</h2>
            <p>Select a company from the dropdown above to view their press releases.</p>
        </div>
    `;
}

// Show error message
function showError(message) {
    document.getElementById('loading').style.display = 'none';
    document.getElementById('press-releases').innerHTML = `
        <div class="error-message">
            <h3>Error</h3>
            <p>${message}</p>
            <p>Please check your API key and try again.</p>
        </div>
    `;
}


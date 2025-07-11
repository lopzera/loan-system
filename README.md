# Loan Management Dashboard

A responsive web application for managing loan items, built with HTML, CSS, and JavaScript (no frameworks).

## Features

### Homepage
- **User Selection**: Circular avatars representing users with emojis and names
- **Alphabetical Order**: Users are displayed in alphabetical order
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Dashboard
- **Tab Navigation**: Four main sections for different item statuses
- **Available Items**: View and register new items
- **Borrowed Items**: Track current loans and create new ones
- **Maintenance Needed**: Items flagged for maintenance
- **Under Maintenance**: Items currently being serviced

### Item Management
- **Item Registration**: Complete form with all required fields
- **Item Details**: Modal view with comprehensive information
- **Status Tracking**: Automatic status updates based on actions
- **History View**: Track item usage over time

### Reminder System
- **Automatic Alerts**: Pop-up notifications for items due within 3 days
- **Snooze Feature**: Remind again in 1 hour
- **Quick Return**: Mark items as returned directly from reminder

## Users

The application includes the following users with their respective emojis:

- **Bruno** - 🏍️
- **Carol** - ☮️
- **Christian** - ⚡
- **Juliana** - 👠
- **Laysa** - 👶
- **Tamara** - 🍣

## Item Statuses

1. **Available**: Items ready for loan
2. **Borrowed**: Currently loaned items with borrower information
3. **Maintenance Needed**: Items requiring maintenance attention
4. **Under Maintenance**: Items being serviced

## How to Use

### Getting Started
1. Open `index.html` in a web browser
2. Select a user from the homepage
3. Navigate through the dashboard tabs

### Registering a New Item
1. Go to the "Available" tab
2. Click "Register New Item"
3. Fill in the required fields:
   - Name (required)
   - Weight in kg (required)
   - Storage Location (required)
   - Optional: Height, Width, Depth, Category, Model, Internal Code, Additional Info
4. Click "Register Item"

### Loaning an Item
1. Go to the "Borrowed" tab
2. Click "Loan New Item"
3. Select an available item
4. Choose a borrower
5. Set loan and return dates
6. Add a reason (optional)
7. Click "Loan Item"

### Viewing Item Details
- Click on any item card to view detailed information
- Information displayed depends on the item's current status
- Use "View History" to see past usage (demo feature)

### Managing Reminders
- When a user logs in, they'll see reminders for items due within 3 days
- Choose to snooze the reminder or mark items as returned
- Reminders are user-specific

## Technical Details

### File Structure
```
loan-management-dashboard/
├── index.html          # Main HTML file
├── styles.css          # CSS styling
├── script.js           # JavaScript functionality
└── README.md           # This file
```

### Data Storage
- Currently uses in-memory storage (sample data)
- Designed for easy integration with databases
- Sample data includes 4 items with different statuses

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px and 480px
- Flexible grid layouts
- Touch-friendly interface

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses CSS Grid and Flexbox

## Sample Data

The application comes with sample data including:
- Laptop Dell XPS 13 (Available)
- Projector Epson (Borrowed by Christian)
- Tool Kit (Maintenance Needed)
- Office Chair (Under Maintenance)

## Future Enhancements

The code is structured to easily support:
- Database integration (MySQL, PostgreSQL, etc.)
- User authentication and authorization
- Advanced search and filtering
- Export functionality (PDF, Excel)
- Email notifications
- Barcode/QR code scanning
- Mobile app development

## Development

To modify or extend the application:

1. **Adding New Features**: The modular JavaScript structure makes it easy to add new functionality
2. **Styling Changes**: CSS uses modern features like CSS Grid and custom properties
3. **Data Structure**: Items and loans are stored in arrays that can be easily replaced with API calls

## License

This project is open source and available for personal and commercial use. 
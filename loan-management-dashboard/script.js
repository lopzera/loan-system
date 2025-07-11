// Global variables
let currentUser = null;
let items = [];
let loans = [];
let maintenanceRecords = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
    loadSampleData();
});

// Initialize the application
function initializeApp() {
    // Set default dates for forms
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    
    if (document.getElementById('loan-date')) {
        document.getElementById('loan-date').value = today;
    }
    if (document.getElementById('return-date')) {
        document.getElementById('return-date').value = nextWeek;
    }
}

// Setup event listeners
function setupEventListeners() {
    // User avatar clicks
    document.querySelectorAll('.user-avatar').forEach(avatar => {
        avatar.addEventListener('click', function() {
            const userName = this.getAttribute('data-user');
            selectUser(userName);
        });
    });

    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });

    // Back button
    document.getElementById('back-btn').addEventListener('click', function() {
        showHomepage();
    });

    // Modal close buttons
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal.id);
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target.id);
        }
    });

    // Form submissions
    document.getElementById('item-registration-form').addEventListener('submit', handleItemRegistration);
    document.getElementById('loan-form').addEventListener('submit', handleLoanSubmission);
}

// Load sample data
function loadSampleData() {
    // Sample items
    items = [
        {
            id: 1,
            name: "Laptop Dell XPS 13",
            weight: 1.2,
            height: 30,
            width: 20,
            depth: 2,
            storageLocation: "IT Department - Shelf A1",
            additionalInfo: "High-performance laptop for development work",
            category: "Electronics",
            model: "XPS 13 9310",
            internalCode: "LAP001",
            status: "available"
        },
        {
            id: 2,
            name: "Projector Epson",
            weight: 3.5,
            height: 15,
            width: 35,
            depth: 25,
            storageLocation: "Conference Room Storage",
            additionalInfo: "HD projector for presentations",
            category: "AV Equipment",
            model: "Epson PowerLite 1781W",
            internalCode: "PROJ001",
            status: "borrowed",
            borrower: "Christian",
            loanDate: "2024-01-15",
            returnDate: "2024-01-22",
            reason: "Client presentation"
        },
        {
            id: 3,
            name: "Tool Kit",
            weight: 5.0,
            height: 25,
            width: 40,
            depth: 15,
            storageLocation: "Maintenance Room",
            additionalInfo: "Complete set of basic tools",
            category: "Tools",
            model: "Professional Kit",
            internalCode: "TOOL001",
            status: "maintenance-needed",
            maintenanceReason: "Missing screwdriver",
            reportedBy: "Bruno"
        },
        {
            id: 4,
            name: "Office Chair",
            weight: 12.0,
            height: 120,
            width: 65,
            depth: 65,
            storageLocation: "Storage Room B",
            additionalInfo: "Ergonomic office chair",
            category: "Furniture",
            model: "ErgoMax Pro",
            internalCode: "CHAIR001",
            status: "under-maintenance",
            maintenanceReason: "Wheel replacement",
            maintenanceLocation: "Local Repair Shop",
            cost: 45.00,
            dateSent: "2024-01-10",
            estimatedReturn: "2024-01-20"
        }
    ];

    // Sample loans
    loans = [
        {
            id: 1,
            itemId: 2,
            borrower: "Christian",
            loanDate: "2024-01-15",
            returnDate: "2024-01-22",
            reason: "Client presentation"
        }
    ];

    // Sample maintenance records
    maintenanceRecords = [
        {
            id: 1,
            itemId: 3,
            reason: "Missing screwdriver",
            reportedBy: "Bruno",
            date: "2024-01-18"
        },
        {
            id: 2,
            itemId: 4,
            reason: "Wheel replacement",
            maintenanceLocation: "Local Repair Shop",
            cost: 45.00,
            dateSent: "2024-01-10",
            estimatedReturn: "2024-01-20"
        }
    ];
}

// User selection
function selectUser(userName) {
    currentUser = userName;
    document.getElementById('dashboard-title').textContent = `${userName}'s Dashboard`;
    showDashboard();
    renderDashboard();
    checkReminders();
}

// Show homepage
function showHomepage() {
    document.getElementById('homepage').classList.add('active');
    document.getElementById('dashboard').classList.remove('active');
    currentUser = null;
}

// Show dashboard
function showDashboard() {
    document.getElementById('homepage').classList.remove('active');
    document.getElementById('dashboard').classList.add('active');
}

// Switch tabs
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    document.getElementById(tabName).classList.add('active');

    // Render content for the selected tab
    renderTabContent(tabName);
}

// Render dashboard
function renderDashboard() {
    renderTabContent('available');
}

// Render tab content
function renderTabContent(tabName) {
    switch(tabName) {
        case 'available':
            renderAvailableItems();
            break;
        case 'borrowed':
            renderBorrowedItems();
            break;
        case 'maintenance-needed':
            renderMaintenanceNeededItems();
            break;
        case 'under-maintenance':
            renderUnderMaintenanceItems();
            break;
    }
}

// Render available items
function renderAvailableItems() {
    const container = document.getElementById('available-items');
    const availableItems = items.filter(item => item.status === 'available');
    
    container.innerHTML = '';
    
    if (availableItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">No available items found.</p>';
        return;
    }
    
    availableItems.forEach(item => {
        const card = createItemCard(item, 'available');
        container.appendChild(card);
    });
}

// Render borrowed items
function renderBorrowedItems() {
    const container = document.getElementById('borrowed-items');
    const borrowedItems = items.filter(item => item.status === 'borrowed');
    
    container.innerHTML = '';
    
    if (borrowedItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">No borrowed items found.</p>';
        return;
    }
    
    borrowedItems.forEach(item => {
        const card = createItemCard(item, 'borrowed');
        container.appendChild(card);
    });
}

// Render maintenance needed items
function renderMaintenanceNeededItems() {
    const container = document.getElementById('maintenance-needed-items');
    const maintenanceItems = items.filter(item => item.status === 'maintenance-needed');
    
    container.innerHTML = '';
    
    if (maintenanceItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">No items need maintenance.</p>';
        return;
    }
    
    maintenanceItems.forEach(item => {
        const card = createItemCard(item, 'maintenance-needed');
        container.appendChild(card);
    });
}

// Render under maintenance items
function renderUnderMaintenanceItems() {
    const container = document.getElementById('under-maintenance-items');
    const underMaintenanceItems = items.filter(item => item.status === 'under-maintenance');
    
    container.innerHTML = '';
    
    if (underMaintenanceItems.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; grid-column: 1 / -1;">No items under maintenance.</p>';
        return;
    }
    
    underMaintenanceItems.forEach(item => {
        const card = createItemCard(item, 'under-maintenance');
        container.appendChild(card);
    });
}

// Create item card
function createItemCard(item, status) {
    const card = document.createElement('div');
    card.className = 'item-card';
    card.onclick = () => showItemDetail(item);
    
    let content = `
        <h3>${item.name}</h3>
        <div class="item-info">
            <span><span class="label">Status:</span> <span class="status-badge status-${status}">${status.replace('-', ' ')}</span></span>
    `;
    
    switch(status) {
        case 'available':
            content += `
                <span><span class="label">Weight:</span> <span class="value">${item.weight} kg</span></span>
                <span><span class="label">Dimensions:</span> <span class="value">${item.height || 'N/A'} × ${item.width || 'N/A'} × ${item.depth || 'N/A'} cm</span></span>
                <span><span class="label">Location:</span> <span class="value">${item.storageLocation}</span></span>
                <span><span class="label">Category:</span> <span class="value">${item.category || 'N/A'}</span></span>
            `;
            break;
        case 'borrowed':
            content += `
                <span><span class="label">Borrower:</span> <span class="value">${item.borrower}</span></span>
                <span><span class="label">Loan Date:</span> <span class="value">${formatDate(item.loanDate)}</span></span>
                <span><span class="label">Return Date:</span> <span class="value">${formatDate(item.returnDate)}</span></span>
                <span><span class="label">Reason:</span> <span class="value">${item.reason || 'N/A'}</span></span>
            `;
            break;
        case 'maintenance-needed':
            content += `
                <span><span class="label">Reason:</span> <span class="value">${item.maintenanceReason}</span></span>
                <span><span class="label">Reported by:</span> <span class="value">${item.reportedBy}</span></span>
            `;
            break;
        case 'under-maintenance':
            content += `
                <span><span class="label">Reason:</span> <span class="value">${item.maintenanceReason}</span></span>
                <span><span class="label">Location:</span> <span class="value">${item.maintenanceLocation}</span></span>
                <span><span class="label">Cost:</span> <span class="value">$${item.cost}</span></span>
                <span><span class="label">Date Sent:</span> <span class="value">${formatDate(item.dateSent)}</span></span>
                <span><span class="label">Estimated Return:</span> <span class="value">${formatDate(item.estimatedReturn)}</span></span>
            `;
            break;
    }
    
    content += `
        </div>
    `;
    
    card.innerHTML = content;
    return card;
}

// Show item detail modal
function showItemDetail(item) {
    const modal = document.getElementById('item-modal');
    const content = document.getElementById('item-detail-content');
    
    let detailContent = `
        <h2>${item.name}</h2>
        <div class="item-info">
            <span><span class="label">Status:</span> <span class="status-badge status-${item.status}">${item.status.replace('-', ' ')}</span></span>
            <span><span class="label">Internal Code:</span> <span class="value">${item.internalCode}</span></span>
            <span><span class="label">Category:</span> <span class="value">${item.category || 'N/A'}</span></span>
            <span><span class="label">Model:</span> <span class="value">${item.model || 'N/A'}</span></span>
            <span><span class="label">Weight:</span> <span class="value">${item.weight} kg</span></span>
            <span><span class="label">Dimensions:</span> <span class="value">${item.height || 'N/A'} × ${item.width || 'N/A'} × ${item.depth || 'N/A'} cm</span></span>
            <span><span class="label">Storage Location:</span> <span class="value">${item.storageLocation}</span></span>
            <span><span class="label">Additional Info:</span> <span class="value">${item.additionalInfo || 'N/A'}</span></span>
    `;
    
    if (item.status === 'borrowed') {
        detailContent += `
            <span><span class="label">Borrower:</span> <span class="value">${item.borrower}</span></span>
            <span><span class="label">Loan Date:</span> <span class="value">${formatDate(item.loanDate)}</span></span>
            <span><span class="label">Return Date:</span> <span class="value">${formatDate(item.returnDate)}</span></span>
            <span><span class="label">Reason:</span> <span class="value">${item.reason || 'N/A'}</span></span>
        `;
    }
    
    detailContent += `
        </div>
        <div class="form-actions">
            <button class="btn-secondary" onclick="closeModal('item-modal')">Close</button>
            <button class="btn-primary" onclick="viewItemHistory(${item.id})">
                <i class="fas fa-history"></i> View History
            </button>
        </div>
    `;
    
    content.innerHTML = detailContent;
    modal.style.display = 'block';
}

// View item history
function viewItemHistory(itemId) {
    // This would typically fetch from a database
    alert('Item history feature would show loan history, maintenance records, etc.');
}

// Open item registration modal
function openItemRegistration() {
    document.getElementById('registration-modal').style.display = 'block';
}

// Open loan form modal
function openLoanForm() {
    const modal = document.getElementById('loan-modal');
    const itemSelect = document.getElementById('loan-item');
    const borrowerSelect = document.getElementById('loan-borrower');
    
    // Populate available items
    const availableItems = items.filter(item => item.status === 'available');
    itemSelect.innerHTML = '<option value="">Select an item...</option>';
    availableItems.forEach(item => {
        itemSelect.innerHTML += `<option value="${item.id}">${item.name} (${item.internalCode})</option>`;
    });
    
    // Populate borrowers
    const users = ['Bruno', 'Carol', 'Christian', 'Juliana', 'Laysa', 'Tamara'];
    borrowerSelect.innerHTML = '<option value="">Select borrower...</option>';
    users.forEach(user => {
        borrowerSelect.innerHTML += `<option value="${user}">${user}</option>`;
    });
    
    modal.style.display = 'block';
}

// Close modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Handle item registration
function handleItemRegistration(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const newItem = {
        id: items.length + 1,
        name: document.getElementById('item-name').value,
        weight: parseFloat(document.getElementById('item-weight').value),
        height: parseFloat(document.getElementById('item-height').value) || null,
        width: parseFloat(document.getElementById('item-width').value) || null,
        depth: parseFloat(document.getElementById('item-depth').value) || null,
        storageLocation: document.getElementById('item-location').value,
        category: document.getElementById('item-category').value || null,
        model: document.getElementById('item-model').value || null,
        internalCode: document.getElementById('item-code').value || null,
        additionalInfo: document.getElementById('item-info').value || null,
        status: 'available'
    };
    
    items.push(newItem);
    closeModal('registration-modal');
    event.target.reset();
    renderAvailableItems();
    
    alert('Item registered successfully!');
}

// Handle loan submission
function handleLoanSubmission(event) {
    event.preventDefault();
    
    const itemId = parseInt(document.getElementById('loan-item').value);
    const borrower = document.getElementById('loan-borrower').value;
    const loanDate = document.getElementById('loan-date').value;
    const returnDate = document.getElementById('return-date').value;
    const reason = document.getElementById('loan-reason').value;
    
    // Update item status
    const item = items.find(i => i.id === itemId);
    if (item) {
        item.status = 'borrowed';
        item.borrower = borrower;
        item.loanDate = loanDate;
        item.returnDate = returnDate;
        item.reason = reason;
    }
    
    // Add to loans array
    const newLoan = {
        id: loans.length + 1,
        itemId: itemId,
        borrower: borrower,
        loanDate: loanDate,
        returnDate: returnDate,
        reason: reason
    };
    loans.push(newLoan);
    
    closeModal('loan-modal');
    event.target.reset();
    renderAvailableItems();
    renderBorrowedItems();
    
    alert('Item loaned successfully!');
}

// Check for reminders
function checkReminders() {
    if (!currentUser) return;
    
    const today = new Date();
    const reminders = [];
    
    items.forEach(item => {
        if (item.status === 'borrowed' && item.borrower === currentUser) {
            const returnDate = new Date(item.returnDate);
            const daysUntilReturn = Math.ceil((returnDate - today) / (1000 * 60 * 60 * 24));
            
            if (daysUntilReturn <= 3 && daysUntilReturn >= 0) {
                reminders.push({
                    item: item,
                    daysUntilReturn: daysUntilReturn
                });
            }
        }
    });
    
    if (reminders.length > 0) {
        showReminders(reminders);
    }
}

// Show reminders modal
function showReminders(reminders) {
    const modal = document.getElementById('reminder-modal');
    const container = document.getElementById('reminder-items');
    
    container.innerHTML = '';
    reminders.forEach(reminder => {
        const reminderElement = document.createElement('div');
        reminderElement.className = 'reminder-item';
        reminderElement.innerHTML = `
            <h4>${reminder.item.name}</h4>
            <p><strong>Return Date:</strong> ${formatDate(reminder.item.returnDate)}</p>
            <p><strong>Days Left:</strong> ${reminder.daysUntilReturn} day(s)</p>
            <p><strong>Reason:</strong> ${reminder.item.reason || 'N/A'}</p>
        `;
        container.appendChild(reminderElement);
    });
    
    modal.style.display = 'block';
}

// Snooze reminders
function snoozeReminders() {
    closeModal('reminder-modal');
    // In a real app, you'd set a timer to show reminders again in 1 hour
    setTimeout(() => {
        checkReminders();
    }, 1000); // For demo purposes, show again in 1 second
}

// Mark items as returned
function markAsReturned() {
    const modal = document.getElementById('reminder-modal');
    const reminderItems = modal.querySelectorAll('.reminder-item');
    
    reminderItems.forEach(reminderItem => {
        const itemName = reminderItem.querySelector('h4').textContent;
        const item = items.find(i => i.name === itemName);
        if (item) {
            item.status = 'available';
            delete item.borrower;
            delete item.loanDate;
            delete item.returnDate;
            delete item.reason;
        }
    });
    
    closeModal('reminder-modal');
    renderAvailableItems();
    renderBorrowedItems();
    alert('Items marked as returned!');
}

// Utility function to format dates
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
} 
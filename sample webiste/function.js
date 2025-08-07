
        // Global variables
        let currentUser = null;
        let currentUserType = null;
        let selectedTable = null;
        let currentOrder = [];
        let orderTotal = 0;

        // Sample data
        const menuItems = [
            { id: 1, name: "Espresso", description: "Rich and bold coffee shot", price: 2.50 },
            { id: 2, name: "Cappuccino", description: "Espresso with steamed milk foam", price: 3.75 },
            { id: 3, name: "Latte", description: "Smooth espresso with steamed milk", price: 4.25 },
            { id: 4, name: "Americano", description: "Espresso with hot water", price: 3.00 },
            { id: 5, name: "Mocha", description: "Chocolate and espresso delight", price: 4.75 },
            { id: 6, name: "Croissant", description: "Buttery, flaky pastry", price: 2.95 },
            { id: 7, name: "Blueberry Muffin", description: "Fresh baked with real blueberries", price: 3.25 },
            { id: 8, name: "Avocado Toast", description: "Multigrain bread with fresh avocado", price: 5.50 }
        ];

        let tableStatus = {};
        let feedbackList = [
            { author: "Sarah M.", date: "2025-08-01", content: "Amazing coffee and cozy atmosphere! Will definitely come back." },
            { author: "John D.", date: "2025-07-30", content: "The latte art here is incredible. Baristas are true artists!" }
        ];

        // Initialize cafe tables
        function initializeTables() {
            const totalTables = 24;
            for (let i = 1; i <= totalTables; i++) {
                tableStatus[i] = Math.random() > 0.7 ? 'occupied' : 'available';
            }
        }

        // Handle login
        function handleLogin(userType) {
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value.trim();

            if (!email || !password) {
                alert('Please enter both email and password.');
                return;
            }

            currentUser = email.split('@')[0]; // Use part before @ as username
            currentUserType = userType;
            
            // Hide login section
            document.getElementById('loginSection').style.display = 'none';
            
            if (userType === 'customer') {
                document.getElementById('customerName').textContent = currentUser;
                document.getElementById('customerDashboard').style.display = 'block';
                initializeCustomerDashboard();
            } else {
                document.getElementById('employeeName').textContent = currentUser;
                document.getElementById('employeeDashboard').style.display = 'block';
                initializePOS();
            }
        }

        // Initialize login event listeners
        document.addEventListener('DOMContentLoaded', function() {
            // Customer login button
            document.getElementById('login-button').addEventListener('click', function() {
                handleLogin('customer');
            });
            
            // Employee login button
            document.getElementById('employee-login-btn').addEventListener('click', function() {
                const email = document.getElementById('email').value.trim();
                const password = document.getElementById('password').value.trim();
                
                if (!email || !password) {
                    alert('Please enter both email and password to login as employee.');
                    return;
                }
                
                handleLogin('employee');
            });
        });

        // Initialize customer dashboard
        function initializeCustomerDashboard() {
            renderCafeLayout();
            renderMenu();
            renderFeedback();
             setMinDate();
               // Add form submit event listener
    const form = document.getElementById('reservationForm');
    if (form) {
        form.addEventListener('submit', handleReservation);
    }
        }

        // Render cafe layout
        function renderCafeLayout() {
            const grid = document.getElementById('cafeGrid');
            grid.innerHTML = '';
            
            for (let i = 1; i <= 24; i++) {
                const table = document.createElement('div');
                table.className = `table ${tableStatus[i]}`;
                table.textContent = i;
                table.onclick = () => selectTable(i);
                grid.appendChild(table);
            }
        }

        // // Select table
        // function selectTable(tableNumber) {
        //     if (tableStatus[tableNumber] === 'occupied') return;
            
        //     // Reset previous selection
        //     if (selectedTable) {
        //         document.querySelector(`[onclick="selectTable(${selectedTable})"]`).classList.remove('selected');
        //     }
            
        //     selectedTable = tableNumber;
        //     document.querySelector(`[onclick="selectTable(${tableNumber})"]`).classList.add('selected');
            
        //     // Show reservation info
        //     document.getElementById('selectedTable').textContent = tableNumber;
        //     document.getElementById('reservationInfo').style.display = 'block';
        // }

        function selectTable(tableNumber) {
    if (tableStatus[tableNumber] === 'occupied') {
        return; // Can't select occupied tables
    }
    
    // Reset previous selection
    if (selectedTable) {
        const prevTable = document.querySelector(`[onclick="selectTable(${selectedTable})"]`);
        if (prevTable) {
            prevTable.classList.remove('selected');
            prevTable.classList.add('available');
        }
    }
    
    // Select new table
    selectedTable = tableNumber;
    const currentTable = document.querySelector(`[onclick="selectTable(${tableNumber})"]`);
    currentTable.classList.remove('available');
    currentTable.classList.add('selected');
    
    // Show selected table info
    document.getElementById('selectedTableNumber').textContent = tableNumber;
    document.getElementById('selectedTableInfo').classList.add('show');
    
    // Enable submit button
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.disabled = false;
    submitBtn.textContent = 'Confirm Reservation';
}

        // // Confirm reservation
        // function confirmReservation() {
        //     if (selectedTable) {
        //         tableStatus[selectedTable] = 'occupied';
        //         alert(`Table ${selectedTable} has been reserved successfully!`);
        //         renderCafeLayout();
        //         document.getElementById('reservationInfo').style.display = 'none';
        //         selectedTable = null;
        //     }
        // }


        // REMOVE the old confirmReservation function entirely and ADD:

// Set minimum date to today
function setMinDate() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dateInput = document.getElementById('reservationDate');
    dateInput.min = tomorrow.toISOString().split('T')[0];
}

// Handle form submission
function handleReservation(event) {
    event.preventDefault();
    
    if (!selectedTable) {
        alert('Please select a table first!');
        return;
    }

    const formData = new FormData(event.target);
    const reservationData = {
        table: selectedTable,
        name: formData.get('customerName'),
        contact: formData.get('contactNumber'),
        diners: formData.get('numberOfDiners'),
        date: formData.get('reservationDate'),
        time: formData.get('reservationTime'),
        notes: formData.get('notes')
    };

    // Simulate reservation processing
    console.log('Reservation Data:', reservationData);
    
    // Mark table as occupied
    tableStatus[selectedTable] = 'occupied';
    
    // Show success message
    document.getElementById('successMessage').classList.add('show');
    
    // Reset form and selection
    setTimeout(() => {
        document.getElementById('reservationForm').reset();
        document.getElementById('selectedTableInfo').classList.remove('show');
        document.getElementById('successMessage').classList.remove('show');
        
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Select a Table to Continue';
        
        selectedTable = null;
        renderCafeLayout();
    }, 3000);
}

        // Render menu
        function renderMenu() {
            const menuGrid = document.getElementById('menuGrid');
            menuGrid.innerHTML = '';
            
            menuItems.forEach(item => {
                const menuItem = document.createElement('div');
                menuItem.className = 'menu-item';
                menuItem.innerHTML = `
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="price">$${item.price.toFixed(2)}</div>
                `;
                menuGrid.appendChild(menuItem);
            });
        }

        // Render feedback
        function renderFeedback() {
            const feedbackContainer = document.getElementById('feedbackList');
            feedbackContainer.innerHTML = '<h3>Customer Reviews</h3>';
            
            feedbackList.forEach(feedback => {
                const feedbackItem = document.createElement('div');
                feedbackItem.className = 'feedback-item';
                feedbackItem.innerHTML = `
                    <div class="feedback-author">${feedback.author}</div>
                    <div class="feedback-date">${feedback.date}</div>
                    <div>${feedback.content}</div>
                `;
                feedbackContainer.appendChild(feedbackItem);
            });
        }

        // Submit feedback
        function submitFeedback() {
            const feedbackText = document.getElementById('feedbackText').value.trim();
            if (feedbackText) {
                const newFeedback = {
                    author: currentUser,
                    date: new Date().toISOString().split('T')[0],
                    content: feedbackText
                };
                feedbackList.unshift(newFeedback);
                document.getElementById('feedbackText').value = '';
                renderFeedback();
                alert('Thank you for your feedback!');
            }
        }

        // Initialize POS
        function initializePOS() {
            renderPOSMenu();
            updateOrderSummary();
        }

        // Render POS menu
        function renderPOSMenu() {
            const posMenu = document.getElementById('posMenu');
            posMenu.innerHTML = '';
            
            menuItems.forEach(item => {
                const posItem = document.createElement('button');
                posItem.className = 'pos-item';
                posItem.onclick = () => addToOrder(item);
                posItem.innerHTML = `
                    <h4>${item.name}</h4>
                    <p>$${item.price.toFixed(2)}</p>
                `;
                posMenu.appendChild(posItem);
            });
        }

        // Add to order
        function addToOrder(item) {
            const existingItem = currentOrder.find(orderItem => orderItem.id === item.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                currentOrder.push({...item, quantity: 1});
            }
            updateOrderSummary();
        }

        // Remove from order
        function removeFromOrder(itemId) {
            currentOrder = currentOrder.filter(item => item.id !== itemId);
            updateOrderSummary();
        }

        // Update order summary
        function updateOrderSummary() {
            const orderItems = document.getElementById('orderItems');
            const orderTotalElement = document.getElementById('orderTotal');
            
            orderItems.innerHTML = '';
            orderTotal = 0;
            
            currentOrder.forEach(item => {
                const itemTotal = item.price * item.quantity;
                orderTotal += itemTotal;
                
                const orderItem = document.createElement('div');
                orderItem.className = 'order-item';
                orderItem.innerHTML = `
                    <div>
                        <strong>${item.name}</strong><br>
                        Qty: ${item.quantity} × $${item.price.toFixed(2)}
                    </div>
                    <div>
                        $${itemTotal.toFixed(2)}
                        <button class="remove-btn" onclick="removeFromOrder(${item.id})">Remove</button>
                    </div>
                `;
                orderItems.appendChild(orderItem);
            });
            
            orderTotalElement.textContent = orderTotal.toFixed(2);
        }

        // Process order
        function processOrder() {
            if (currentOrder.length === 0) {
                alert('No items in order!');
                return;
            }
            
            alert(`Order processed successfully! Total: $${orderTotal.toFixed(2)}`);
            currentOrder = [];
            updateOrderSummary();
        }

        // Show tab
        function showTab(tabName) {
            // Hide all tabs
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            document.querySelectorAll('.nav-tab').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
        }

        // Logout
        function logout() {
            currentUser = null;
            currentUserType = null;
            selectedTable = null;
            currentOrder = [];
            
            // Reset forms
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
            
            // Hide dashboards and show login
            document.getElementById('customerDashboard').style.display = 'none';
            document.getElementById('employeeDashboard').style.display = 'none';
            document.getElementById('loginSection').style.display = 'flex';
        }

        // Initialize the app
        initializeTables();

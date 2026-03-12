-- Seed Database with Initial Data

-- ============================================================
-- ROLES
-- ============================================================

INSERT INTO roles (code, name, description, created_at, updated_at) VALUES
('ADMIN', 'Administrator', 'Full system access', NOW(), NOW()),
('MERCHANT', 'Merchant', 'Merchant user role', NOW(), NOW()),
('CUSTOMER', 'Customer', 'Customer user role', NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- CATEGORIES
-- ============================================================

INSERT INTO categories (code, name, description, is_active, created_at, updated_at) VALUES
('CAT001', 'Italian', 'Italian food and cuisine', true, NOW(), NOW()),
('CAT002', 'Asian', 'Asian fusion and traditional', true, NOW(), NOW()),
('CAT003', 'Fast Food', 'Quick service restaurants', true, NOW(), NOW()),
('CAT004', 'Cafe', 'Coffee and cafe dining', true, NOW(), NOW()),
('CAT005', 'Fine Dining', 'Upscale dining experience', true, NOW(), NOW()),
('CAT006', 'Seafood', 'Fresh seafood specialties', true, NOW(), NOW()),
('CAT007', 'Mexican', 'Mexican and Latin American', true, NOW(), NOW()),
('CAT008', 'Indian', 'Indian spices and curries', true, NOW(), NOW()),
('CAT009', 'Steakhouse', 'Grilled meats and steaks', true, NOW(), NOW()),
('CAT010', 'Vegetarian', 'Plant-based cuisine', true, NOW(), NOW()),
('CAT011', 'Bakery', 'Fresh baked goods', true, NOW(), NOW()),
('CAT012', 'Thai', 'Thai street food and dishes', true, NOW(), NOW()),
('CAT013', 'Japanese', 'Sushi and ramen specialists', true, NOW(), NOW()),
('CAT014', 'Mediterranean', 'Mediterranean flavors', true, NOW(), NOW()),
('CAT015', 'Korean', 'Korean BBQ and street food', true, NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- TAGS
-- ============================================================

INSERT INTO tags (code, name, description, is_active, created_at, updated_at) VALUES
('TAG001', 'Smoking Area', 'Has designated smoking area', true, NOW(), NOW()),
('TAG002', 'WiFi', 'Free WiFi available', true, NOW(), NOW()),
('TAG003', 'Air Conditioning', 'Climate controlled space', true, NOW(), NOW()),
('TAG004', 'Outdoor Seating', 'Outdoor dining area', true, NOW(), NOW()),
('TAG005', 'Vegetarian Options', 'Vegetarian menu available', true, NOW(), NOW()),
('TAG006', 'Vegan Options', 'Vegan menu available', true, NOW(), NOW()),
('TAG007', 'Happy Hour', 'Special discounts available', true, NOW(), NOW()),
('TAG008', 'Live Music', 'Live entertainment', true, NOW(), NOW()),
('TAG009', 'Private Rooms', 'Private dining available', true, NOW(), NOW()),
('TAG010', 'Delivery', 'Food delivery service', true, NOW(), NOW()),
('TAG011', 'Takeout', 'Takeaway service available', true, NOW(), NOW()),
('TAG012', 'Family Friendly', 'Suitable for families', true, NOW(), NOW()),
('TAG013', 'Reservation Required', 'Booking recommended', true, NOW(), NOW()),
('TAG014', 'Wheelchair Accessible', 'ADA compliant', true, NOW(), NOW()),
('TAG015', 'Pet Friendly', 'Pets allowed', true, NOW(), NOW()),
('TAG016', 'Alcohol Served', 'Alcoholic beverages available', true, NOW(), NOW()),
('TAG017', 'Gluten Free', 'Gluten-free options', true, NOW(), NOW()),
('TAG018', 'Organic', 'Organic ingredients used', true, NOW(), NOW()),
('TAG019', 'Local', 'Local ingredients and sourcing', true, NOW(), NOW()),
('TAG020', 'Budget Friendly', 'Affordable prices', true, NOW(), NOW())
ON CONFLICT (code) DO NOTHING;

-- ============================================================
-- USERS (Merchant accounts)
-- ============================================================

-- Hashed password for "Demo@12345" using bcrypt
-- You can generate your own with: SELECT crypt('Demo@12345', gen_salt('bf'));

INSERT INTO users (name, email, phone, password, avatar, is_first_time, role_id, created_at, updated_at) VALUES
('Luigi''s Pasta House', 'merchant1@example.com', '+17055550001', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Luigi%27s%20Pasta%20House', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Dragon Palace', 'merchant2@example.com', '+17055550002', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dragon%20Palace', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('The Burger Joint', 'merchant3@example.com', '+17055550003', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=The%20Burger%20Joint', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Coffee Corner', 'merchant4@example.com', '+17055550004', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coffee%20Corner', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Fine Steaks Co', 'merchant5@example.com', '+17055550005', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fine%20Steaks', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Ocean''s Catch', 'merchant6@example.com', '+17055550006', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ocean%27s%20Catch', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Fiesta Mexicana', 'merchant7@example.com', '+17055550007', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fiesta%20Mexicana', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Spice Route', 'merchant8@example.com', '+17055550008', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Spice%20Route', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('The Grill Master', 'merchant9@example.com', '+17055550009', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=The%20Grill%20Master', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Green Earth Cafe', 'merchant10@example.com', '+17055550010', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Green%20Earth%20Cafe', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Sweet Moments Bakery', 'merchant11@example.com', '+17055550011', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sweet%20Moments', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Thai Orchid', 'merchant12@example.com', '+17055550012', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Thai%20Orchid', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Sushi Symphony', 'merchant13@example.com', '+17055550013', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sushi%20Symphony', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Mediterranean Blue', 'merchant14@example.com', '+17055550014', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mediterranean', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('K-BBQ House', 'merchant15@example.com', '+17055550015', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=K-BBQ', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Pasta Express', 'merchant16@example.com', '+17055550016', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pasta%20Express', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Asian Fusion HQ', 'merchant17@example.com', '+17055550017', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Asian%20Fusion', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Quick Bites', 'merchant18@example.com', '+17055550018', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Quick%20Bites', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('The Coffee Lab', 'merchant19@example.com', '+17055550019', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Coffee%20Lab', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Prime Cuts', 'merchant20@example.com', '+17055550020', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Prime%20Cuts', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Sea Pearl', 'merchant21@example.com', '+17055550021', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sea%20Pearl', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('El Mariachi', 'merchant22@example.com', '+17055550022', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=El%20Mariachi', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Curry Leaf', 'merchant23@example.com', '+17055550023', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Curry%20Leaf', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Steakholme', 'merchant24@example.com', '+17055550024', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Steakholme', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Veggie Paradise', 'merchant25@example.com', '+17055550025', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Veggie%20Paradise', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Bread & Co', 'merchant26@example.com', '+17055550026', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bread%20Co', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Bangkok Street', 'merchant27@example.com', '+17055550027', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bangkok%20Street', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Maki Master', 'merchant28@example.com', '+17055550028', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maki%20Master', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Greek Island', 'merchant29@example.com', '+17055550029', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Greek%20Island', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Seoul Kitchen', 'merchant30@example.com', '+17055550030', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Seoul%20Kitchen', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Northern Rivers', 'merchant31@example.com', '+17055550031', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Northern%20Rivers', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Eastern Star', 'merchant32@example.com', '+17055550032', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eastern%20Star', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Western Saloon', 'merchant33@example.com', '+17055550033', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Western%20Saloon', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Southern Soul', 'merchant34@example.com', '+17055550034', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Southern%20Soul', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Central Hub', 'merchant35@example.com', '+17055550035', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Central%20Hub', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Urban Eats', 'merchant36@example.com', '+17055550036', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Urban%20Eats', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Farm to Table', 'merchant37@example.com', '+17055550037', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Farm%20to%20Table', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Sweet Treats', 'merchant38@example.com', '+17055550038', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sweet%20Treats', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Fresh Plates', 'merchant39@example.com', '+17055550039', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fresh%20Plates', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW()),
('Hot Spot', 'merchant40@example.com', '+17055550040', '$2b$10$YourHashedPasswordHere', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hot%20Spot', false, (SELECT id FROM roles WHERE code = 'MERCHANT'), NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- ============================================================
-- MERCHANTS
-- ============================================================

INSERT INTO merchants (user_id, name, description, address, phone, status, created_at, updated_at) VALUES
((SELECT id FROM users WHERE email = 'merchant1@example.com'), 'Luigi''s Pasta House', 'Premium dining experience with authentic flavors', '123 Main St, Downtown District', '+17055550001', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant2@example.com'), 'Dragon Palace', 'Fast casual concept with quality ingredients', '456 Oak Ave, Shopping Mall', '+17055550002', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant3@example.com'), 'The Burger Joint', 'Cozy neighborhood spot perfect for gatherings', '789 Pine Rd, Business Park', '+17055550003', 'PENDING', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant4@example.com'), 'Coffee Corner', 'Family-friendly atmosphere with diverse menu', '321 Elm Street, Residential Area', '+17055550004', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant5@example.com'), 'Fine Steaks Co', 'Modern take on traditional cuisine', '654 Maple Lane, City Center', '+17055550005', 'REJECTED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant6@example.com'), 'Ocean''s Catch', 'Sustainable and locally-sourced ingredients', '987 Cedar Blvd, Waterfront', '+17055550006', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant7@example.com'), 'Fiesta Mexicana', 'Award-winning chef curated menu', '111 Oak Place, Old Town', '+17055550007', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant8@example.com'), 'Spice Route', 'Romantic setting ideal for special occasions', '222 Birch Way, New District', '+17055550008', 'PENDING', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant9@example.com'), 'The Grill Master', 'Casual dining with excellent service', '333 Walnut St, Tech Hub', '+17055550009', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant10@example.com'), 'Green Earth Cafe', 'Health-conscious nutritious options', '444 Spruce Lane, Market Square', '+17055550010', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant11@example.com'), 'Sweet Moments Bakery', 'Premium dining experience with authentic flavors', '123 Main St, Downtown District', '+17055550011', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant12@example.com'), 'Thai Orchid', 'Fast casual concept with quality ingredients', '456 Oak Ave, Shopping Mall', '+17055550012', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant13@example.com'), 'Sushi Symphony', 'Cozy neighborhood spot perfect for gatherings', '789 Pine Rd, Business Park', '+17055550013', 'PENDING', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant14@example.com'), 'Mediterranean Blue', 'Family-friendly atmosphere with diverse menu', '321 Elm Street, Residential Area', '+17055550014', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant15@example.com'), 'K-BBQ House', 'Modern take on traditional cuisine', '654 Maple Lane, City Center', '+17055550015', 'REJECTED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant16@example.com'), 'Pasta Express', 'Sustainable and locally-sourced ingredients', '987 Cedar Blvd, Waterfront', '+17055550016', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant17@example.com'), 'Asian Fusion HQ', 'Award-winning chef curated menu', '111 Oak Place, Old Town', '+17055550017', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant18@example.com'), 'Quick Bites', 'Romantic setting ideal for special occasions', '222 Birch Way, New District', '+17055550018', 'PENDING', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant19@example.com'), 'The Coffee Lab', 'Casual dining with excellent service', '333 Walnut St, Tech Hub', '+17055550019', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant20@example.com'), 'Prime Cuts', 'Health-conscious nutritious options', '444 Spruce Lane, Market Square', '+17055550020', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant21@example.com'), 'Sea Pearl', 'Premium dining experience with authentic flavors', '123 Main St, Downtown District', '+17055550021', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant22@example.com'), 'El Mariachi', 'Fast casual concept with quality ingredients', '456 Oak Ave, Shopping Mall', '+17055550022', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant23@example.com'), 'Curry Leaf', 'Cozy neighborhood spot perfect for gatherings', '789 Pine Rd, Business Park', '+17055550023', 'PENDING', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant24@example.com'), 'Steakholme', 'Family-friendly atmosphere with diverse menu', '321 Elm Street, Residential Area', '+17055550024', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant25@example.com'), 'Veggie Paradise', 'Modern take on traditional cuisine', '654 Maple Lane, City Center', '+17055550025', 'REJECTED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant26@example.com'), 'Bread & Co', 'Sustainable and locally-sourced ingredients', '987 Cedar Blvd, Waterfront', '+17055550026', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant27@example.com'), 'Bangkok Street', 'Award-winning chef curated menu', '111 Oak Place, Old Town', '+17055550027', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant28@example.com'), 'Maki Master', 'Romantic setting ideal for special occasions', '222 Birch Way, New District', '+17055550028', 'PENDING', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant29@example.com'), 'Greek Island', 'Casual dining with excellent service', '333 Walnut St, Tech Hub', '+17055550029', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant30@example.com'), 'Seoul Kitchen', 'Health-conscious nutritious options', '444 Spruce Lane, Market Square', '+17055550030', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant31@example.com'), 'Northern Rivers', 'Premium dining experience with authentic flavors', '123 Main St, Downtown District', '+17055550031', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant32@example.com'), 'Eastern Star', 'Fast casual concept with quality ingredients', '456 Oak Ave, Shopping Mall', '+17055550032', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant33@example.com'), 'Western Saloon', 'Cozy neighborhood spot perfect for gatherings', '789 Pine Rd, Business Park', '+17055550033', 'PENDING', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant34@example.com'), 'Southern Soul', 'Family-friendly atmosphere with diverse menu', '321 Elm Street, Residential Area', '+17055550034', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant35@example.com'), 'Central Hub', 'Modern take on traditional cuisine', '654 Maple Lane, City Center', '+17055550035', 'REJECTED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant36@example.com'), 'Urban Eats', 'Sustainable and locally-sourced ingredients', '987 Cedar Blvd, Waterfront', '+17055550036', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant37@example.com'), 'Farm to Table', 'Award-winning chef curated menu', '111 Oak Place, Old Town', '+17055550037', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant38@example.com'), 'Sweet Treats', 'Romantic setting ideal for special occasions', '222 Birch Way, New District', '+17055550038', 'PENDING', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant39@example.com'), 'Fresh Plates', 'Casual dining with excellent service', '333 Walnut St, Tech Hub', '+17055550039', 'APPROVED', NOW(), NOW()),
((SELECT id FROM users WHERE email = 'merchant40@example.com'), 'Hot Spot', 'Health-conscious nutritious options', '444 Spruce Lane, Market Square', '+17055550040', 'APPROVED', NOW(), NOW())
ON CONFLICT (user_id) DO NOTHING;

# Appointment-maker-api

This API provides functionalities for managing appointments efficiently, facilitating communication between admins and users. Below are the key routes and controllers along with example API responses:

## Routes and Controllers

### Admin Operations

#### 1. `POST /registeradmin`

   Register a new admin.

   **Example:**
   ```json
   Request:
   {
       "email": "admin@example.com",
       "name": "Admin Name",
       "password": "admin123",
       "shop": "My Shop"
   }

   Response:
   {
       "msg": "success",
       "token": "jwt_token_here"
   }
   ```

#### 2. `POST /adminlogin`

   Admin login.

   **Example:**
   ```json
   Request:
   {
       "email": "admin@example.com",
       "password": "admin123"
   }

   Response:
   {
       "msg": "success",
       "token": "jwt_token_here"
   }
   ```

#### 3. `POST /adminslot`

   Update admin's working slots.

   **Example:**
   ```json
   Request:
   {
       "name": "My Shop",
       "Object": {"Monday": "9AM-5PM", "Tuesday": "9AM-5PM", ...}
   }

   Response:
   {
       "msg": "Updated successfully"
   }
   ```

#### 4. `GET /getapp/:id`

   Get appointments for a specific admin.

   **Example:**
   ```json
   Response:
   {
       "app": [
           {"user": "user_id_1", "service": "Service 1", ...},
           {"user": "user_id_2", "service": "Service 2", ...},
           ...
       ]
   }
   ```

#### 5. `POST /setcomp`

   Set appointment as completed.

   **Example:**
   ```json
   Request:
   {
       "adminemail": "admin@example.com",
       "time": "14:00"
   }

   Response:
   {
       "msg": "Appointment marked as completed"
   }
   ```

#### 6. `GET /allapp/:id`

   Get all appointments for a specific admin.

   **Example:**
   ```json
   Response:
   {
       "appointments": [
           {"user": "user_id_1", "service": "Service 1", ...},
           {"user": "user_id_2", "service": "Service 2", ...},
           ...
       ]
   }
   ```

#### 7. `GET /getslot/:id`

   Get specific working slots for an admin.

   **Example:**
   ```json
   Response:
   {
       "slots": {"Monday": "9AM-5PM", "Tuesday": "9AM-5PM", ...}
   }
   ```

#### 8. `GET /shops`

   Get a list of all shops.

   **Example:**
   ```json
   Response:
   {
       "all": [
           {"shopName": "Shop 1", ...},
           {"shopName": "Shop 2", ...},
           ...
       ]
   }
   ```

#### 9. `GET /shops/:id`

   Get specific information about a shop.

   **Example:**
   ```json
   Response:
   {
       "shop": "Shop Name",
       "slots": {"Monday": "9AM-5PM", "Tuesday": "9AM-5PM", ...}
   }
   ```

### User Operations

#### 10. `POST /registeruser`

   Register a new user.

   **Example:**
   ```json
   Request:
   {
       "email": "user@example.com",
       "name": "User Name",
       "password": "user123"
   }

   Response:
   {
       "msg": "success",
       "token": "jwt_token_here"
   }
   ```

#### 11. `POST /userlogin`

   User login.

   **Example:**
   ```json
   Request:
   {
       "email": "user@example.com",
       "password": "user123"
   }

   Response:
   {
       "msg": "success",
       "token": "jwt_token_here"
   }
   ```

#### 12. `GET /shops`

   Get a list of all shops.

   **Example:**
   ```json
   Response:
   {
       "all": [
           {"shopName": "Shop 1", ...},
           {"shopName": "Shop 2", ...},
           ...
       ]
   }
   ```

#### 13. `GET /shops/:id`

   Get specific information about a shop.

   **Example:**
   ```json
   Response:
   {
       "shop": "Shop Name",
       "slots": {"Monday": "9AM-5PM", "Tuesday": "9AM-5PM", ...}
   }
   ```

#### 14. `POST /makeapp`

   Make a new appointment.

   **Example:**
   ```json
   Request:
   {
       "userid": "user_id",
       "name": "Shop Name",
       "service": "Service Name",
       "date": "2022-02-28",
       "day": "Monday",
       "time": "14:00",
       "msg": "Additional Message",
       "Object": {"custom_field_1": "value_1", "custom_field_2": "value_2"},
       "useremail": "user@example.com"
   }

   Response:
   {
       "msg": "Appointment created successfully"
   }
   ```

This documentation provides a comprehensive overview of the API routes and expected responses. Ensure that you handle errors and edge cases appropriately in your implementation.

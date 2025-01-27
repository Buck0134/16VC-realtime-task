# Real-Time Task Collaboration App

A real-time task collaboration app that allows users to:
- Add tasks to a shared list.
- Mark tasks as completed or incomplete.
- Delete tasks from the list.

This app uses **Socket.IO** for real-time updates, **React** for the frontend, and a **Node.js** backend with ExpressJS an SQLite database for data storage. The app is hosted with the backend on **Render** and the frontend on **Vercel**.

### **Deployed Application**
You can access the live app here:  
[Real-Time Task Collaboration App](https://16-vc-realtime-task-tau.vercel.app/)

### **Demo Link**
You can access the video demo here:  
[VIDEO DEMO](https://cmu.zoom.us/rec/share/RN4DPDP5cBRV0RyUcdDwoPdB8R3Q0C68exZPw1z_tjrMBbL7NepClsYVzIM5tnqn.TJSCNZrIZisMtNZV?startTime=1737935994000)
Passcode: #SN7Jjj&


## **Steps to Run and Test the Project**

### **1. Prerequisites**
- **Node.js**: Ensure you have Node.js installed (v18).
- **npm**: Comes with Node.js; used for dependency management.

---

### **2. Running Locally**

1. Clone the repository:
   ```bash
   git clone https://github.com/Buck0134/16VC-realtime-task
   cd realtime-task-app
   ```
2. Install dependencies for both backend and frontend:
   ```bash
   npm install
   ```
3. Start both backend and frontend servers simultaneously from root directory.
   ```bash
   npm start
   ```
4. Open your browser and visit:
    ```
    http://localhost:3000
    ```

### **3. Deployed Versions**

#### **Backend**
- Hosted on Render: Handles API requests and WebSocket connections.
- Base URL: `https://one6vc-realtime-task.onrender.com`

#### **Frontend**
- Hosted on Vercel: Accessible via the deployed link:
  [Real-Time Task Collaboration App](https://16-vc-realtime-task-tau.vercel.app/)

## **Solution and Thought Process**
The backend communicates with the frontend using RESTful APIs to handle CRUD operations and initiates WebSocket signals to notify the frontend of real-time updates. Data is stored in an SQLite database on the backend for simplicity and persistence. On the frontend, Material-UI (MUI) and TailwindCSS are used to create a clean, responsive, and modern design. The codebase has been designed with scalability and maintainability in mind, ensuring it can adapt to future enhancements easily.

## **Technical Choices**

### 1. **Efficient Real-Time Updates with Socket.IO**
- Instead of transmitting task data through WebSocket connections, the backend emits a `TASK_UPDATED` signal whenever a task is added, updated, or deleted. This approach ensures stability and security, as clients fetch the latest data directly via API calls after receiving the signal. It avoids the risks associated with transmitting large or sensitive data over WebSocket connections.

### 2. **Database Abstraction**
- A centralized database utility module (`databaseUtils.js`) handles all SQLite operations, including querying, inserting, updating, and deleting records. This abstraction reduces redundancy and makes the codebase **scalable** and easy to maintain as new features are introduced.

### 3. **SQLite for Lightweight Data Storage**
- SQLite is used for its simplicity and serverless nature, making it an ideal choice for this app. A schema validation mechanism is in place to ensure consistency in the database structure, even as the application evolves.

### 4. **Separation of Frontend and Backend**
- The backend handles database operations, API routes, and WebSocket communications, while the frontend focuses on delivering an intuitive user experience.

### 5. **Intuitive UI with Material-UI**
- Material-UI (MUI) was chosen for building a clean, modern, and responsive interface. The design adheres to Apple's UX design principles.


## **Technology Stack**

### **Frontend**
- **React**: UI framework for building the application.
- **Material-UI (MUI)**: For modern, responsive design.
- **Socket.IO Client**: Real-time communication with the backend.

### **Backend**
- **Node.js**: Backend runtime environment.
- **Express.js**: API server for handling requests.
- **Socket.IO**: Enables real-time bidirectional communication.
- **SQLite**: Lightweight database for persistent task storage.

### **Deployment**
- **Frontend**: Deployed on **Vercel**.
- **Backend**: Deployed on **Render**.

---
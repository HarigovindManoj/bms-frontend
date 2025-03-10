Book Management System - Frontend

Project Overview
This is the frontend of the Book Management System, built using React.js. It allows users to add, view, and manage books with features like sorting, pagination, and fetching additional details from an external API (Google Books API).

🛠️ Setup Instructions
         1.Clone the Repository
•	git clone  https://github.com/HarigovindManoj/Book-Management-System.git
•	cd book-management-frontend
        2. Install Dependencies
•	npm install
        3.Start the Development Server
•	npm start
  
📦 Required Dependencies
•	"axios": "^1.8.1",
•	"bootstrap": "^5.3.3",
•	"react": "^19.0.0",
•	"react-dom": "^19.0.0",
•	"react-router-dom": "^7.2.0"


 Book Management System Frontend
 bms-frontend/              # Root directory of the Book Management System frontend
│── node_modules/          
│── public/                # Public assets accessible in the app
│   ├── assets/            # Folder for static assets like images and icons
│── src/                   # Main source code of the application
│   ├── components/        # Contains UI components for the application
│   │   ├── BookForm/      # Book form component folder
│   │   ├── BookLayout/    # Layout-related components for books
│   │   ├── BookDetails.jsx # Displays details of a selected book
│   │   ├── BookList.jsx   # Displays the list of books
│   ├── services/          # Contains service files for API communication
│   │   ├── BookService.js # Handles API calls related to books
│   ├── App.css            # Styles for the main App component
│   ├── App.jsx            # Root React component
│   ├── index.css          # Global styles for the application
│   ├── main.jsx           # Main entry point of the React application
│── .gitattributes         
│── .gitignore             
│── eslint.config.js      
│── index.html             
│── package-lock.json      
│── package.json           # Project configuration and dependencies
│── README.md              


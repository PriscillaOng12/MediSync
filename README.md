# Medisync: Medication and Symptom Tracking Web Application

Medisync is a full-stack web application designed to help users manage their medications and track their symptoms effectively. This README provides an overview of the application, its features, and instructions for setup and usage.

<img width="1728" alt="Screenshot 2023-09-14 at 9 07 19 AM" src="https://github.com/SeychellesBB/MediSync-django-backend/assets/141508555/a6eef40a-64c2-4414-8af8-3fa4d4b9462c">

<img width="1728" alt="Screenshot 2023-09-13 at 8 05 09 PM" src="https://github.com/SeychellesBB/MediSync-django-backend/assets/141508555/80c56501-bb07-43cf-a211-1967f8cd3f80">

<img width="1728" alt="Screenshot 2023-09-14 at 8 52 28 AM" src="https://github.com/SeychellesBB/MediSync-django-backend/assets/141508555/3411bb07-7036-4e31-aec4-e97999145ed5">

<img width="1728" alt="Screenshot 2023-09-14 at 8 52 46 AM" src="https://github.com/SeychellesBB/MediSync-django-backend/assets/141508555/3376aea6-364e-440f-b28a-d43ebba9e776">

<img width="1725" alt="Screenshot 2023-09-13 at 7 59 30 PM" src="https://github.com/SeychellesBB/MediSync-django-backend/assets/141508555/58d89475-194e-4ae2-b569-07893a5c927a">

<img width="1728" alt="Screenshot 2023-09-14 at 8 37 02 AM" src="https://github.com/SeychellesBB/MediSync-django-backend/assets/141508555/77bfa442-f316-4b45-95f0-71e7ea947577">

<img width="1728" alt="Screenshot 2023-09-14 at 8 56 59 AM" src="https://github.com/SeychellesBB/MediSync-django-backend/assets/141508555/14a3ea8f-41e7-4e71-9595-4a272c487666">


## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
3. [Visit MediSync Website](#visit-medisync-website)
4. [Technologies Used](#technologies-used)
5. [Contributing](#contributing)
6. [License](#license)

## Features

Medisync offers a range of features to help users manage their medications and track their symptoms efficiently:

- **Medication Management:**
    - Users can input details about their medications, including name, dosage, frequency, and start/end dates.
    - Medication photos can be uploaded for easy identification.
    - Medication intake is tracked through checkboxes, with the ability to mark doses as taken.

- **Medication Reminders:**
    - Users receive automated reminders for medication schedules.
    - Reminders can be configured based on the frequency and dosage of medications.

- **Symptom Tracking:**
    - Users can report and track their symptoms.
    - A user-friendly form allows users to input symptom details, such as name, severity, and description.

- **Calendar Integration:**
    - Integration with Google Calendar allows users to manage appointments seamlessly.
    - Users can schedule medication doses and symptom tracking events, and these events sync with their Google Calendar.

- **Compliance Visualization:**
    - Users can visualize their medication compliance on a weekly and monthly basis.
    - Charts and graphs provide insights into medication adherence.

- **Medical ID Creation:**
    - Users have the option to create a medical ID with essential information.
    - This feature is useful in emergencies for providing medical details to healthcare providers.

## Getting Started

### Prerequisites

Before running Medisync, ensure you have the following prerequisites:

- Python: Medisync is built using Django, a Python web framework. You will need Python installed on your system.

- Node.js and npm: Medisync's frontend is developed using React.js. Node.js and npm are required for managing React dependencies.

- Database: Choose a database system compatible with Django, such as PostgreSQL, MySQL, or SQLite.

- Google Calendar API Credentials: To enable Google Calendar integration, you'll need to obtain API credentials from the Google Developer Console. Instructions: [https://developers.google.com/identity/sign-in/web/server-side-flow](url)

### Installation

Follow these steps to set up Medisync:

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/your-username/medisync.git
    cd medisync
    ```

2. **Backend Setup:**
   Source code for MediSynce backend is in a separate repository: [MediSync Backend Source Code](https://github.com/SeychellesBB/MediSync-django-backend)

    - Create a virtual environment and activate it:

        ```bash
        python -m venv venv
        source venv/bin/activate  # On Windows, use venv\Scripts\activate
        ```

    - Install Python dependencies:   

        ```bash
        pip install -r requirements.txt
        ```

    - Migrate the database:

        ```bash
        python manage.py migrate
        ```

    - Create a superuser account (an admin account) for managing the application:

        ```bash
        python manage.py createsuperuser
        ```

    - Start the Django development server:

        ```bash
        python manage.py runserver
        ```

4. **Frontend Setup:**

    - Navigate to the `frontend` directory:

        ```bash
        cd frontend
        ```

    - Install React dependencies:

        ```bash
        npm install
        ```

    - Start the React development server:

        ```bash
        npm start
        ```

5. **Google Calendar Integration:**

    - Follow the Google Calendar API documentation to obtain API credentials and configure them in the Django settings.

6. **Accessing the Application:**

    - Open a web browser and visit `http://localhost:3000` to access the Medisync application.

## Visit MediSync Website

MediSync is officially deployed on Netlify, visit us at [https://64f96929d31918358edfbd16--lambent-conkies-37745c.netlify.app/](url). 
MediSync is still currently under Google OAuth API verification process and as we have yet to complete the verification, 
MediSync has an OAuth user cap of 100 test users prior to verfication. 
If you are interested to be added to the test users list to synchronize your Google Calendar with MediSync or login with your Google account, 
please email me at priscilla.ong.chuhui@gmail.com

However, in then meantime, all users can register for a MediSync account through the website's user registration page. 
Google Calendar synchronization will not be allowed without being adding to the test user list.


## Technologies Used

Medisync is built using the following technologies:

- **Backend:**
    - Django: A Python web framework for building robust web applications.
    - Django REST framework: An extension for building APIs using Django.
    - PostgreSQL: A powerful, open-source relational database.

- **Frontend:**
    - React.js: A JavaScript library for building user interfaces.

- **External Services:**
    - Google Calendar API: Used for calendar integration.

## Contributing

Contributions to Medisync are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Open a pull request to the `main` branch of the original repository.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Thank you for using Medisync! We hope it helps users manage their medications and symptoms effectively.

const config = {
    backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

// Function to validate Firstname and Lastname
function validateName() {
    const fullnameInput = document.getElementById("fullname");
    const names = fullnameInput.value.trim().split(" ");
    const errorElement = document.getElementById("fullnameError");

    if (names.length !== 2) {
        errorElement.textContent = "Please enter both your Firstname and Lastname.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

// Function to validate Student ID
function validateStudentID() {
    const studentIDInput = document.getElementById("studentID");
    const studentIDPattern = /^\d{10}$/;
    const IDPattern = /^66\d{8}$/;
    const errorElement = document.getElementById("studentIDError");
    const errorSTU = document.getElementById("IDError");

    if (!studentIDPattern.test(studentIDInput.value)) {
        errorElement.textContent = "Please enter a 10-digit Student ID.";
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }

    if(!IDPattern.test(studentIDInput.value)) {
        errorSTU.textContent = "The number should begin with 66.";
    } else {
        errorSTU.textContent = ""; // Clear the error message when valid
    }
    return true;
}

// Function to validate University Email
function validateEmail() {
    const emailInput = document.getElementById("email");
    const emailPattern = /^.+@dome\.tu\.ac\.th$/;
    const errorElement = document.getElementById("emailError");

    if (!emailPattern.test(emailInput.value)) {
        errorElement.textContent =
            "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
        return false;
    } else {
        errorElement.textContent = ""; // Clear the error message when valid
    }
    return true;
}

function validateAcademicY() {
    const AcademicYInput = document.getElementById("academicYear").value;
    const errorElement = document.getElementById("YearError");

    if(AcademicYInput >= 2567) {
        errorElement.textContent = "This Year doesn't exist.";
        return false;
    } else {
        errorElement.textContent = "";
    }
    return true;
}

function validateDatetime() {
    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    const errorElement = document.getElementById("DateError");

    if (endDate <= startDate) {
        errorElement.textContent = "End datetime should be after the start datetime.";
        return false;
    } else {
        errorElement.textContent = "";
    }
    return true;
}

function validateSemester() {
    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);
    const inputDate = new Date('2024-01-1');
    const semester = document.getElementById("semester").value;
    const errorSemester = document.getElementById("SemesterError");

    if (endDate <= inputDate && startDate <= inputDate) {
        if (semester == 2) {
            errorSemester.textContent = "Semester not match with date time";
        }
        return false;
    } else {
        errorSemester.textContent = "";
    }

    if (endDate >= inputDate && startDate >= inputDate) {
        if (semester == 1) {
            errorSemester.textContent = "Semester not match with date time";
        }
        return false;
    } else {
        errorSemester.textContent = "";
    }
    return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
    validateName();
    validateStudentID();
    validateEmail();
    validateAcademicY();
    validateDatetime();
    validateSemester();
}

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
    try {
        const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch activity types.");
            return [];
        }
    } catch (error) {
        console.error("An error occurred while fetching activity types:", error);
        return [];
    }
}

async function fetchPassports() {
    try {
        const response = await fetch(`http://${window.location.hostname}:${port}/getPassports`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error("Failed to fetch activity types.");
            return [];
        }
    } catch (error) {
        console.error("An error occurred while fetching activity types:", error);
        return [];
    }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
    const activityTypeSelect = document.getElementById("activityType");

    for (const type of activityTypes) {
        const option = document.createElement("option");
        option.value = type.id;
        option.textContent = type.value;
        activityTypeSelect.appendChild(option);
    }
}

function populatePassports(Activity_Create) {
    const activityTypeSelect = document.getElementById("Activity_Create");

    for (const type of Activity_Create) {
        const div = document.createElement("div");
        div.classList.add("border");
        activityTypeSelect.appendChild(div);

        const div1 = document.createElement("div");
        div1.classList.add("div1");
        div.appendChild(div1);

        const div2 = document.createElement("div");
        div2.classList.add("div2");
        div.appendChild(div2);

        const div3 = document.createElement("div");
        div3.classList.add("div3");
        div.appendChild(div3);

        const header = document.createElement("h3");
        header.textContent = type.title;
        div1.appendChild(header);

        const description = document.createElement("p");
        description.textContent = type.description;
        div1.appendChild(description);

        const information = document.createElement("h3");
        information.textContent = "Activity information";
        div2.appendChild(information);

        const type_of_work_id = document.createElement("p");
        type_of_work_id.textContent = "Type of work: " + type.type_of_work_id;
        div2.appendChild(type_of_work_id);

        const academic_year = document.createElement("p");
        academic_year.textContent = "Academic year: " + type.academic_year;
        div2.appendChild(academic_year);

        const semester = document.createElement("p");
        semester.textContent = "Semester: " + type.semester;
        div2.appendChild(semester);

        const start_date = document.createElement("p");
        start_date.textContent = "Start date: " + type.start_date;
        div2.appendChild(start_date);

        const end_date = document.createElement("p");
        end_date.textContent = "End date: " + type.end_date;
        div2.appendChild(end_date);

        const location = document.createElement("p");
        location.textContent = "Location: " + type.location;
        div2.appendChild(location);

        const Made = document.createElement("h3");
        Made.textContent = "Made by";
        div3.appendChild(Made);

        const name = document.createElement("p");
        name.textContent = "Name: " + type.first_name + " " + type.last_name;
        div3.appendChild(name);

        const student_id = document.createElement("p");
        student_id.textContent = "Student id: " + type.student_id;
        div3.appendChild(student_id);

        const email = document.createElement("p");
        email.textContent = "Email: " + type.email;
        div3.appendChild(email);
    }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
    const activityTypes = await fetchActivityTypes();
    const Activity_Create = await fetchPassports();
    populateActivityTypes(activityTypes);
    populatePassports(Activity_Create);
});

// Function to submit the form
// Function to submit the form
async function submitForm(event) {
    event.preventDefault();

    // Validate form inputs before submission
    if (!validateName() || !validateStudentID() || !validateEmail() || !validateAcademicY() || !validateDatetime() || !validateSemester()) {
        return;
    }

    const startDateInput = document.getElementById("startDate").value;
    const endDateInput = document.getElementById("endDate").value;
    const startDate = new Date(startDateInput);
    const endDate = new Date(endDateInput);

    if (endDate <= startDate) {
        alert("End datetime should be after the start datetime.");
        return;
    }

    // Create the data object to send to the backend
    const formData = new FormData(event.target);
    const data = {
        first_name: formData.get("fullname").split(" ")[0],
        last_name: formData.get("fullname").split(" ")[1],
        student_id: parseInt(formData.get("studentID")),
        email: formData.get("email"),
        title: formData.get("workTitle"),
        type_of_work_id: parseInt(formData.get("activityType")),
        academic_year: parseInt(formData.get("academicYear")) - 543,
        semester: parseInt(formData.get("semester")),
        start_date: formData.get("startDate"),
        end_date: formData.get("endDate"),
        location: formData.get("location"),
        description: formData.get("description"),
    };

    console.log(data);

    try {
        // Send data to the backend using POST request
        const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const responseData = await response.json();
            console.log("Form data submitted successfully!");

            // Format JSON data for display
            const formattedData = Object.entries(responseData.data)
                .map(([key, value]) => `"${key}": "${value}"`)
                .join("\n");

            // Display success message with formatted data
            alert(responseData.message + "\n" + formattedData);

            document.getElementById("myForm").reset();
        } else {
            console.error("Failed to submit form data.");

            // Display error message
            alert("Failed to submit form data. Please try again.");
        }
    } catch (error) {
        console.error("An error occurred while submitting form data:", error);
    }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document.getElementById("studentID").addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);
document.getElementById("academicYear").addEventListener("input", validateAcademicY);
document.getElementById("startDate").addEventListener("input", validateDatetime);
document.getElementById("endDate").addEventListener("input", validateDatetime);
document.getElementById("semester").addEventListener("input", validateSemester);
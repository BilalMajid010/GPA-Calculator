const semesterSubjects = {
    1: ["Functional English(3 C.H)", "Applied Calculus(3 C.H)", "Applied Physics(3 C.H)", "Introduction to Info. & Comm. Technologies(2 C.H)", "Programming Fundamentals(3 C.H)", "Introduction to Info. & Comm. Technologies(Pr)(1 C.H)", "Programming Fundamentals(Pr)(1 C.H)"],
    2: ["Islamic Studies / Ethics(2 C.H)", "Linear Algebra & Analytical Geometry(3 C.H)", "Pakistan Studies(2 C.H)", "Object Oriented Programming(3 C.H)", "Professional Practices(3 C.H)", "Introduction to Software Engineering(3 C.H)", "Object Oriented Programming(Pr)(1 C.H)"],
    3: ["Software Economics & Management(3 C.H)", "Data Structures & Algorithms(3 C.H)", "Database Systems(3 C.H)", "Software Requirements Engineering(3 C.H)", "Operations Research(3 C.H)", "Data Structures & Algorithms(Pr)(1 C.H)", "Database Systems(Pr)(1 C.H)"],
    4: ["Introduction to Entrepreneurship & Creativity(3 C.H)", "Operating Systems(3 C.H)", "Computer Networks(3 C.H)", "Software Design & Architecture(2 C.H)", "Data Warehousing(3 C.H)", "Operating Systems(Pr)(1 C.H)", "Computer Networks(Pr)(1 C.H)", "Software Design & Architecture(Pr)(1 C.H)"],
    5: ["Communication & Presentation Skills(3 C.H)", "Statistics & Probability(3 C.H)", "Software Construction & Development(2 C.H)", "Information Security(3 C.H)", "Human Computer Interaction(3 C.H)", "Agent Based Intelligent Systems(3 C.H)", "Software Construction & Development(Pr)(1 C.H)"],
    6: ["Technical & business Writing(2 C.H)", "Software Project Management(3 C.H)", "Discrete Structures(3 C.H)", "Data Science & Analytics(3 C.H)", "Mobile Application Development(3 C.H)", "Software Project Management(Pr)(1 C.H)", "Data Science & Analytics(Pr)(1 C.H)", "Mobile Application Development(Pr)(1 C.H)"],
    7: ["Software Re-engineering(3 C.H)", "Multimedia Communication(3 C.H)", "Web Engineering(3 C.H)", "Formal Methods in Software Engineering(3 C.H)", "Thesis/Project(3 C.H)", "Multimedia Communication(Pr)(1 C.H)", "Web Engineering(Pr)(1 C.H)"],
    8: ["Simulation & Modeling(3 C.H)", "Cloud Computing(3 C.H)", "Software Quality Engineering(3 C.H)", "Thesis/Project(3 C.H)", "Cloud Computing(Pr)(1 C.H)", "Software Quality Engineering(Pr)(1 C.H)"]
};

let currentBatch = "";

function handleBatchChange(batch) {
    currentBatch = batch;
    document.getElementById('semester-form').style.display = 'none';
    document.getElementById('gpa-result').style.display = 'none';
}

function showSemester(semester) {
    if (semester) {
        document.getElementById('semester-title').innerText = `Semester ${semester}`;
        document.getElementById('semester-form').style.display = 'block';
        generateSubjectsForm(semester);
    } else {
        document.getElementById('semester-form').style.display = 'none';
    }
}

function generateSubjectsForm(semester) {
    const subjectsContainer = document.getElementById('subjects-container');
    subjectsContainer.innerHTML = '';

    const subjects = semesterSubjects[semester];
    subjects.forEach((subject, index) => {
        const subjectDiv = document.createElement('div');
        subjectDiv.classList.add('subject');

        const label = document.createElement('label');
        label.innerText = `${subject}:`;
        subjectDiv.appendChild(label);

        const select = document.createElement('select');
        select.name = `subject${index + 1}`;
        select.dataset.credits = getCreditsFromSubject(subject);

        if (currentBatch === "20-21") {
            select.innerHTML = `
                <option value="">Select Grade</option>
                <option value="4">A+</option>
                <option value="3.5">A</option>
                <option value="3">B+</option>
                <option value="2.5">B</option>
                <option value="2">C+</option>
                <option value="1">C</option>
                <option value="0">F</option>
            `;
        } else if (currentBatch === "22-onwards") {
            select.innerHTML = `
                <option value="">Select Grade</option>
                <option value="4">A+</option>
                <option value="3.5">A</option>
                <option value="3">B+</option>
                <option value="2.5">B</option>
                <option value="2">C+</option>
                <option value="1.5">C</option>
                <option value="1">C-</option>
                <option value="0">F</option>
            `;
        }

        subjectDiv.appendChild(select);
        subjectsContainer.appendChild(subjectDiv);
    });
}

function getCreditsFromSubject(subject) {
    const match = subject.match(/\((\d+)\s*C\.H\)/);
    return match ? parseInt(match[1], 10) : 0;
}

function calculateGPA() {
    const form = document.getElementById('grades-form');
    const formData = new FormData(form);

    let totalQualityPoints = 0;
    let totalCredits = 0;

    formData.forEach((value, key) => {
        if (value) {
            const select = form.querySelector(`[name="${key}"]`);
            const credits = parseInt(select.dataset.credits, 10);
            const gradePoints = parseFloat(value);
            totalQualityPoints += credits * gradePoints;
            totalCredits += credits;
        }
    });

    if (totalCredits > 0) {
        const gpa = totalQualityPoints / totalCredits;
        document.getElementById('gpa-value').innerText = gpa.toFixed(2);
        document.getElementById('gpa-result').style.display = 'block';
    } else {
        alert('Please enter grades for all subjects.');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchData();
});

function fetchData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => displayColleges(data))
        .catch(error => console.error('Error:', error));
}

function displayColleges(data) {
    const list = document.getElementById('list-container');
    list.innerHTML = ''; // Clear the 'Loading...' text

    data.forEach(college => {
        const collegeDiv = document.createElement('div');
        collegeDiv.classList.add('college-entry');

        // Container for college details
        const detailsDiv = document.createElement('div');
        detailsDiv.classList.add('college-details');

        // College name with arrow
        const collegeName = document.createElement('h3');
        collegeName.classList.add('college-name');
        const arrowSpan = document.createElement('span');
        arrowSpan.classList.add('college-arrow', 'down');
        collegeName.appendChild(arrowSpan);
        const collegeText = document.createTextNode(college.college);
        collegeName.appendChild(collegeText);

        // Death toll
        const deathToll = document.createElement('div');
        deathToll.classList.add('death-toll');
        deathToll.textContent = `Deaths: ${college.deaths}`;
        
        // Append college name and death toll to details container
        detailsDiv.appendChild(collegeName);
        detailsDiv.appendChild(deathToll);

        // Add click event to the details container
        detailsDiv.onclick = () => toggleStudents(college.students, collegeDiv);

        // Append details container to the college entry div
        collegeDiv.appendChild(detailsDiv);

        // Append the college entry div to the list container
        list.appendChild(collegeDiv);
    });
}

function toggleStudents(students, parentDiv) {
    let studentContainer = parentDiv.querySelector('.student-container');
    const isExpanded = parentDiv.getAttribute('data-expanded') === 'true';
    const arrow = parentDiv.querySelector('.college-arrow'); 
    
    if (isExpanded) {
        // Collapse the container and update the arrow direction
        parentDiv.removeChild(studentContainer);
        arrow.classList.remove('up');
        arrow.classList.add('down');
        parentDiv.setAttribute('data-expanded', 'false');
    } else {
        // Expand the container and update the arrow direction
        studentContainer = document.createElement('div');
        studentContainer.classList.add('student-container');

        students.forEach(student => {
            const studentDiv = document.createElement('div');
            studentDiv.classList.add('student-entry');
            
            // Student name with click event to toggle the display of the note
            const studentName = document.createElement('p');
            studentName.classList.add('student-name');
            studentName.textContent = `Name: ${student.name}`;
            studentDiv.appendChild(studentName);
            
            // Student note, hidden by default
            const studentNote = document.createElement('p');
            studentNote.classList.add('student-note');
            studentNote.textContent = `${student.note}`; // Prepend "Reason: " to the note text
            studentNote.style.display = 'none';
            studentDiv.appendChild(studentNote);
            
            studentContainer.appendChild(studentDiv);
            
            // Toggle the display of the note when the student name is clicked
            studentName.onclick = function() {
                const isNoteVisible = studentNote.style.display === 'block';
                studentNote.style.display = isNoteVisible ? 'none' : 'block';
                // Update the arrow direction based on the visibility of the note
                const arrow = studentName.querySelector('.arrow');
                if (arrow) {
                    arrow.classList.toggle('down', !isNoteVisible);
                    arrow.classList.toggle('up', isNoteVisible);
                }
            };
        });        

        parentDiv.appendChild(studentContainer);
        arrow.classList.remove('down');
        arrow.classList.add('up');
        parentDiv.setAttribute('data-expanded', 'true');
    }
}


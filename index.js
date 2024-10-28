const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

const studentData = [
  { studentName: 'John', rollNo: 201, science: 88, history: 75, geography: 90 },
  {
    studentName: 'Alice',
    rollNo: 202,
    science: 92,
    history: 85,
    geography: 88,
  },
  { studentName: 'Bob', rollNo: 203, science: 78, history: 89, geography: 91 },
];

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

//Exercise 1: Report Card Generation
function generateReportCard(rollNo) {
  let student = studentData.find((student) => student.rollNo === rollNo);
  console.log('===== Report Card for ' + student.studentName + ' ======');
  console.log('Roll No. : ' + student.rollNo);
  console.log('------');
  console.log('Marks:');
  console.log('------');
  console.log('science: ' + student.science);
  console.log('history: ' + student.history);
  console.log('geography: ' + student.geography);
  console.log('------ ------ ------');
}

generateReportCard(201);

//Exercise 2: Filter Students by Subject Marks
function filterStudentsByScienceCutoff(subject, cutoff) {
  let studentsAboveCutoff;
  if (subject === 'science') {
    studentsAboveCutoff = studentData.filter(
      (student) => student.science >= cutoff
    );
  } else if (subject === 'history') {
    studentsAboveCutoff = studentData.filter(
      (student) => student.history >= cutoff
    );
  } else {
    studentsAboveCutoff = studentData.filter(
      (student) => student.geography >= cutoff
    );
  }
  console.log(studentsAboveCutoff);
}

filterStudentsByScienceCutoff('science', 80);

//Exercise 3: Filter Students by Average Marks
function filterStudentsByAverageMarks(cutoff) {
  let studentsAboveCutoff = studentData.filter(
    (student) => calculateAverage(student) >= cutoff
  );
  for (i = 0; i < studentsAboveCutoff.length; i++) {
    console.log(
      studentsAboveCutoff[i].studentName +
        ' has average marks ' +
        calculateAverage(studentsAboveCutoff[i])
    );
  }
}

function calculateAverage(student) {
  let averageMarks =
    (student.science + student.geography + student.history) / 3;
  return averageMarks;
}

filterStudentsByAverageMarks(85);

//Exercise 4: Find Student with Highest Average Marks
function getStudentWithHighestAverageMarks() {
  let highestAverage = 0.0;
  let topStudent;

  for (i = 0; i < studentData.length; i++) {
    let averageMarks = calculateAverage(studentData[i]);
    if (averageMarks > highestAverage) {
      highestAverage = averageMarks;
      topStudent = studentData[i];
    }
  }
  console.log(
    topStudent.studentName +
      ' has the highest average marks of ' +
      highestAverage
  );
}

getStudentWithHighestAverageMarks();

//Exercise 5: Convert Hours to Minutes
function convertToMinutes(hours) {
  let minutes = hours * 60;
  console.log(hours + ' hours = ' + minutes + ' minutes');
}

convertToMinutes(2);

//Exercise 6: Count Occurrences of Character in String
function countOccurrences(string, character) {
  let charCount = 0;
  for (i = 0; i < string.length; i++) {
    if (string[i] === character) {
      charCount++;
    }
  }
  console.log("Character '" + character + "' repeats " + charCount + ' times');
}

countOccurrences('hello world', 'o');

//Exercise 7: Find the Sum of All Even Numbers in an Array
function sumOfEvenNumbers(numbers) {
  let sum = 0;
  for (i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
      sum = sum + numbers[i];
    }
  }
  console.log('The sum of all even numbers is ' + sum);
}

let numbers = [1, 2, 3, 4, 5, 6];
sumOfEvenNumbers(numbers);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

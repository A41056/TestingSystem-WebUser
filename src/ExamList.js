import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function ExamList() {
  const [exams, setExams] = useState([]);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async () => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage
      const response = await fetch(`${BASE_URL}/Exam/list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      });

      if (response.ok) {
        const examList = await response.json();
        setExams(examList.data);
      } else {
        console.error('Failed to fetch exams:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  return (
    <div className="container-fluid site-section">
      <div className="row">
        {exams.map((exam, index) => (
          <div key={exam.examId} className="col-md-6">
            <div className="card mb-4">
              <div className="card-body">
                <h5 className="card-title">{exam.title}</h5>
                <p className="card-text">Status: {exam.status}</p>
                <p className="card-text">Auto Grade: {exam.isAutoGrade ? 'Yes' : 'No'}</p>
                <p className="card-text">Created At: {exam.createdAt}</p>
                <p className="card-text">Modified At: {exam.modifiedAt}</p>
                <p className="card-text">Teacher: {exam.createdByUserId ? exam.createdByUserId : 'Unknown'}</p>
                <Link to={`/do-exam/${exam.examId}`} className="btn btn-primary">Attempt Exam</Link>
                <Link to={`/submission-detail/${exam.examId}`} className="btn btn-secondary">Submission Detail</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExamList;

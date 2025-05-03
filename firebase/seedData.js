import { db } from './config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const seedDummyData = async () => {
  try {
    // Add dummy jobs
    const jobs = [
      {
        title: "Software Engineer Intern",
        company: "TechCorp",
        location: "San Francisco, CA",
        description: "Looking for a motivated software engineering intern to work on our web applications. Must have experience with React and Node.js.",
        postedAt: serverTimestamp()
      },
      {
        title: "Data Science Intern",
        company: "DataAnalytics Inc",
        location: "New York, NY",
        description: "Join our data science team to work on machine learning models and data analysis projects. Python experience required.",
        postedAt: serverTimestamp()
      },
      {
        title: "Marketing Intern",
        company: "Digital Marketing Solutions",
        location: "Chicago, IL",
        description: "Help create and implement marketing campaigns. Great opportunity for marketing students.",
        postedAt: serverTimestamp()
      }
    ];

    // Add dummy applications
    const applications = [
      {
        jobId: "dummy-job-1",
        jobTitle: "Software Engineer Intern",
        applicantId: "dummy-user-1",
        applicantEmail: "student1@example.com",
        fullName: "John Doe",
        note: "I have experience with React and Node.js from my personal projects.",
        resumeURL: "https://example.com/resume1.pdf",
        status: "pending",
        appliedAt: serverTimestamp()
      },
      {
        jobId: "dummy-job-2",
        jobTitle: "Data Science Intern",
        applicantId: "dummy-user-2",
        applicantEmail: "student2@example.com",
        fullName: "Jane Smith",
        note: "I've completed several data science projects during my studies.",
        resumeURL: "https://example.com/resume2.pdf",
        status: "accepted",
        appliedAt: serverTimestamp()
      }
    ];

    // Add jobs to Firestore
    const jobRef = collection(db, "jobs");
    for (const job of jobs) {
      await addDoc(jobRef, job);
      console.log("Added job:", job.title);
    }

    // Add applications to Firestore
    const applicationRef = collection(db, "applications");
    for (const application of applications) {
      await addDoc(applicationRef, application);
      console.log("Added application for:", application.jobTitle);
    }

    console.log("Dummy data seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding dummy data:", error);
  }
};

export default seedDummyData; 
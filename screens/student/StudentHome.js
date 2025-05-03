import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Button, Card, FAB, useTheme } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';
import JobCard from '../../components/JobCard';

export default function StudentHome({ navigation }) {
  const [jobs, setJobs] = useState([]);
  const theme = useTheme();

  const fetchJobs = async () => {
    const jobCollection = collection(db, "jobs");
    const jobSnapshot = await getDocs(jobCollection);
    const jobList = jobSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setJobs(jobList);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text style={styles.heading} variant="headlineMedium">Welcome to HustleHub 🎓</Text>
          <Text style={styles.subtitle} variant="bodyLarge">Find your next opportunity</Text>
        </Card.Content>
      </Card>

      <Button
        mode="contained"
        icon="briefcase"
        style={styles.myApplicationsButton}
        onPress={() => navigation.navigate("MyApplications")}
      >
        My Applications
      </Button>

      <ScrollView style={styles.jobsList}>
        {jobs.map((job) => (
          <Card key={job.id} style={styles.jobCard}>
            <JobCard job={job} />
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => navigation.navigate("ApplyJob", { job })}
              >
                Apply Now
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>

      <FAB
        style={styles.fab}
        icon="refresh"
        onPress={fetchJobs}
        label="Refresh Jobs"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    marginBottom: 16,
    elevation: 4,
  },
  heading: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  myApplicationsButton: {
    marginBottom: 16,
  },
  jobsList: {
    flex: 1,
  },
  jobCard: {
    marginBottom: 16,
    elevation: 2,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
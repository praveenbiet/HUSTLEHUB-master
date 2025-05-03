import React from 'react';
import { StyleSheet } from 'react-native';
import { Text, Card, useTheme } from 'react-native-paper';

export default function JobCard({ job }) {
  const theme = useTheme();

  return (
    <Card.Content>
      <Text style={styles.title} variant="titleLarge">{job.title}</Text>
      <Text style={styles.company} variant="titleMedium">{job.company}</Text>
      <Text style={styles.location} variant="bodyMedium">
        📍 {job.location}
      </Text>
      <Text style={styles.description} variant="bodyMedium">
        {job.description}
      </Text>
      {job.salary && (
        <Text style={styles.salary} variant="bodyMedium">
          💰 {job.salary}
        </Text>
      )}
      {job.requirements && (
        <Text style={styles.requirements} variant="bodyMedium">
          📋 Requirements: {job.requirements}
        </Text>
      )}
    </Card.Content>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  company: {
    marginBottom: 8,
    opacity: 0.7,
  },
  location: {
    marginBottom: 8,
  },
  description: {
    marginBottom: 8,
    lineHeight: 20,
  },
  salary: {
    marginBottom: 8,
    color: '#4CAF50',
  },
  requirements: {
    marginBottom: 8,
    fontStyle: 'italic',
  },
});


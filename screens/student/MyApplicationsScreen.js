import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, List, useTheme, FAB } from 'react-native-paper';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../../firebase/config';

export default function MyApplicationsScreen() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const theme = useTheme();

  const fetchMyApplications = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(db, 'applications'),
        where("applicantId", "==", user.uid)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.uid) fetchMyApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return '#4CAF50';
      case 'rejected':
        return '#f44336';
      default:
        return '#FFA000';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'accepted':
        return 'check-circle';
      case 'rejected':
        return 'close-circle';
      default:
        return 'clock';
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.headerCard}>
        <Card.Content>
          <Text style={styles.header} variant="headlineMedium">My Applications</Text>
          <Text style={styles.subtitle} variant="bodyMedium">
            Track your job applications
          </Text>
        </Card.Content>
      </Card>

      {loading ? (
        <Text style={styles.loadingText}>Loading applications...</Text>
      ) : applications.length === 0 ? (
        <Card style={styles.emptyCard}>
          <Card.Content>
            <Text style={styles.emptyText} variant="bodyLarge">
              No applications found. Start applying to jobs!
            </Text>
          </Card.Content>
        </Card>
      ) : (
        <ScrollView style={styles.scrollView}>
          {applications.map((item) => (
            <Card key={item.id} style={styles.card}>
              <Card.Content>
                <Text style={styles.title} variant="titleLarge">
                  {item.jobTitle}
                </Text>
                <Text style={styles.email} variant="bodyMedium">
                  {item.applicantEmail}
                </Text>
                {item.note && (
                  <Text style={styles.note} variant="bodyMedium">
                    📝 {item.note}
                  </Text>
                )}
                <List.Item
                  title="Status"
                  description={item.status || "Pending"}
                  left={props => (
                    <List.Icon
                      {...props}
                      icon={getStatusIcon(item.status)}
                      color={getStatusColor(item.status)}
                    />
                  )}
                  style={styles.statusItem}
                />
              </Card.Content>
            </Card>
          ))}
        </ScrollView>
      )}

      <FAB
        style={styles.fab}
        icon="refresh"
        onPress={fetchMyApplications}
        label="Refresh"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerCard: {
    margin: 16,
    elevation: 4,
  },
  header: {
    marginBottom: 8,
  },
  subtitle: {
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  title: {
    marginBottom: 8,
  },
  email: {
    marginBottom: 8,
    opacity: 0.7,
  },
  note: {
    marginBottom: 16,
    fontStyle: 'italic',
  },
  statusItem: {
    paddingLeft: 0,
  },
  emptyCard: {
    margin: 16,
    elevation: 2,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.7,
  },
  loadingText: {
    textAlign: 'center',
    margin: 16,
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

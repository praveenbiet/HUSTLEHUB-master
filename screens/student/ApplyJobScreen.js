import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button, Card, ProgressBar, useTheme } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { auth, db, storage } from '../../firebase/config';

export default function ApplyJobScreen({ route, navigation }) {
  const { job } = route.params;
  const user = auth.currentUser;
  const theme = useTheme();

  const [fullName, setFullName] = useState('');
  const [note, setNote] = useState('');
  const [resumeURL, setResumeURL] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const pickResume = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: 'application/pdf' });

    if (result.type === 'success') {
      setUploading(true);
      const file = await fetch(result.uri).then(res => res.blob());
      const filename = `resumes/${user.uid}_${Date.now()}.pdf`;

      const storageRef = ref(storage, filename);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      setResumeURL(downloadURL);
      setUploading(false);
    }
  };

  const handleApply = async () => {
    if (!fullName) {
      alert("Name is required");
      return;
    }

    try {
      setSubmitting(true);
      await addDoc(collection(db, 'applications'), {
        jobId: job.id,
        jobTitle: job.title,
        applicantId: user.uid,
        applicantEmail: user.email,
        fullName,
        note,
        resumeURL,
        appliedAt: serverTimestamp()
      });

      alert("Application submitted successfully!");
      navigation.goBack();
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.header} variant="headlineMedium">
            Apply for {job.title}
          </Text>
          <Text style={styles.company} variant="titleMedium">
            {job.company}
          </Text>

          <TextInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Why are you a good fit? (Optional)"
            value={note}
            onChangeText={setNote}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={styles.input}
          />

          <Button
            mode="outlined"
            icon="file-upload"
            onPress={pickResume}
            style={styles.button}
            loading={uploading}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Resume (PDF)'}
          </Button>

          {resumeURL && (
            <Text style={styles.successText} variant="bodyMedium">
              ✅ Resume Uploaded Successfully
            </Text>
          )}

          <Button
            mode="contained"
            onPress={handleApply}
            style={styles.submitButton}
            loading={submitting}
            disabled={submitting || !resumeURL}
          >
            Submit Application
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: {
    elevation: 4,
  },
  header: {
    marginBottom: 8,
  },
  company: {
    marginBottom: 24,
    opacity: 0.7,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
  },
  submitButton: {
    marginTop: 8,
  },
  successText: {
    color: '#4CAF50',
    marginBottom: 16,
    textAlign: 'center',
  },
});


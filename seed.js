import seedDummyData from './firebase/seedData.js';

// Run the seeding function
seedDummyData()
  .then(() => {
    console.log('Seeding completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
  }); 
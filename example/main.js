import * as Y from '../src/index.js'

// Create two separate Yjs documents
const doc1 = new Y.Doc();
const doc2 = new Y.Doc();

// Simulate two users working with the same shared type
const sharedText1 = doc1.getText('sharedText');
const sharedText2 = doc2.getText('sharedText');

// Step 1: Both documents start with the same initial content
sharedText1.insert(0, 'Hello World!');

// Sync initial state from doc1 to doc2
const initialUpdate = Y.encodeStateAsUpdate(doc1);
Y.applyUpdate(doc2, initialUpdate);

// Step 2: Conflicting edits
// doc1 inserts 'User1-' at index 6 (between 'Hello ' and 'World!')
sharedText1.insert(6, 'Amogh');

// doc2 inserts 'User2-' at index 6 (between 'Hello ' and 'World!')
sharedText2.insert(6, 'Ishan');

// Generate updates after conflicting changes
const updateFromDoc1 = Y.encodeStateAsUpdate(doc1);

// Step 3: Apply conflicting updates
// Apply doc1's update to doc2 and vice versa
Y.applyUpdate(doc2, updateFromDoc1);

// Print the final content of both documents
console.log('Doc 1 content:', sharedText1.toString());
console.log('Doc 2 content:', sharedText2.toString()); // Both should now be consistent


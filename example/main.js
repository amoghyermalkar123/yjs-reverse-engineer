import * as Y from '../src/index.js'

// Create two separate Yjs documents
const doc1 = new Y.Doc();
const doc2 = new Y.Doc();

// Simulate two users working with the same shared type
const sharedText1 = doc1.getText('sharedText');
const sharedText2 = doc2.getText('sharedText');

// Step 1: Both documents start with the same initial content
sharedText1.insert(0, 'A');
sharedText1.insert(1, 'B');
sharedText1.insert(2, 'C');

// Sync initial state from doc1 to doc2
const initialUpdate = Y.encodeStateAsUpdate(doc1);
Y.applyUpdate(doc2, initialUpdate);

// Step 2: Conflicting edits
// doc1 inserts new shit
sharedText1.insert(1, 'L');

sharedText2.insert(1, 'K');

const updateFromDoc = Y.encodeStateAsUpdate(doc1);
Y.applyUpdate(doc2, updateFromDoc);


const updateFromDocc = Y.encodeStateAsUpdate(doc2);
Y.applyUpdate(doc1, updateFromDocc);

console.log('Doc 1 content:', sharedText1.toString());
console.log('Doc 2 content:', sharedText2.toString()); // Both should now be consistent


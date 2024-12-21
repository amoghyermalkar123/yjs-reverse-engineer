import * as Y from '../src/index.js'

const doc1 = new Y.Doc();

const sharedText1 = doc1.getText('sharedText');

sharedText1.insert(0, 'A');
sharedText1.insert(1, 'B');

// Dependencies

const express = require('express')
const admin = require('firebase-admin');

// Config
const app = express()

//config firebase
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

app.get('/posts', (request, response) => {
  let posts = []
  db.collection('posts').get().then(snapshot => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
      posts.push(doc.data())
    });
    response.send(posts)
  })
})

app.listen(process.env.PORT || 3000)



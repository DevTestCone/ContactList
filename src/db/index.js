import firebase from 'firebase'
import 'firebase/firestore'


  const config = {
    apiKey: 'AIzaSyDH9DfcK078EnG-ye6MKeXMGG75lXMCRNI',
    authDomain: 'vuefirstproject.firebaseapp.com',
    databaseURL: 'https://vuefirstproject.firebaseio.com',
    projectId: 'vuefirstproject',
    storageBucket: '',
    messagingSenderId: '116181711749'
  }
 const firebaseapp = firebase.initializeApp(config)

 export default firebaseapp.firestore()

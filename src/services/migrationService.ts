import { db } from '../firebase';
import { collection, getDocs, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Yeni veritabanı için ikinci bir Firestore instance oluşturuyoruz
const newApp = initializeApp(firebaseConfig, 'newDb');
const newDb = getFirestore(newApp, 'orhanlar');

export const migrateData = async () => {
  const collections = ['posts', 'contacts', 'gallery', 'settings'];
  const results: any = {};

  for (const colName of collections) {
    try {
      const oldCol = collection(db, colName);
      const oldDocs = await getDocs(oldCol);
      
      let count = 0;
      for (const oldDoc of oldDocs.docs) {
        if (colName === 'settings') {
          // Settings özel durum (tek bir döküman var)
          await setDoc(doc(newDb, colName, oldDoc.id), oldDoc.data());
        } else {
          await addDoc(collection(newDb, colName), oldDoc.data());
        }
        count++;
      }
      results[colName] = `${count} döküman taşındı.`;
    } catch (error) {
      results[colName] = `Hata: ${error}`;
    }
  }
  return results;
};

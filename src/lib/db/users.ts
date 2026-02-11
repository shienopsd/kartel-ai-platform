import { adminDb } from '../firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

const COLLECTION = 'users'

export async function saveUserEmail(data: {
  email: string
  productId: string
  productTitle: string
}) {
  const { email, productId, productTitle } = data

  // Check if user already exists
  const existingUser = await adminDb
    .collection(COLLECTION)
    .where('email', '==', email)
    .limit(1)
    .get()

  if (!existingUser.empty) {
    // Update existing user
    const userDoc = existingUser.docs[0]
    await userDoc.ref.update({
      last_download_date: FieldValue.serverTimestamp(),
      download_count: FieldValue.increment(1),
      downloads: FieldValue.arrayUnion({
        product_id: productId,
        product_title: productTitle,
        downloaded_at: new Date().toISOString(),
      }),
    })
    return { isNewUser: false, userId: userDoc.id }
  } else {
    // Create new user
    const newUser = await adminDb.collection(COLLECTION).add({
      email,
      first_download_date: FieldValue.serverTimestamp(),
      last_download_date: FieldValue.serverTimestamp(),
      download_count: 1,
      downloads: [{
        product_id: productId,
        product_title: productTitle,
        downloaded_at: new Date().toISOString(),
      }],
      created_at: FieldValue.serverTimestamp(),
    })
    return { isNewUser: true, userId: newUser.id }
  }
}

export async function getUserByEmail(email: string) {
  const snapshot = await adminDb
    .collection(COLLECTION)
    .where('email', '==', email)
    .limit(1)
    .get()

  if (snapshot.empty) {
    return null
  }

  return {
    id: snapshot.docs[0].id,
    ...snapshot.docs[0].data(),
  }
}

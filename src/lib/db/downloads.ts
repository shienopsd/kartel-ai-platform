import { adminDb } from '../firebase-admin'
import { FieldValue } from 'firebase-admin/firestore'

const COLLECTION = 'downloads'

export async function trackDownload(data: {
  productId: string
  userAgent?: string
  ipAddress?: string
}) {
  await adminDb.collection(COLLECTION).add({
    product_id: data.productId,
    downloaded_at: FieldValue.serverTimestamp(),
    user_agent: data.userAgent || null,
    ip_address: data.ipAddress || null,
    created_at: FieldValue.serverTimestamp(),
  })
}

export async function getProductDownloadCount(productId: string): Promise<number> {
  const snapshot = await adminDb
    .collection(COLLECTION)
    .where('product_id', '==', productId)
    .count()
    .get()

  return snapshot.data().count
}

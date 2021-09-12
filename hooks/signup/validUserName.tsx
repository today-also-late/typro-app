import { db } from "../../src/firebase/firebase";

export default async function validUserName(name: string): Promise<boolean> {
  let validFlag = true;

  const querySnapshot = await db.collectionGroup("userPublic").get();
  querySnapshot.forEach((docSnapShot) => {
    console.log(`${docSnapShot.id}: ${docSnapShot.data().username}`);
    if (docSnapShot.data().username === name) validFlag = false;
  });
  return validFlag;
}

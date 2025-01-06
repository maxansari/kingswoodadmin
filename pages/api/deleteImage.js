import crypto from "crypto";
import fetch from "node-fetch"; // Ensure node-fetch is installed
import { db } from "../../lib/firebaseConfig.js"; // Import Firebase Firestore config
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { publicId } = req.body;

    if (!publicId) {
      return res.status(400).json({ error: "Missing publicId" });
    }

    // Cloudinary credentials and signature generation
    const cloudinaryConfig = {
      cloudName: "dbpxayzin", // Cloudinary details
      apiKey: "374247116525274",
      apiSecret: "YnzIgBMDOju7wsB2urINwT-XJYA",
    };

    const timestamp = Math.round(Date.now() / 1000);
    const signatureString = `public_id=${publicId}&timestamp=${timestamp}${cloudinaryConfig.apiSecret}`;
    const signature = crypto
      .createHash("sha1")
      .update(signatureString)
      .digest("hex");

    try {
      // Step 1: Delete the image from Cloudinary
      const cloudinaryResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/destroy`,
        {
          method: "POST",
          body: JSON.stringify({
            public_id: publicId,
            api_key: cloudinaryConfig.apiKey,
            timestamp,
            signature,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const cloudinaryData = await cloudinaryResponse.json();

      if (cloudinaryData.result !== "ok") {
        throw new Error("Cloudinary image deletion failed");
      }

      // Step 2: Delete the image reference from Firestore
      const galleryRef = collection(db, "gallery");
      const q = query(
        galleryRef,
        where(
          "imageUrl",
          "==",
          `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/v${timestamp}/${publicId}`,
        ),
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        snapshot.forEach(async (docSnap) => {
          const docRef = doc(db, "gallery", docSnap.id);
          await deleteDoc(docRef);
          console.log(`Document with ID ${docSnap.id} deleted from Firestore`);
        });
      } else {
        console.log("No matching document found in Firestore");
      }

      return res.status(200).json({
        message: "Image deleted successfully from Cloudinary and Firestore",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error deleting image", details: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}

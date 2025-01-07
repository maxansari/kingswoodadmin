"use client";

import { useState, useEffect } from "react";
import Breadcrums from "@/components/Breadcrums";
import Button from "@/components/Button";
import Image from "next/image";
import { db } from "../../../../lib/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  doc,
  where,
} from "firebase/firestore";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";
import Options from "@/components/Options";


const Page = () => {
  const [file, setFile] = useState(null);
  const [slideshowImages, setSlideShowImages] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

const fetchSlideShowImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "slideshow"));
      const images = querySnapshot.docs.map((doc) => doc.data());
      setSlideShowImages(images);
      console.log(images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

    useEffect(() => {
    // Fetch gallery images from Firestore
    fetchSlideShowImages();
    }, []);




      // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };


  // Upload image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gallery"); // Replace with your Cloudinary upload preset

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dbpxayzin/image/upload", // Replace with your Cloudinary account details
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();
      if (data.secure_url && data.public_id) {
        return { image_url: data.secure_url, public_id: data.public_id };
      } else {
        throw new Error("Failed to upload to Cloudinary");
      }
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      throw error;
    }
  };


    // Save image URL to Firebase Firestore
  const saveToFirebase = async ({ image_url, public_id }) => {
    try {
      const docRef = await addDoc(collection(db, "slideshow"), {
        image_url: image_url,
        public_id: public_id,
        uploadedAt: new Date(),
      });
      console.log("Document written with ID:", docRef.id);
    } catch (error) {
      console.error("Error saving to Firebase:", error);
    }
  };

    // Handle image upload
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = await uploadToCloudinary(file); // Upload to Cloudinary
      await saveToFirebase(imageUrl); // Save URL to Firestore
      setSlideShowImages((prev) => [...prev, imageUrl]); // Add to local state
      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      setFile(null); // Clear the file input
    }
  };

    const deleteImageFromGallery = async (publicId) => {
    console.log("Deleting image with publicId:", publicId);
    try {
      const response = await fetch("/api/deleteImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ publicId }),
      });

      const data = await response.json();
      if (data.message) {
        await deleteImageFromFirestore(publicId); // Call Firestore deletion function
        console.log(
          "Image successfully deleted from Firestore and Cloudinary.",
        );
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Function to delete image from Firestore
  const deleteImageFromFirestore = async (publicId) => {
    try {
      // Initialize Firestore collection reference
      const slideshowRef = collection(db, "slideshow");

      // Query Firestore to find the image document by publicId
      const q = query(slideshowRef, where("public_id", "==", publicId));
      const snapshot = await getDocs(q);
      console.log("Snapshot:", snapshot);

      if (!snapshot.empty) {
        snapshot.forEach(async (docSnap) => {
          const docRef = doc(db, "slideshow", docSnap.id);
          await deleteDoc(docRef); // Delete the document from Firestore
          console.log(`Document with ID ${docSnap.id} deleted from Firestore`);
        });
      } else {
        console.log("No matching document found in Firestore");
      }
    } catch (error) {
      console.error("Error deleting image from Firestore:", error);
    }
  };



    return (
        <div>
         <div className="px-4 flex justify-between text-center text-xl py-4 border-b-[1px] border-gray-700">
        <h1>KingsWood Admin Console</h1>
        <Options />
      </div>
      <div className="flex justify-center mt-6">
        <Breadcrums
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Slideshow", href: "/dashboard/slideshow" },
          ]}
        />
      </div>
      <div className="flex w-[80%] mx-auto mt-4 flex-col">
        <h2 className="mt-10">Slidshow Uploads</h2>

        <div className="mt-4 max-w-[600px]">
                      <div className="flex flex-col gap-4 justify-between">
            <div className="w-[200px]">
              <input type="file" onChange={handleFileChange} />
            </div>
            <div>
              <Button
                variant={"contained"}
                onClick={handleUpload}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
          </div>

            <div className="mt-4 mb-10">
                <h3>All Slideshow</h3>

                <div className="flex flex-wrap gap-4 mt-4">

                    {slideshowImages.map((image, index) => (
                        <div key={index} className="relative w-[200px] h-[200px]">
                            <Image
                                src={image.image_url}
                                layout="fill"
                                objectFit="cover"
                            />
                            <div
                                onClick={() => {
                                    deleteImageFromFirestore(image.public_id);
                                }}
                                className="absolute top-0 right-0 p-2 bg-red-500 text-white cursor-pointer"
                            >
                                <MdDeleteForever size={24} />
                            </div>
                        </div>
                    ))}

                    </div>
                    </div>


        </div>
        </div>
    );
    }

    export default Page;
"use client";

import { useState, useEffect } from "react";
import Breadcrums from "@/components/Breadcrums";
import Button from "@/components/Button";
import Image from "next/image";
import { db } from "../../../../lib/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { TiDeleteOutline } from "react-icons/ti";
import { MdDeleteForever } from "react-icons/md";

const GalleryUploadsPage = () => {
  const [file, setFile] = useState(null);
  const [galleryImages, setGalleryImages] = useState([{}]);
  const [isUploading, setIsUploading] = useState(false);

  const fetchGalleryImages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "gallery"));
      const images = querySnapshot.docs.map((doc) => doc.data());
      setGalleryImages(images);
      console.log(images);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  useEffect(() => {
    // Fetch gallery images from Firestore
    fetchGalleryImages();
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
      const docRef = await addDoc(collection(db, "gallery"), {
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
      setGalleryImages((prev) => [...prev, imageUrl]); // Add to local state
      alert("Image uploaded successfully!");
    } catch (error) {
      alert("Failed to upload image.");
    } finally {
      setIsUploading(false);
      setFile(null); // Clear the file input
    }
  };

  //  // Delete image from Cloudinary and Firestore

  const deleteImageFromGallery = async (publicId) => {
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
        console.log("Image deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  return (
    <div>
      <div className="text-center text-xl py-4 border-b-[1px] border-gray-700">
        <h1>KingsWood Admin Console</h1>
      </div>
      <div className="flex justify-center mt-6">
        <Breadcrums
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Gallery", href: "/dashboard/gallery" },
          ]}
        />
      </div>
      <div className="flex w-[80%] mx-auto mt-4 flex-col">
        <h2 className="mt-10">Gallery Uploads</h2>

        <div className="mt-4">
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

          <div className="mt-4 mb-6">
            <div className="flex justify-center md:justify-start flex-wrap gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg transition-shadow hover:scale-105"
                >
                  <div className="absolute top-2 right-2 z-20  hover:cursor-pointer">
                    <MdDeleteForever
                      onClick={() => deleteImageFromGallery(image.public_id)}
                      className=" text-white font-semibold text-xl"
                    />
                  </div>
                  <Image
                    src={image.image_url}
                    alt={`Gallery image ${index + 1}`}
                    className="w-full h-full object-cover hover:opacity-45"
                    width={150} // Use width
                    height={150} // Use height
                  />
                </div>
              ))}
            </div>

            <div className="mt-4 flex justify-center">
              <Button variant={"contained"}>Load More</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryUploadsPage;

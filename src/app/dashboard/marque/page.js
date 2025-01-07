"use client";

import { useState, useEffect } from "react";
import Breadcrums from "@/components/Breadcrums";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { db } from "../../../../lib/firebaseConfig.js";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import Options from "@/components/Options";
import Select from "react-tailwindcss-select";
import withAuth from "@/components/withAuth";


const options = [
  { value: "red", label: "Red" },
  { value: "blue", label: "blue" },
  { value: "green", label: "green" },
  { value: "yellow", label: "yellow" },
  { value: "orange", label: "orange" },
];


const Page = () => {
  const [marqueText, setMarqueText] = useState("");
  const [marqueLink, setMarqueLink] = useState("");
  const [marque, setMarque] = useState([]);
  const [marqueColor, setMarqueColor] = useState("");

  const fetchMarques = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "marque"));
      const marque = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMarque(marque);
      console.log(marque);
    } catch (error) {
      console.error("Error fetching marque:", error);
    }
  };

  useEffect(() => {
    // Fetch marque from Firestore
    fetchMarques();
  }, []);

  const addMarque = async () => {
    try {
      const docRef = await addDoc(collection(db, "marque"), {
        marqueText: marqueText,
        marqueLink: marqueLink,
        marqueColor: marqueColor,
        marqueDate: new Date(),
      });
      console.log("Document written with ID: ", docRef.id);
      fetchMarques(); // Refresh the list after adding
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const removeMarque = async (id) => {
    try {
      await deleteDoc(doc(db, "marque", id));
      console.log("Document successfully deleted!");
      fetchMarques(); // Refresh the list after deletion
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  const handleSelect = (value) => {
    setMarqueColor(value);
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
            { label: "Marque", href: "/dashboard/marque" },
          ]}
        />
      </div>
      <div className="flex w-[80%] mx-auto mt-4 flex-col">
        <h2 className="mt-10">Marque</h2>

        <div className="mt-4 max-w-[600px]">
          <h3>Add Marque</h3>

          <form className="mt-4">
            <Input
              onChange={(e) => setMarqueText(e.target.value)}
              placeholder={"Marque Text"}
              type={"text"}
            />
            <Input
              onChange={(e) => setMarqueLink(e.target.value)}
              classNameContainer="mt-4"
              placeholder={"Marque Link"}
              type={"text"}
            />

            <div className="mt-4">
            <label className="text-white">Marque Color</label>
            <Select
              value={marqueColor}
              onChange={handleSelect}
              options={options}
            />
          </div>

            <Button
              variant="contained"
              className="mt-4 w-full flex justify-center"
              onClick={(e) => {
                e.preventDefault();
                addMarque();
              }}
            >
              Add Marque
            </Button>
          </form>

          <div className="mt-10">
            <h3 className="font-semibold">All Marques</h3>
            <ul className="mt-4">
              {marque.map((m) => (
                <li
                  className="ml-4 min-w-[200px] bg-slate-800 mb-4 p-4 rounded-md"
                  key={m.id}
                >
                  <p>{m.marqueText}</p>
                  <p className="text-blue-500 hover:underline hover:cursor-pointer hover:text-blue-400">
                    {m.marqueLink}
                  </p>
                  <p>{m.marqueDate?.toDate().toString()}</p>
                  <Button
                    onClick={() => removeMarque(m.id)}
                    variant="outlined"
                    className="mt-2 "
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withAuth(Page);

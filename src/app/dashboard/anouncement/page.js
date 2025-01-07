"use client";
import { useState,useEffect } from "react";
import Breadcrums from "@/components/Breadcrums";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { db } from "../../../../lib/firebaseConfig.js";
import { addDoc, collection,getDocs, deleteDoc,doc } from "firebase/firestore";
import Select from "react-tailwindcss-select";
import Options from "@/components/Options";
import withAuth from "@/components/withAuth";


const options = [
  { value: "New", label: "🎀 New" },
  { value: "Important", label: "📢 Important" },
];

const Page = () => {
  const [announcementText, setAnnouncementText] = useState("");
  const [announcementLink, setAnnouncementLink] = useState("");
  const [announcementType, setAnnouncementType] = useState([]);
  const [allAnnouncement, setAllAnnouncement] = useState([]);


  const fetchAnnouncement = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "announcements"));
        const announcement = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setAllAnnouncement(announcement);
        console.log(announcement);
    } catch (error) {
        console.error("Error fetching announcement:", error);
    }
    };

    useEffect(() => {
        // Fetch announcement from Firestore
        fetchAnnouncement();
    }, []);



  const handleSelect = (value) => {
    setAnnouncementType(value);
  };

  const addAnnouncement = async () => {
    try {
      await addDoc(collection(db, "announcements"), {
        announcementText,
        announcementLink,
        announcementType,
        announcementDate: new Date(),
      });
      console.log("Announcement added successfully!");
    } catch (error) {
      console.error("Error adding announcement:", error);
    }
  };

  const removeAnnouncement = async (id) => {
    try {
      await deleteDoc(doc(db, "announcements", id));
      console.log("Document successfully deleted!");
      fetchAnnouncement(); // Refresh the list after deletion
    } catch (e) {
      console.error("Error removing document: ", e);
    }

};

  return (
    <>
       <div className="px-4 flex justify-between text-center text-xl py-4 border-b-[1px] border-gray-700">
        <h1>KingsWood Admin Console</h1>
        <Options />
      </div>
      <div className="flex justify-center mt-6">
        <Breadcrums
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Announcement", href: "/dashboard/announcement" },
          ]}
        />
      </div>
      <div className="flex w-[80%] mx-auto mt-4 flex-col">
        <h2 className="mt-10">Add Announcement</h2>

        <form className="mt-4 max-w-[600px]">
          <Input
            onChange={(e) => setAnnouncementText(e.target.value)}
            placeholder={"Announcement Text"}
            type={"text"}
          />
          <Input
            onChange={(e) => setAnnouncementLink(e.target.value)}
            classNameContainer="mt-4"
            placeholder={"Announcement Link"}
            type={"text"}
          />

          <div className="mt-4">
            <label className="text-white">Announcement Type</label>
            <Select
              isMultiple={true}
              value={announcementType}
              onChange={handleSelect}
              options={options}
            />
          </div>

          <Button
            variant="contained"
            className="mt-4 w-full flex justify-center"
            onClick={(e) => {
              e.preventDefault();
              addAnnouncement();
            }}
          >
            Add Announcement
          </Button>
        </form>

            <div className="mt-4">
                <h3>All Anoucement</h3>


                <div className="mt-4">
                    {allAnnouncement.length!==0?allAnnouncement.map((announcement) => (
                        <div key={announcement.id} className="mb-4 max-w-[600px] border-[1px] bg-slate-800 hover:bg-slate-700 rounded-md border-gray-700 p-4 mt-2">
                            <h4>{announcement.announcementText}</h4>
                            <p className="text-white hover:underline">{announcement.announcementLink}</p>
                            <div className="flex justify-between items-end">
                            <div>{announcement.announcementType.map(d=><div className="max-w-[200px] bg-blue-500 text-black border-2 border-blue-700 rounded-md p-2 mt-2">{d.label}</div>)}</div>
                                <Button 
                                onClick={()=>removeAnnouncement(announcement.id)}
                                variant="contained" 
                                className="mt-4 flex justify-center"
                                >
                                    Delete
                                </Button>
                            </div>
                        </div>
                    )):<></>}
                
                </div>

                </div>

      </div>
    </>
  );
};

export default withAuth(Page);
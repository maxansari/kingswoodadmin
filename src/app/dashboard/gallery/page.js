import Breadcrums from "@/components/Breadcrums";
import Button from "@/components/Button";

const GalleryUploadsPage = () => {
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
              <input type="file" />
            </div>
            <div>
              <Button variant={"contained"}>Upload</Button>
            </div>
          </div>

          <div className="mt-4 mb-6">
            <div className="flex justify-center md:justify-start flex-wrap gap-4">
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] bg-gray-800 rounded-lg"
                  ></div>
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

import { useEffect, useState } from "react";
import PostPopupIcon from "../components/ui/PostPopupIcon";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closePostPopup } from "../redux/commonSlice";
import BlueButton from "../components/ui/BlueButton";
import axiosInstance from "../utilities/axiosInstance";
import axiosErrorManager from "../utilities/axiosErrorManager";

function PostPopup(): JSX.Element {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl,setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>("");

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      // const fileURL = URL.createObjectURL(file);
      setFileUrl(URL.createObjectURL(file));
      console.log(file,"og")

      if (file.type.startsWith("image/")) {
        setFileType("image");
      } else if (file.type.startsWith("video/")) {
        setFileType("video");
      } else {
        setFileType(null);
        alert("Only images and videos are supported!");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleUploadClick = (): void => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*,video/*";
    fileInput.onchange = (event) => handleFileChange(event as unknown as React.ChangeEvent<HTMLInputElement>);
    fileInput.click();
  };

  const handlePostUpload = async (): Promise<void> => {
    console.log(selectedFile);
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("caption", caption);  
      const response =await axiosInstance.post("user/post/post_one_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
        setIsUploading(false);
    } catch (error) {
      console.log(axiosErrorManager(error));
        setIsUploading(false);
    }
    finally{
      setCaption("")
      setSelectedFile(null);
    }
    
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-auto overflow-hidden h-auto rounded-2xl relative">
        <button
          onClick={() => dispatch(closePostPopup())}
          className="absolute right-1 top-3 text-white"
        >
          <IoMdClose />
        </button>
        <div className="bg-black w-[430px] h-[50px] flex justify-center items-center">
          <p className="text-white text-sm font-semibold">Create new post</p>
        </div>
        {/* Second section */}
        <div className="bg-[#262626] flex overflow-hidden items-center w-[700px] h-[400px] ">
          {selectedFile ? (
            <>
              {fileType === "image" ? (
                <img
                  src={fileUrl}
                  alt="Selected"
                  className="w-1/2 h-full object-contain"
                />
              ) : (
                <video
                  src={fileUrl}
                  controls
                  className="w-1/2 h-full object-contail"
                />
              )}
              <div className="w-1/2 h-full flex flex-col justify-between p-10 items-center">
              <textarea
                placeholder="Write a caption (optional)..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full h-[70%] bg-[#121212] text-white text-sm p-2 rounded-lg border border-gray-700 focus:outline-none"
              />
              <BlueButton
                styles="text-xs font-semibold w-full py-2"
                text="Upload Post"
                loading={isUploading}
                loadingText="Uploading..."
                onClick={handlePostUpload}
              />
              </div>
            </>
          ) : (
            <>
              <PostPopupIcon />
              <p className="text-white text-lg font-medium">
                Choose photos and videos here
              </p>
              <BlueButton
                styles="font-semibold py-2 px-4 text-xs"
                text="Select File"
                loading={false}
                loadingText="Loading..."
                onClick={handleUploadClick}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PostPopup;

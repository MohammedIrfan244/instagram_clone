import { useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch } from "react-redux";
import { closeCretePopup, closeStoryPopup } from "../redux/commonSlice";
import BlueButton from "../components/ui/BlueButton";
import axiosInstance from "../utilities/axiosInstance";
import axiosErrorManager from "../utilities/axiosErrorManager";

function StoryPopup(): JSX.Element {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [fileType, setFileType] = useState<"image" | "video" | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];
    if (file) {
      setFileUrl(URL.createObjectURL(file));
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

  const handleStoryPost = async (): Promise<void> => {
    if (!selectedFile) {
      alert("No file selected!");
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axiosInstance.post("user/story/post_one_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data);
      dispatch(closeStoryPopup());
      setSelectedFile(null);
      setFileUrl("");
    } catch (error) {
      console.error(axiosErrorManager(error));
      alert("Failed to post the story. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen bg-black bg-opacity-50 z-50">
      <div className="bg-[#262626] rounded-2xl relative max-h-[80vh] max-w-[60vw] w-auto overflow-hidden flex flex-col">
        <button
          onClick={() => {dispatch(closeStoryPopup()); dispatch(closeCretePopup())}}
          className="absolute right-3 top-3 text-white z-10"
        >
          <IoMdClose />
        </button>
        
        <div className="bg-black w-full h-[50px] flex justify-center items-center">
          <p className="text-white text-sm font-semibold">Create new story</p>
        </div>

        <div className="flex-1 overflow-auto">
          {selectedFile ? (
            <div className="flex flex-col pb-2 items-center gap-4">
              {fileType === "image" ? (
                <img
                  src={fileUrl}
                  alt="Selected"
                  className="max-w-full max-h-[60vh] object-contain"
                />
              ) : (
                <video
                  src={fileUrl}
                  controls
                  className="max-w-full max-h-[60vh] object-contain"
                />
              )}
              <div className="w-full max-w-md px-4">
                <BlueButton
                  styles="text-xs font-semibold w-full py-2"
                  text="Post Story"
                  loading={isUploading}
                  onClick={handleStoryPost}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-8 min-h-[200px] justify-center">
              <p className="text-white text-lg font-medium">
                Choose photos and videos here
              </p>
              <BlueButton
                styles="font-semibold py-2 px-4 text-xs"
                text="Select File"
                loading={false}
                onClick={handleUploadClick}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StoryPopup;
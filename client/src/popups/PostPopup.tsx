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
  const [fileUrl, setFileUrl] = useState<string>("");
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

  const handlePostUpload = async (): Promise<void> => {
    if (!selectedFile) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("caption", caption);
       await axiosInstance.post("user/post/post_one_file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsUploading(false);
    } catch (error) {
      console.log(axiosErrorManager(error));
      setIsUploading(false);
    } finally {
      setCaption("");
      setSelectedFile(null);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-screen bg-black bg-opacity-50 z-50 p-4">
      <div className="bg-[#262626] rounded-2xl relative max-h-[80vh] w-auto overflow-hidden flex flex-col lg:max-w-[60vw]">
        <button
          onClick={() => dispatch(closePostPopup())}
          className="absolute right-3 top-3 text-white z-10"
        >
          <IoMdClose />
        </button>

        <div className="bg-black w-full h-[50px] flex justify-center items-center">
          <p className="text-white text-sm font-semibold">Create new post</p>
        </div>

        <div className="flex-1 overflow-auto">
          {selectedFile ? (
            <div className="flex flex-col lg:flex-row lg:justify-center">
              <div className="flex items-center justify-center bg-black">
                {fileType === "image" ? (
                  <img
                    src={fileUrl}
                    alt="Selected"
                    className="max-h-[60vh] w-auto object-contain"
                  />
                ) : (
                  <video
                    src={fileUrl}
                    controls
                    className="max-h-[60vh] w-auto object-contain"
                  />
                )}
              </div>
              <div className="w-full lg:w-1/2 p-4 lg:p-6 flex flex-col justify-between gap-4">
                <textarea
                  placeholder="Write a caption (optional)..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-[#121212] text-white text-sm p-2 rounded-lg border border-gray-700 focus:outline-none min-h-[100px]"
                />
                <BlueButton
                  styles="text-xs font-semibold w-full py-2"
                  text="Upload Post"
                  loading={isUploading}
                  onClick={handlePostUpload}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 p-8 min-h-[200px] justify-center">
              <PostPopupIcon />
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

export default PostPopup;
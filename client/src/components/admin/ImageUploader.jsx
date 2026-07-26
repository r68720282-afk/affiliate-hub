import { useRef, useState } from "react";
import axios from "axios";

export default function ImageUploader({
  value = "",
  onChange
}) {

  const fileInput = useRef(null);

  const [preview, setPreview] = useState(value);

  const [uploading, setUploading] = useState(false);

  async function uploadFile(file) {

    if (!file) return;

    const formData = new FormData();

    formData.append("image", file);

    try {

      setUploading(true);

      const { data } = await axios.post(
        "/api/upload",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data"
          }
        }
      );

      setPreview(data.url);

      onChange(data.url);

    } catch (err) {

      console.error(err);

      alert(
        err?.response?.data?.message ||
        "Upload failed."
      );

    } finally {

      setUploading(false);

    }

  }

  function chooseFile() {

    fileInput.current.click();

  }

  function removeImage() {

    setPreview("");

    onChange("");

  }

  return (

    <div className="imageUploader">

      <input
        ref={fileInput}
        type="file"
        accept="image/*"
        hidden
        onChange={(e)=>
          uploadFile(
            e.target.files[0]
          )
        }
      />

      {preview ? (

        <div className="previewBox">

          <img
            src={preview}
            alt="preview"
          />

          <button
            type="button"
            onClick={removeImage}
          >

            Remove

          </button>

        </div>

      ) : (

        <button
          type="button"
          onClick={chooseFile}
          disabled={uploading}
        >

          {uploading
            ? "Uploading..."
            : "Select Image"}

        </button>

      )}

    </div>

  );

}

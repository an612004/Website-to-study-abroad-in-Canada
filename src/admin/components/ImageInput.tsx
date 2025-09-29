import React, { ChangeEvent, useEffect, useState } from 'react';

const ImageInput = ({
  onImage,
  lable,
  defaultSrc,
}: {
  onImage: (image: any) => void;
  lable: string;
  defaultSrc?: string;
}) => {
  const [thumbnailImage, setImageSrc] = useState<string | ArrayBuffer | null>(
    null
  );

  useEffect(() => {
    if (defaultSrc) setImageSrc(defaultSrc);
  }, [defaultSrc]);

  const onInputImage = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files?.[0];
      if (file) {
        if (onImage) onImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }
  };
  return (
    <div className="flex gap-4">
      <div>
        <div className="block text-lg font-medium text-gray-800 mb-1">
          {lable}
        </div>
        <div className="rounded-md border border-indigo-500 bg-gray-50 p-1 shadow-md w-24">
          <label
            htmlFor="upload"
            className="flex flex-col items-center gap-1 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 fill-white stroke-indigo-500"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span className="text-gray-600 text-sm">Upload file</span>
          </label>
          <input
            id="upload"
            type="file"
            className="hidden"
            onChange={onInputImage}
          />
        </div>
      </div>
      {thumbnailImage && (
        <img src={thumbnailImage.toString()} alt="" className="h-28" />
      )}
    </div>
  );
};

ImageInput.propTypes = {};

export default ImageInput;

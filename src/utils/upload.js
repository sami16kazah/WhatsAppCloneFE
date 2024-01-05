import axios from 'axios';

const cloudSecret = process.env.REACT_APP_CLOUDE_SECRET;
const cloudName = process.env.REACT_APP_CLOUDE_NAME;

export const UploadFiles = async (files) => {
  let formData = new FormData();
  formData.append('upload_preset', cloudSecret); // Replace with actual preset name
  let uploaded = [];
  for (const f of files) {
    const { file, type } = f;
    formData.append('file', file);
    let res = await uploadToCloudainery(formData, type);
    uploaded.push({ file: res, type: type });
    console.log(res);
  }

  return uploaded;
};

const uploadToCloudainery = async (formData, type) => {
  return new Promise(async (resolve) => {
    return await axios
      .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, formData)
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

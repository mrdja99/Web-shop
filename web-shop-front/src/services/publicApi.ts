export const UploadImage = async (imageSelected: any): Promise<string | null> => {
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "tnzfsbju");

    let imageUrl;

    await fetch("https://api.cloudinary.com/v1_1/dosbawfen/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const {url} = data;
        imageUrl = url;
      })
      .catch((error) => {
        console.log(error);
      });
    
    if (imageUrl) {
      return imageUrl;
    }

    return null;
  };
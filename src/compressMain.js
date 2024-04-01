import React, { useState } from "react";
import { Button, Container, Image } from "semantic-ui-react";
import imageCompression from "browser-image-compression";

function Main() {
  const [image, setImage] = useState("");
  const [compressedImage, setCompressedImage] = useState("");
  const [pressed, setPressed] = useState(false);
  const [ans, setAns] = useState("");

  const handleImage = (event) => {
    setImage(event.target.files[0]);
    var options = {
      maxSizeMB: 3,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
    };

    imageCompression(event.target.files[0], options)
      .then((compressedImage) => {
        setCompressedImage(URL.createObjectURL(compressedImage));
        setAns(compressedImage);
      })
      .catch((error) => {
        console.log(error);
      });
      setPressed("")
  };

  const handleDownload = () => {
    const downloadLink = document.createElement("a");
    downloadLink.href = compressedImage;
    downloadLink.download = ans.name.replace(/\.[^.]+$/, "") + "_compressed_image.jpg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
    <br></br>
      <Container>
        <h1>Please Upload your image here:</h1>
        <input type="file" accept="image/*" onChange={handleImage} />
      </Container>
      <br></br>
      <br></br>
      <Container textAlign="center">
        {image && (
          <div>
            <Image style={{ maxWidth: "100%", height: "auto" }} src={URL.createObjectURL(image)} alt="Original" />
            <h2>Size: {Math.round(image.size / 1000)} KB</h2>
          </div>
        )}
      </Container>
      <br></br>
      <br></br>
      <Container textAlign="center">
        {image && !pressed && (
          <Button primary size="large" onClick={() => setPressed(true)}>
            COMPRESS
          </Button>
        )}
      </Container>
      <Container textAlign="center">
        {pressed && (
          <div>
            <Image style={{ maxWidth: "100%", height: "auto" }} src={compressedImage} alt="Compressed" />
            <h2>Size: {Math.round(ans.size / 1000)} KB</h2>
            <Button color="green" size="huge" onClick={handleDownload}>
              Download
            </Button>
          </div>
        )}
      </Container>
    </>
  );
}

export default Main;

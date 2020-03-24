import React, { useState } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Waypoint } from "react-waypoint";
import "./App.css";
import { HeroImage, Image, Video, myTheme } from "bose-ui";

const App: React.FC = () => {
  const [playVideo, updatePlayState] = useState(false);
  const handleEnterViewport = () => { 
    console.log('here');
       
    updatePlayState(true);
  };
  const handleExitViewport = () => {
    updatePlayState(false);
  };

  const storyPanelHtml = () => {
    return (
      <React.Fragment>
        <h1>Your workouts. Made wireless.</h1>
        <h2>SoundSport wireless headphones</h2>
        <h3>Something Gone</h3>
        <Button variant="contained" color="primary">
          Shop
        </Button>
      </React.Fragment>
    );
  };

  return (
    <ThemeProvider theme={myTheme}>
      <div className="App">
        <div>
          <HeroImage storyPanel={storyPanelHtml()}>
            <Image
              src="https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1920.1920.jpeg"
              srcSet={[
                {
                  size: "320px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.320.320.jpeg"
                },
                {
                  size: "600px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.600.600.jpeg"
                },
                {
                  size: "1000px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1000.1000.jpeg"
                },
                {
                  size: "1280px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"
                },
                {
                  size: "1920px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1920.1920.jpeg"
                }
              ]}
              alt="Sound TOuch bar"
            />
          </HeroImage>
        </div>
        <div>
          <HeroImage storyPanel={storyPanelHtml()} align="right">
            <Image
              src="https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1920.1920.jpeg"
              srcSet={[
                {
                  size: "320px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.320.320.jpeg"
                },
                {
                  size: "600px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.600.600.jpeg"
                },
                {
                  size: "1000px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1000.1000.jpeg"
                },
                {
                  size: "1280px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"
                },
                {
                  size: "1920px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1920.1920.jpeg"
                }
              ]}
              alt="Sound TOuch bar"
            />
          </HeroImage>
        </div>
        <div>
          <HeroImage storyPanel={storyPanelHtml()}>
            <Image
              src="https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1920.1920.jpeg"
              srcSet={[
                {
                  size: "320px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.320.320.jpeg"
                },
                {
                  size: "600px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.600.600.jpeg"
                },
                {
                  size: "1000px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1000.1000.jpeg"
                },
                {
                  size: "1280px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1280.1280.jpeg"
                },
                {
                  size: "1920px",
                  url:
                    "https://assets.bose.com/content/dam/Bose_DAM/Web/consumer_electronics/target/homepage/panels/2-5x1/product_affinity/soundsport_wireless_black_v1.psd/jcr:content/renditions/cq5dam.web.1920.1920.jpeg"
                }
              ]}
              alt="Sound TOuch bar"
            />
          </HeroImage>
        </div>
        <div>
          <Waypoint onEnter={handleEnterViewport} onLeave={handleExitViewport}>
            <div>
              <Video
                shouldPlay={playVideo}
                src="https://www.tesla.com/ns_videos/accessories-hero-desktop.mp4"
              >
                <Button variant="contained" color="primary">
                  Shop
                </Button>
              </Video>
            </div>
          </Waypoint>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default App;

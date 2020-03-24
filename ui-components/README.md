# bose-ui

> &quot;Bose UI Component Library&quot;

[![NPM](https://img.shields.io/npm/v/bose-ui.svg)](https://www.npmjs.com/package/bose-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save bose-ui-components
```

## Usage

```tsx
import * as React from 'react'

import {HeroImage, Image} from 'bose-ui-components'

class App extends React.Component {
  render () {
    return (
      <HeroImage>
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
    )
  }
}
```

## License

MIT © [](https://github.com/)

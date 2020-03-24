import React, { Component } from 'react'
import PropTypes from 'prop-types'
import style from './Image.module.scss'

interface Props {
    src: string,
    alt?: string,
    srcSet?: any
}

class Image extends Component<Props> {
    
    static propTypes = {
        src: PropTypes.string.isRequired,
        alt: PropTypes.string,
        srcSet: PropTypes.array
    }

    static defaultProps = {
        alt: ''
    }
    

    render() {
        return (
            <picture className={style.HeroImage}>
              {this.props.srcSet.map((val: any, key: number) => {
                const { size, url } = val;
                const mediaString = `(max-width: ${size})`;
                return (
                  <source key={key} media={mediaString} srcSet={url}></source>
                );
              })}
              <img alt={this.props.alt} />
            </picture>
        );
    }
}

export default Image;

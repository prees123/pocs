import React from 'react';
import style from './HeroImage.module.scss';

interface Props {
    align?: 'center' | 'right' | '',
    children?: React.ReactNode,
    storyPanel?: React.ReactNode
}

const HeroImage: React.FC<Props> = props => {
  const getAlignClass = () => {
    switch (props.align) {
      case "right": {
        return style.right;
      }
      case "center": {
        return style.center;
      }
      default:
        return "";
    }
  };
  return (
    <div className={style.storyPanel}>
      <div className={`${style.storyPanelLayer} ${getAlignClass()}`}>
        {props.storyPanel}
      </div>
      {props.children}
    </div>
  );
};

HeroImage.defaultProps = {
  align: ''
};

export default HeroImage;
  
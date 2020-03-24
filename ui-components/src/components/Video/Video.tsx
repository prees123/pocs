import React from "react";
import style from "./Video.module.scss";
import ReactPlayer from 'react-player';

interface Props {
  src: string;
  shouldPlay: boolean,
  children?: React.ReactNode
}

const Video: React.SFC<Props> = props => {
  return (
    <div className={style.playerWrapper}>
      <ReactPlayer
        className={style.reactPlayer}
        url={props.src}
        playing={props.shouldPlay}
        width="100%"
        height="100%"
      />
      {props.children}
    </div>
  );
};

Video.defaultProps = {
  src: '',
  shouldPlay: false
}

export default Video;

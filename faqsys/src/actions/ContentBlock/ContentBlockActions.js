import {
  SET_CONTENT_BLOCK,
  SET_CONTENT_BLOCKS,
} from '../actionTypes'

export function setContentBlock (block) {
  return {type: SET_CONTENT_BLOCK, block}
}
export function setContentBlocks (contentBlocks) {
  return {type: SET_CONTENT_BLOCKS, contentBlocks}
}

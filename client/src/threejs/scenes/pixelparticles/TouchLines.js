import * as THREE from "three";

import {
  easeOutQuad,
  easeInOutQuad,
  easeOutSine,
  easeInOutSine
} from "./utils/easing.utils";

export default class TouchTexture {
  constructor(parent) {
    this.parent = parent;
  }

  update(delta) {}

  addTouch(point) {}

  drawTouch(point) {}
}

import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {AnimationProp} from "@fortawesome/angular-fontawesome";

export class ButtonModel {
  name!:string;
  disabled!:boolean;
  icon:IconProp;
  onClick?:Function;
  animationProp?:AnimationProp;


  constructor(name: string, disabled: boolean, icon?: IconProp, onClick?: Function, animationProp?: AnimationProp) {
    if(!icon) {
      icon = ['fas','add'];
    }
    this.name = name;
    this.disabled = disabled;
    this.icon = icon;
    this.onClick = onClick;
    this.animationProp = animationProp;
  }

  setAnimation(animation:AnimationProp) {
    this.animationProp= animation;
  }

  clearAnimation() {
    this.animationProp = undefined;
  }

  enable() {
    this.disabled = false;
  }

  disable() {
    this.disabled = true;
  }
}

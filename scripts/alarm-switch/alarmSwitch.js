import { createComponents } from "./createComponent.js";

import { draggingUp } from "./dragging.js";
import { draggingDown } from "./dragging.js";

import { arrayHoursComponents } from "./arrayHoursComponents.js";
import { arrayMinutesComponents } from "./arrayMinutesComponents.js";

export class AlarmSwitch {
  alarm = document.querySelector(".alarm");
  alarmSwitch = this.alarm.querySelector(".alarm__switch");

  alarmHoursBtnUp = this.alarmSwitch.querySelector(".hours-button__up");
  alarmHoursBtnDown = this.alarmSwitch.querySelector(".hours-button__down");
  alarmMinutesBtnUp = this.alarmSwitch.querySelector(".minutes-button__up");
  alarmMinutesBtnDown = this.alarmSwitch.querySelector(".minutes-button__down");

  hoursComponent = this.alarmSwitch.querySelector(".hours-component");
  minutesComponent = this.alarmSwitch.querySelector(".minutes-component");

  handler(event) {
    if (event.target === this.alarmHoursBtnUp) {
      this.draggingElementUp(event);
    } else if (event.target === this.alarmHoursBtnDown) {
      this.draggingElementDown(event);
    } else if (event.target === this.alarmMinutesBtnUp) {
      this.draggingElementUp(event);
    } else if (event.target === this.alarmMinutesBtnDown) {
      this.draggingElementDown(event);
    }
  }

  constructor() {
    this.alarmHoursBtnUp.addEventListener("click", this.handler.bind(this));
    this.alarmHoursBtnDown.addEventListener("click", this.handler.bind(this));
    this.alarmMinutesBtnUp.addEventListener("click", this.handler.bind(this));
    this.alarmMinutesBtnDown.addEventListener("click", this.handler.bind(this));

    this.renderComponents();
  }

  renderComponents() {
    this.hoursComponent.appendChild(createComponents(arrayHoursComponents));
    this.minutesComponent.appendChild(createComponents(arrayMinutesComponents));
  }

  draggingElementUp(event) {
    const parentElement = event.target.parentElement.parentElement;
    draggingUp(parentElement);
  }

  draggingElementDown(event) {
    const parentElement = event.target.parentElement.parentElement;
    draggingDown(parentElement);
  }
}

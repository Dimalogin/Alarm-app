import { renderCycle } from "./renderCycle.js";
import { formatTimeDuration } from "./formatTimeDuration.js";

export class AlarmView {
  activeAlarms;
  alarm = document.querySelector(".alarm");
  alarmDisplay = this.alarm.querySelector(".alarm__display");

  hoursComponent = this.alarm.querySelector(".hours-component");
  minutesComponent = this.alarm.querySelector(".minutes-component");

  alarmSound = new Audio("./audio/time-up.mp3");
  alarmSetBtn = this.alarm.querySelector(".alarm__set-button");
  activeAlarmsElement = this.alarm.querySelector(".alarm__active");

  initialHour = 0;
  initialMinute = 0;
  alarmIndex = 0;
  alarmsArray = [];

  constructor(activeAlarms) {
    this.activeAlarms = activeAlarms;

    this.alarmSetBtn.addEventListener(
      "click",
      this.createAlarmObject.bind(this)
    );
    renderCycle(() => {
      this.renderTime();
    });
  }

  renderTime() {
    const [h, m, s] = formatTimeDuration();

    this.alarmDisplay.innerHTML = `${String(h).padStart(2, "0")}:${String(
      m
    ).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

    this.alarmsArray.forEach((alarm, index) => {
      if (alarm.isActive) {
        if (`${alarm.alarmHour}:${alarm.alarmMinute}` === `${h}:${m}`) {
          this.alarmSound.play();
          this.alarmSound.loop = true;
        }
      }
    });
  }

  createAlarmObject() {
    const allHoursComponents =
      this.hoursComponent.querySelectorAll(".single-component");

    const allMinutesComponents =
      this.minutesComponent.querySelectorAll(".single-component");

    const switchHour = allHoursComponents[2].textContent;
    const switchMinutes = allMinutesComponents[2].textContent;

    this.alarmIndex += 1;

    let alarmObj = {};
    alarmObj.id = `${this.alarmIndex}_${switchHour}_${switchMinutes}`;
    alarmObj.alarmHour = switchHour;
    alarmObj.alarmMinute = switchMinutes;
    alarmObj.isActive = true;

    this.alarmsArray.push(alarmObj);

    this.createAlarm(alarmObj);
  }

  createAlarm(alarmObj) {
    const { id, alarmHour, alarmMinute } = alarmObj;

    let alarmDiv = document.createElement("div");
    alarmDiv.classList.add("alarm__item");
    alarmDiv.setAttribute("data-id", id);
    alarmDiv.innerHTML = `<span>${alarmHour}:${alarmMinute}</span>`;

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.setAttribute("checked", "");
    checkbox.checked = true;
    checkbox.addEventListener("click", (e) => {
      if (e.target.checked) {
        this.activeAlarms.startAlarm.call(this, e);
      } else {
        this.activeAlarms.stopAlarm.call(this, e);
      }
    });

    alarmDiv.appendChild(checkbox);

    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<i class="delete-icon delete-icon-edit"></i>`;
    deleteButton.classList.add("deleteButton");
    deleteButton.addEventListener("click", (e) => {
      this.activeAlarms.deleteAlarm.call(this, e);
    });
    alarmDiv.appendChild(deleteButton);

    this.activeAlarmsElement.appendChild(alarmDiv);
  }
}

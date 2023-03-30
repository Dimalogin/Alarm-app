import { AlarmSwitch } from "./scripts/alarm-switch/alarmSwitch.js";
import { AlarmView } from "./scripts/alarmView.js";
import { ActiveAlarms } from "./scripts/alarm-active/activeAlarms.js";

new AlarmView(new ActiveAlarms());
new AlarmSwitch();

export class ActiveAlarms {
  startAlarm(e) {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = this.activeAlarms.searchObject.apply(this, [
      "id",
      searchId,
    ]);

    if (exists) {
      this.alarmsArray[index].isActive = true;
    }
  }

  stopAlarm(e) {
    let searchId = e.target.parentElement.getAttribute("data-id");
    let [exists, obj, index] = this.activeAlarms.searchObject.apply(this, [
      "id",
      searchId,
    ]);

    if (exists) {
      this.alarmsArray[index].isActive = false;
      this.alarmSound.pause();
    }
  }

  deleteAlarm(e) {
    let searchId = e.target.parentElement.parentElement.getAttribute("data-id");
    let [exists, obj, index] = this.activeAlarms.searchObject.apply(this, [
      "id",
      searchId,
    ]);
    if (exists) {
      e.target.parentElement.parentElement.remove();
      this.alarmsArray.splice(index, 1);
      this.alarmSound.pause();
    }
  }

  searchObject(parameter, value) {
    let alarmObject,
      objIndex,
      exists = false;

    this.alarmsArray.forEach((alarm, index) => {
      if (alarm[parameter] === value) {
        exists = true;
        alarmObject = alarm;
        objIndex = index;
        return false;
      }
    });

    return [exists, alarmObject, objIndex];
  }
}

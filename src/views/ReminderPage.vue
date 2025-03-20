<template>
  <div class="reminder-container">
    <div class="reminder">
      <div class="reminder-form">
        <h4>Sunscreen Reminders</h4>
        <p>Please set up notifications to reapply sunscreen and stay protected:</p>
        <select v-model="selectedTime" class="time-dropdown">
          <option disabled value="">Select Time...</option>
          <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
        </select>
        <select v-model="selectedActivity" class="activity-dropdown">
          <option disabled value="">Select Activity...</option>
          <option v-for="activity in activityOptions" :key="activity" :value="activity">{{ activity }}</option>
        </select>
        <button @click="addReminder" class="set-button animate-button" :disabled="!selectedTime || !selectedActivity">
          Set
        </button>
      </div>
    </div>

    <div class="reminder-list">
      <h2>Reminders</h2>
      <transition-group name="fade" tag="div">
        <div
          v-for="reminder in reminders"
          :key="reminder.time + reminder.activity"
          class="reminder-item hover-effect"
        >
          <span class="reminder-icon">⏰</span>
          <span class="reminder-time">{{ reminder.time }} - {{ reminder.activity }}</span>
          <button @click="deleteReminder(reminder)" class="delete-button">X</button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTime: "",
      selectedActivity: "",
      reminders: [],
      timeOptions: this.generateTimeOptions(),
      activityOptions: [
        "Beach Day",
        "Hiking",
        "Swimming",
        "Outdoor Work",
        "Playing Sports",
        "Family Picnic",
        "Gardening",
      ],
    };
  },
  methods: {
    generateTimeOptions() {
      const times = [];
      for (let hour = 0; hour < 24; hour++) {
        const ampm = hour < 12 ? "am" : "pm";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        times.push(`${displayHour}:00 ${ampm}`);
      }
      return times;
    },
    addReminder() {
      if (this.selectedTime && this.selectedActivity) {
        const newReminder = {
          time: this.selectedTime,
          activity: this.selectedActivity,
        };
        if (!this.reminders.some((r) => r.time === newReminder.time && r.activity === newReminder.activity)) {
          this.reminders.push(newReminder);
          this.saveToLocalStorage();
          this.scheduleReminder(newReminder);
          this.selectedTime = "";
          this.selectedActivity = "";
        }
      }
    },
    deleteReminder(reminder) {
      this.reminders = this.reminders.filter(
        (r) => r.time !== reminder.time || r.activity !== reminder.activity
      );
      this.saveToLocalStorage();
    },
    scheduleReminder(reminder) {
      const [hour, minute, period] = reminder.time.match(/(\d+):(\d+)\s?(am|pm)/i).slice(1);
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(
        period.toLowerCase() === "pm" && hour !== "12" ? parseInt(hour) + 12 : parseInt(hour),
        parseInt(minute),
        0,
        0
      );

      if (targetTime <= now) {
        targetTime.setDate(targetTime.getDate() + 1);
      }

      const delay = targetTime - now;
      setTimeout(() => {
        alert(`It's ${reminder.time}! Time to reapply sunscreen for your ${reminder.activity}.`);
      }, delay);
    },
    saveToLocalStorage() {
      localStorage.setItem("reminders", JSON.stringify(this.reminders));
    },
    loadFromLocalStorage() {
      const storedReminders = localStorage.getItem("reminders");
      if (storedReminders) {
        this.reminders = JSON.parse(storedReminders);
        this.reminders.forEach((reminder) => this.scheduleReminder(reminder));
      }
    },
  },
  mounted() {
    this.loadFromLocalStorage();
  },
};
</script>

<style scoped>
.reminder-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  min-height: 80vh;
  background-color: #f0f8ff;
}

.reminder {
  background-color: #c3e6f2;
  padding: 50px;
  border-radius: 16px;
  max-width: 600px;
  width: 80%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 30px;
}

.reminder-form p {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
}

.time-dropdown,
.activity-dropdown {
  width: 90%;
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
}

.set-button {
  width: 50%;
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.set-button:hover {
  background-color: #0056b3;
}

.set-button:disabled {
  cursor: not-allowed;
  background-color: #f0f0f0;
  color: #aaa;
}

.animate-button:active {
  transform: scale(0.95);
}

.reminder-list {
  max-width: 600px;
  width: 80%;
  margin: 20px auto;
  text-align: left;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.reminder-list h2 {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.reminder-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 15px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.reminder-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
}

.reminder-icon {
  font-size: 20px;
  margin-right: 10px;
}

.reminder-time {
  font-size: 16px;
  color: #333;
  flex-grow: 1;
}

.delete-button {
  background-color: #ff4d4f;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #d9363e;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
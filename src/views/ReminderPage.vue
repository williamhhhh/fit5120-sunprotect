<template>
  <div>
    <div class="reminder">
      <div class="reminder-form">
        <p>Please select a time for your reminder:</p>
        <select v-model="selectedTime" class="time-dropdown">
          <option disabled value="">Time</option>
          <option v-for="time in timeOptions" :key="time" :value="time">{{ time }}</option>
        </select>
        <button @click="addReminder" class="set-button" :disabled="!selectedTime">Set</button>
      </div>
    </div>

    <div class="reminder-list">
      <h2>Reminders</h2>
      <div v-for="reminder in reminders" :key="reminder" class="reminder-item">
        <span class="reminder-icon">⏰</span>
        <span class="reminder-time">{{ reminder }}</span>
        <button @click="deleteReminder(reminder)" class="delete-button">X</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedTime: "",
      reminders: [],
      timeOptions: this.TimeOptions(),
    };
  },
  methods: {
    TimeOptions() {
      const times = [];
      for (let hour = 0; hour < 24; hour++) {
        const ampm = hour < 12 ? "am" : "pm";
        const displayHour = hour % 12 === 0 ? 12 : hour % 12;
        times.push(`${displayHour}:00 ${ampm}`);
      }
      return times;
    },
    addReminder() {
      if (this.selectedTime && !this.reminders.includes(this.selectedTime)) {
        this.reminders.push(this.selectedTime);
        this.LocalStorage();
        this.scheduleReminder(this.selectedTime);
        this.selectedTime = "";
      }
    },
    deleteReminder(reminder) {
      this.reminders = this.reminders.filter((r) => r !== reminder);
      this.LocalStorage();
    },

// -----------------------------------------------------

    scheduleReminder(time) {
      const [hour, minute, period] = time.match(/(\d+):(\d+)\s?(am|pm)/i).slice(1);
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
        alert(`It's ${time}! You need sun protection now!`);
      }, delay);
    },

// -----------------------------------------------------

    LocalStorage() {
      localStorage.setItem("reminders", JSON.stringify(this.reminders));
    },
    loadLocalStorage() {
      const storedReminders = localStorage.getItem("reminders");
      if (storedReminders) {
        this.reminders = JSON.parse(storedReminders);
        this.reminders.forEach((reminder) => this.scheduleReminder(reminder));
      }
    },
  },
  mounted() {
    this.loadLocalStorage();
  },
};
</script>

<style scoped>
.reminder {
  background-color: #c3e6f2;
  padding: 40px;
  border-radius: 16px;
  max-width: 400px;
  margin: 20px auto;
  text-align: center;
}

.reminder-form p {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.time-dropdown {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
}

.set-button {
  width: 25%; 
  padding: 10px;
  background-color: white;
  color: black;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.set-button:hover {
  background-color: #ccc;
}

.set-button:disabled {
  cursor: not-allowed;
  background-color: #f0f0f0;
  color: #aaa;
}


.reminder-list {
  max-width: 300px; 
  margin: 20px auto; 
  text-align: left; 
}

.reminder-list h2 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.reminder-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 10px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.reminder-icon {
  font-size: 18px;
  margin-right: 10px;
}

.reminder-time {
  font-size: 14px;
  color: #333;
  flex-grow: 1;
}

.delete-button {
  background-color: #ff4d4f; 
  color: white;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
}

.reminder-list h2 {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center; 
}

.delete-button:hover {
  background-color: #d9363e; 
}
</style>
"use strict";

Vue.createApp({
  data() {
    return {
      isTimerActive: false,
      selectedTimer: 0,
      time: 0,
      interval: null,
    };
  },
  methods: {
    startTimer(min) {
      this.selectedTimer = min;
      this.time = min * 60;
      this.isTimerActive = true;
      this.startIntervall();
    },
    startIntervall() {
      this.interval = setInterval(() => {
        this.time--;
        document.title = this.remainingTime;
        if (this.time === 0) {
          clearInterval(this.interval);
          this.interval = null;
          this.isTimerActive = false;
        }
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
      this.interval = null;
      this.isTimerActive = false;
      this.time = 0;
      document.title = "Timer stopped";
    },
    resetTimer() {
      this.stopTimer();
      this.startTimer(this.selectedTimer);
    },
    pauseOrContinueTimer() {
      if (!this.isTimerActive) {
        return;
      }

      if (!this.isTimerPaused) {
        this.startIntervall();
      } else {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
  },
  computed: {
    remainingTime() {
      let minutes = Math.floor(this.time / 60);
      if (minutes.toString().length === 1) {
        minutes = "0" + minutes;
      }

      let seconds = (this.time - minutes * 60).toString();

      if (seconds.length === 1) {
        seconds = "0" + seconds;
      }

      return minutes + ":" + seconds;
    },
    isTimerPaused() {
      return this.time > 0 && this.interval !== null;
    },
    labelPauseOrContinue() {
      if (this.time > 0 && this.interval !== null) {
        return "Pause";
      } else {
        return "Continue";
      }
    },
  },
}).mount("#app");

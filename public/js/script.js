let countdown;
let running = false;
let mute = false;
const $display = document.querySelector('.time-left');
const $end = document.querySelector('.end-time');
const $other = document.querySelector('.other-text');
const $input = document.querySelector('.input');
const $submit = document.querySelector('.submit');
const $buttons = document.querySelectorAll('[data-time]');
const $mute = document.getElementById('mute');

function timer(sec) {
  const now = Date.now();
  const then = now + sec * 1000;
  dispTimer(sec);
  dispEndTime(then, 'Timer');
  running = true;
  checkRunning();
  countdown = setInterval(() => {
    const secLeft = Math.round((then - Date.now()) / 1000);
    if (secLeft < 0) {
      clearInterval(countdown);
      running = false;
      checkRunning();
      if (mute === false) {
        const alarm = new Audio('media/springboard.mp3');
        alarm.play();
      }
      $other.textContent = 'Timer has reached 0:00 at:';
      setTimeout(function() {
        alert('Timer has reached 0:00');
      }, 1000);
      return;
    }
    dispTimer(secLeft);
  }, 1000);
}

function alarm(min) {
  const now = new Date();
  const then = new Date(now.getTime() + min * 60000);
  const disp = Math.round((then - Date.now()) / 1000);
  dispAlarm(disp);
  dispEndTime(then, 'Alarm');
  running = true;
  checkRunning();
  countdown = setInterval(() => {
    const secLeft = Math.round((then - Date.now()) / 1000);
    if (secLeft < 0) {
      clearInterval(countdown);
      running = false;
      checkRunning();
      if (mute === false) {
        const alarm = new Audio('media/springboard.mp3');
        alarm.play();
      }
      $other.textContent = 'Alarm Time has been reached at:';
      setTimeout(function() {
        alert('Alarm Time has been reached');
      }, 1000);
      return;
    }
    dispAlarm(secLeft);
  }, 1000);
}

function dispAlarm(sec) {
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  let disp;
  let rMin = min % 60;
  if (rMin < 10) {
    rMin = '0' + rMin;
  }
  let rSec = sec % 60;
  if (rSec < 10) {
    rSec = '0' + rSec;
  }
  if (hour > 0) {
    disp = hour + ':' + rMin + ':' + rSec;
  } else if (rMin > 0) {
    if (rMin < 10) {
      disp = rMin[1] + ':' + rSec;
    } else {
      disp = rMin + ':' + rSec;
    }
  } else {
    if (rSec < 10) {
      disp = rSec[1];
    } else {
      disp = rSec;
    }
  }
  document.title = 'Alarm: ' + disp;
  $display.textContent = disp;
}

function dispTimer(sec) {
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  let disp;
  let rMin = min % 60;
  if (rMin < 10) {
    rMin = '0' + rMin;
  }
  let rSec = sec % 60;
  if (rSec < 10) {
    rSec = '0' + rSec;
  }
  if (hour > 0) {
    disp = hour + ':' + rMin + ':' + rSec;
  } else if (rMin > 0) {
    if (rMin < 10) {
      disp = rMin[1] + ':' + rSec;
    } else {
      disp = rMin + ':' + rSec;
    }
  } else {
    if (rSec < 10) {
      disp = rSec[1];
    } else {
      disp = rSec;
    }
  }
  document.title = 'Timer: ' + disp;
  $display.textContent = disp;
}

function dispEndTime(end, name) {
  const endD = new Date(end);
  let hr = endD.getHours();
  let AmPm = 'am';
  if (hr >= 12) {
    hr -= 12;
    AmPm = 'pm';
  }
  let min = endD.getMinutes();
  if (min < 10) {
    min = parseInt(min);
    min = '0' + min;
  }
  if (hr == 0) {
    hr = 12;
  }
  $other.textContent = name + ' ends at:';
  $end.textContent = hr + ':' + min + ' ' + AmPm;
}

function dateDiff(now, end) {
  if (end - now < 0) {
    const addDate = now.getDate() + 1;
    end.setDate(addDate);
  }
  let diff = (end - now) / 1000;
  diff = Math.abs(Math.floor(diff));
  const dys = Math.floor(diff / (24 * 60 * 60));
  let scs = diff - dys * 24 * 60 * 60;
  const hrs = Math.floor(scs / (60 * 60));
  scs = scs - hrs * 60 * 60;
  const mns = Math.floor(scs / 60);
  scs = scs - mns * 60;
  return hrs * 60 + mns + scs / 60;
}

function buttonAdd() {
  const prev = $input.value;
  let input = this.dataset.time;
  let isAlarm = false;
  if (this.dataset.time[0] == '@') {
    isAlarm = true;
    input = input.substring(1);
  }
  let t = 0;
  let tt = '';
  if (prev[t] === ' ') {
    tt += prev[t];
    t++;
  }
  if (prev.substring(t) == '') {
    const temp = prev.substring(0, t);
    $input.value = temp + 0;
  }
  if (prev[t] === '@') {
    if (isAlarm === false) {
      $input.value = 0;
    }
  }
  if (isAlarm === true) {
    if (input[0] != '@') {
      input = '@' + input;
    }
    $input.value = input;
  } else {
    const t1 = parseInt($input.value.substring(t));
    const t2 = parseInt(input);
    const t3 = $input.value.substring(0, t);
    const time = t1 + t2;
    const newVal = t3 + time;
    $input.value = newVal;
  }
  $input.focus();
}

$('#input').keypress(function(event) {
  if (event.which == 13) {
    event.preventDefault();
    $('#submit').click();
  }
});

function checkRunning() {
  if (running === true) {
    $submit.textContent = 'Stop';
    $submit.classList.add('stop-button');
    $('#submit')
      .unbind('click')
      .click(function() {
        clearInterval(countdown);
        running = false;
        document.title = 'Alarm & Timer';
        $display.textContent = '';
        $end.textContent = '';
        $other.textContent = '';
        checkRunning();
      });
  } else {
    $submit.textContent = 'Start';
    $submit.classList.remove('stop-button');
    $('#submit')
      .unbind('click')
      .click(function() {
        prepClock();
      });
  }
}

function onMuteClick(e) {
  if (mute === true) {
    mute = false;
    $mute.classList.remove('mute-icon');
    $mute.classList.add('unmute-icon');
  } else {
    mute = true;
    $mute.classList.remove('unmute-icon');
    $mute.classList.add('mute-icon');
  }
}

const prepClock = e => {
  const input = $input.value;
  let mins;
  if (input.indexOf('@') >= 0) {
    let i = 0;
    if (input.indexOf('@') == 1) {
      i++;
    }
    let is12 = false;
    let addHr = 0;
    let hour;
    let min;
    if (input.charAt(i + 1) == '1' && input.charAt(i + 2) == '2') {
      is12 = true;
    }
    if (input.charAt(i + 1) == ' ') {
      if (input.charAt(i + 2) == '1' && input.charAt(i + 3) == '2') {
        is12 = true;
      }
    }
    if (input.indexOf('M') >= 0) {
      const t = input.indexOf('M');
      const AmPm = input.substring(t - 1, t + 1);
      if (AmPm == 'PM') {
        if (is12 == false) {
          addHr += 12;
        }
      }
      if (AmPm == 'AM') {
        if (is12 == true) {
          addHr -= 12;
        }
      }
    }
    if (input.indexOf('m') >= 0) {
      const t = input.indexOf('m');
      const AmPm = input.substring(t - 1, t + 1);
      if (AmPm == 'pm') {
        if (is12 == false) {
          addHr += 12;
        }
      }
      if (AmPm == 'am') {
        if (is12 == true) {
          addHr -= 12;
        }
      }
    }
    if (input.indexOf(':') >= 0) {
      const t = input.indexOf(':');
      const hr = input.substring(1, t);
      const mn = input.substring(t + 1, t + 3);
      hour = parseInt(hr);
      hour += addHr;
      min = parseInt(mn);
    } else {
      let addHr = 0;
      min = 0;
      if (input.charAt(i + 1) == ' ') {
        if (input.charAt(i + 2) == '1' && input.charAt(i + 3) == '1') {
          if (input.indexOf('M') >= 0) {
            const t = input.indexOf('M');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'PM') {
              addHr += 12;
            }
          }
          if (input.indexOf('m') >= 0) {
            const t = input.indexOf('m');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'pm') {
              addHr += 12;
            }
          }
        } else if (input.charAt(i + 2) == '1' && input.charAt(i + 3) == '2') {
          if (input.indexOf('M') >= 0) {
            const t = input.indexOf('M');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'AM') {
              addHr -= 12;
            }
          }
          if (input.indexOf('m') >= 0) {
            const t = input.indexOf('m');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'am') {
              addHr -= 12;
            }
          }
        } else if (input.charAt(i + 2) == '1') {
          if (input.indexOf('M') >= 0) {
            const t = input.indexOf('M');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'PM') {
              addHr += 12;
            }
          }
          if (input.indexOf('m') >= 0) {
            const t = input.indexOf('m');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'pm') {
              addHr += 12;
            }
          }
        } else {
          if (input.indexOf('M') >= 0) {
            const t = input.indexOf('M');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'PM') {
              addHr += 12;
            }
          }
          if (input.indexOf('m') >= 0) {
            const t = input.indexOf('m');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'pm') {
              addHr += 12;
            }
          }
        }
        const hr = input.substring(i + 2, i + 4);
        hour = parseInt(hr);
        hour += addHr;
      } else {
        if (input.charAt(i + 1) == '1' && input.charAt(i + 2) == '1') {
          if (input.indexOf('M') >= 0) {
            const t = input.indexOf('M');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'PM') {
              addHr += 12;
            }
          }
          if (input.indexOf('m') >= 0) {
            const t = input.indexOf('m');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'pm') {
              addHr += 12;
            }
          }
        } else if (input.charAt(i + 1) == '1' && input.charAt(i + 2) == '2') {
          if (input.indexOf('M') >= 0) {
            const t = input.indexOf('M');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'AM') {
              addHr -= 12;
            }
          }
          if (input.indexOf('m') >= 0) {
            const t = input.indexOf('m');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'am') {
              addHr -= 12;
            }
          }
        } else if (input.charAt(i + 1) == '1') {
          if (input.indexOf('M') >= 0) {
            const t = input.indexOf('M');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'PM') {
              addHr += 12;
            }
          }
          if (input.indexOf('m') >= 0) {
            const t = input.indexOf('m');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'pm') {
              addHr += 12;
            }
          }
        } else {
          if (input.indexOf('M') >= 0) {
            const t = input.indexOf('M');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'PM') {
              addHr += 12;
            }
          }
          if (input.indexOf('m') >= 0) {
            const t = input.indexOf('m');
            const AmPm = input.substring(t - 1, t + 1);
            if (AmPm == 'pm') {
              addHr += 12;
            }
          }
        }
        const hr = input.substring(i + 1, i + 3);
        hour = parseInt(hr);
        hour += addHr;
      }
    }
    let now = new Date();
    now = new Date(now + 60000);
    const year = now.getFullYear();
    const month = now.getMonth();
    let date = now.getDate();
    let end = new Date(year, month, date, hour, min);
    mins = dateDiff(now, end);
    alarm(mins);
  } else if (input.indexOf(':') >= 0) {
    const t = input.indexOf(':');
    const mn = input.substring(0, t);
    const sc = input.substring(t + 1, t + 3);
    const min = parseInt(mn);
    const sec = parseInt(sc);
    if (sec == 0) {
      alert('Error, invalid input. Please enter at least 1 second (0:01).');
      $input.focus();
      return false;
    }
    mins = min + sec / 60;
    timer(mins * 60);
  } else if (!isNaN(input)) {
    mins = input;
    if (mins == 0) {
      alert('Error, invalid input. Please enter at least 1 second (0:01).');
      $input.focus();
      return false;
    }
    timer(mins * 60);
  } else {
    alert(
      'Error, invalid input. Please enter @ before a time (#:##) to set an ' +
        'alarm or enter a time to set the countdown timer (#:## or # for minutes).'
    );
    $input.focus();
    return false;
  }
  $input.value = '';
};

function runResize() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
  window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });
}

runResize();
checkRunning();
$input.focus();
$mute.addEventListener('click', onMuteClick);
$buttons.forEach(button => button.addEventListener('click', buttonAdd));

$(function() {
  /*
  $(".container-div").hide().delay(500).slideToggle(1000);
  $(".display-time").hide().delay(500).slideToggle(1000);
  $(".display-other").hide().delay(500).slideToggle(1000);
  $(".mute-div").hide().delay(500).slideToggle(1000);
  $(".form-div").hide().delay(500).slideToggle(1000);
  $(".timer-presets").hide().delay(500).slideToggle(1000);
  $(".alarm-presets").hide().delay(500).slideToggle(1000);
  */
  $('.header').click(function() {
    $('.container-div').slideToggle(1000);
    $('.form-div').slideToggle(1000);
    $('.timer-presets').slideToggle(1000);
    $('.alarm-presets').slideToggle(1000);
    $('.display-time').slideToggle(1000);
    $('.display-other').slideToggle(1000);
    $('.mute-div').slideToggle(1000);
  });
});

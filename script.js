class Node {
    constructor(name, length, path) {
      this.musicNode = {
        name: name,
        length: length,
        path: path,
      };
      this.prev = null;
      this.next = null;
    }
  }

  class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this.length = 0;
      this.tempPos = null;
    }
  
    push(name, length, path) {
      const newNode = new Node(name, length, path);
  
      if (this.length === 0) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        this.tail.next = newNode;
        newNode.prev = this.tail;
        this.tail = newNode;
      }
  
      //circular linked list
      this.head.prev = this.tail;
      this.tail.next = this.head;
  
      this.length++;
    }
  
    setDefaultPointer() {
      this.tempPos = this.head;
    }
    traverse(direction) {
        if (this.length === 0) {
            return false; 
        }
    
        if (direction === 1) {
            this.tempPos = this.tempPos.next; 
        } else if (direction === -1) {
            this.tempPos = this.tempPos.prev;
        }
 
        if (!this.tempPos) {
            this.tempPos = (direction === 1) ? this.head : this.tail;
        }
    
        return true; 
    }
    
   
  }
  
  const dll = new DoublyLinkedList();
  dll.push(
    "Song 1",
    1,
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
  );
  dll.push(
    "Song 2",
    2,
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
  );
  dll.push(
    "Song 3",
    3,
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
  );
  dll.push(
    "Song 4",
    4,  
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
  );
  

  
  dll.setDefaultPointer();
  
  const musicTitle = document.querySelector(".music-info");
  const prevBtn = document.querySelector(".previousbtn");
  const nextBtn = document.querySelector(".nextbtn");
  const playPauseBtn = document.querySelector(".playpausebtn");
  let currentTime = document.querySelector(".current-time");
  let musicSlider = document.querySelector(".music-slider");
  let endTime = document.querySelector(".total-duration");
  let volumeSlider = document.querySelector(".volume-slider");
  let isPlaying = false;
  let musicObj = new Audio();
  
  musicObj.src =
    "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3";
  setInterval(updateMusicSlider, 500);
  
  
  playPauseBtn.addEventListener("click", () => {
    playpauseTrack();
  });

  
  nextBtn.addEventListener("click", () => {
    isPlaying = false;
    if (dll.traverse(1)) {
      const resultObj = dll.tempPos.musicNode;
      musicObj.src = resultObj.path;
      playpauseTrack();
      changeMusicTitle(resultObj.name);
    } 
  });
  
  prevBtn.addEventListener("click", () => {
    isPlaying = false;
    if (dll.traverse(-1)) {
      const resultObj = dll.tempPos.musicNode;
      musicObj.src = resultObj.path;
      playpauseTrack();
      changeMusicTitle(resultObj.name);
    }
  });
  
  
  volumeSlider.addEventListener("change", () => {
    musicObj.volume = volumeSlider.value / 100;
  });
  
  musicSlider.addEventListener("change", () => {
    changeMusicPos();
  });
  
  function playpauseTrack() {
    if (!isPlaying) playTrack();
    else pauseTrack();
  }
  
  function playTrack() {
    musicObj.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  }
  
  function pauseTrack() {
    musicObj.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
  

  function changeMusicTitle(name) {
    if (name !== undefined) {
      musicTitle.innerHTML = name;
    }
  }
  
  function resetMusicTimer() {
    currentTime.innerHTML = "00:00";
    endTime.innerHTML = "00:00";
    musicSlider.value = 0;
  }
  
  function updateMusicSlider() {
    let musicPos = 0;
    if (musicObj.duration !== musicObj.currentTime) {
      let instantTime = Math.ceil(musicObj.currentTime);
      let duration = Math.ceil(musicObj.duration);
      let durationMin = Math.floor(duration / 60);
      let durationSec = Math.floor(duration % 60);
  
      let currentMin = Math.floor(instantTime / 60);
      let currentSec = Math.floor(instantTime % 60);
  
      musicPos = (instantTime * 100) / duration;
  
      musicSlider.value = musicPos;
  
      if (currentSec < 10) {
        currentTime.innerHTML = `0${currentMin}:0${currentSec}`;
      } else {
        currentTime.innerHTML = `0${currentMin}:${currentSec}`;
      }
  
      if (durationSec !== NaN) {
        if (durationSec < 10) {
          endTime.innerHTML = `0${durationMin}:0${durationSec}`;
        } else {
          endTime.innerHTML = `0${durationMin}:${durationSec}`;
        }
      }
    } else {
      resetMusicTimer();
      pauseTrack();
    }
  }
  
  function changeMusicPos() {
    let changedSliderPos = musicSlider.value;
    let changedMusicPos = (changedSliderPos * musicObj.duration) / 100;
    musicObj.currentTime = changedMusicPos;
  }

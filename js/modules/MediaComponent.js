export default {
    props: ['type'],
    template: `
        <div :class="'media-con ' + bgCheck">
            <div class="media-title"><h2>{{titleCheck}}</h2><button :class="buttonCheck" @click="goBack"><i class="fas fa-arrow-circle-left"></i> Back</button></div>
            <div class="video-con" v-if="typeCheck">
                <video @canplay="mediaPlayer($event)">
                    <source :src="'video/' + videoCheck"></source>
                </video>
            </div>
            <div class="music-con" v-else>
                <audio @canplay="mediaPlayer($event)">
                    <source :src="'audio/' + audioCheck"></source>
                </audio>
            </div>
            <div class="controls">
                <div v-if="!this.playing">
                    <button v-on:click="play()" :class="'button ' + buttonCheck"><i class="fas fa-play fa-2x"></i></button>
                </div>
                <div v-else>
                    <button v-on:click="pause()" :class="'button ' + buttonCheck"><i class="fas fa-pause fa-2x"></i></button>
                </div>
                <button :class="'button ' + buttonCheck" v-on:click="back($el)"><i class="fas fa-backward fa-2x"></i></button>
                    <div class="progress">
                        <div :class="'progress-bar ' + bgCheck" :style="{width:durationInterval * duration + 'px'}"></div>
                    </div>
                <button :class="'button ' + buttonCheck" v-on:click="forward($el)"><i class="fas fa-forward fa-2x"></i></button>
                <button :class="'button ' + buttonCheck" id="time">{{this.minutes}}:{{this.time}}</button>
                <div class="volControl">
                    <button :class="'button ' + buttonCheck" v-on:click="volume"><i class="fas fa-volume-up fa-2x"></i></button>
                    <div v-if="chngvol">
                        <input v-model="this.vols" type="range" min="0" max="100" step="10" v-on:input="changeVol">
                    </div>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            media: "",
            chngvol: false,
            playing: false,
            intervalid: '',
            duration: 0,
            maxduration: 0,
            durationInterval: 0,
            vidsource: "",
            vols: "50",
            time: 0,
            minutes: 0
        }
    },
    created: function(){
        this.$root.profilepick = false;
        let media = this.$cookies.get('media');
        this.media = media;
    },
    methods: {
        goBack() {
            this.$root.profilepick = true;
            this.$router.back();
        },
        mediaPlayer(event){
            this.vidsource = event.target;
        },
        //volume show
        volume(){
            this.chngvol = !this.chngvol;
        },
        //change volume using computed funct
        changeVol(){
            let vol = vols / 100;
            this.vidsource.volume = vol;
            this.volumeChange = vols;
        },
        // progress bar funct using computer funct for dynamic rending
        // use of intervals to update every second
        progress(el){        
            if(el.playing){
                el.intervalid = setInterval(function(){
                    el.changes += 1;
                    el.timeChange += 1;
                    if(el.duration >= el.maxduration){
                        el.time = 0;
                        el.minutes = 0;
                        el.vidsource.currentTime = 0;
                        el.duration = 0;
                        el.vidsource.play();
                    }
                }, 1000);
            } else {
                clearInterval(el.intervalid);
            }
        },
        // play button function
        play(){
            this.playing = !this.playing;
            if(this.playing){
                this.maxduration = this.vidsource.duration;
                this.durationInterval = 200 / this.maxduration;
                this.progress(this);
                this.vidsource.play();
            }
        },
        //pause function 
        pause(){
            this.playing = !this.playing;
            this.progress(this);
            this.vidsource.pause();
        },
        back(el){
            let bar = el.lastChild.children[2].firstChild;
            bar.style.width -= this.durationInterval * this.duration + 'px';
            this.duration -= 5;
            this.vidsource.currentTime -= 5;
            this.timeChange -= 5;
            if(this.duration < 0){
                bar.style.width = 0 + 'px';
                this.duration = 0;
                this.vidsource.currentTime = 0;
                this.minutes = 0;
                this.time = 0;
            }
        },
        //forward function
        forward(el){
            let bar = el.lastChild.children[2].firstChild;
            if(this.duration < this.maxduration){
                bar.style.width += this.durationInterval * this.duration + 'px';
                this.duration += 5;
                this.vidsource.currentTime += 5;
                this.timeChange += 5;
            }
            if(this.duration > this.maxduration){
                this.duration = 0;
                bar.style.width = 0 + 'px';
                this.vidsource.currentTime = 0;
                this.minutes = 0;
                this.time = 0;
            }
        }
    },
    computed: {
        videoCheck: function() {
            if(this.media.video == false){
                // return palceholder video
                return "default.mp4";
            } else {
                // return video file if it actually existed
                return this.media.video_file;
            }
        },
        audioCheck: function() {
            if(this.media.audio == false){
                // return placeholder audio
                return "default.mp3";
            } else {
                // return audio file if it actually existed
                return this.media.audio_file;
            }
        },
        // title check computed function
        titleCheck: function() {
            if(this.media.title != null && this.media.video != false){
                // if movie title not null and video not false return title
                return this.media.title;
            } else if(this.media.name != null && this.media.video != false){
                // if tv name not null and video not false return name
                return this.media.name;
            } else if(this.media.album != null && this.media.audio !== false){
                // if album not null and audio not false return artist plus album
                return `${this.media.artist} ~ ${this.media.album}`;
            } else {
                // else return error message
                return "Sorry, this content is unavailable";
            }
        },
        // type check computed function
        typeCheck: function() {
            if(this.type == "movie" || this.type == "tv"){
                return true;
            } else {
                return false;
            }
        },
        bgCheck: function() {
            if(this.$root.permissions != false){
                return "main-media-bg";
            } else {
                return "kid-media-bg";
            }
        },
        buttonCheck: function() {
            if(this.$root.permissions != false){
                return "main-media-buttons";
            } else {
                return "kid-media-buttons";
            }
        },
        // changes computed: used in progress bar
        changes : {
            get : function(){
                return this.duration;
            },
            set : function(v){
                if(this.duration < 0){
                    this.duration = 0;
                } else if(this.duration >= this.maxduration){
                    this.duration = 0;
                } else {
                    this.duration = v;
                }
            }
        },
        //computed function for changes in volume
        volumeChange : {
            get: function() {
                return this.vols
            },
            set: function(v){
                this.vols = v;
            }
        },
        // computed funct for change in time
        timeChange : {
            get: function() {
                return this.time;
            }, 
            set: function(v) {
                if(v > 59){
                    this.minutes++;
                    this.time = 0;
                } else if(v <= 0){
                    this.minutes--;
                    this.time = v + 59;
                } else {
                    this.time = v;
                }
            }
        }
    }
}
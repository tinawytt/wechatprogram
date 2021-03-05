let RecordStatus = require("suit/audio/record_status").RecordStatus;
let msgType = require("../msgtype");
let WebIM = require("../../../utils/WebIM")["default"];
//var Chatroom=require('../../../pages/chatroom/chatroom.js');
let Disp = require("../../../utils/Dispatcher");

let msgStorage = new Disp();
let disp = require("../../../utils/broadcast");
Component({
	properties: {
		username: {
			type: Object,
			value: {}
		},
		chatType: {
			type: String,
			value: msgType.chatType.SINGLE_CHAT,
		},
	},
	data: {
    wholelist:[],
		recordStatus: RecordStatus.HIDE,
		RecordStatus,
		__comps__: {
			main: null,
			emoji: null,
			image: null,
			location: null,
			//video: null,
			ptopcall: null
		},
	},
	methods: {
		// 事件有长度限制：仅限 26 字符
		toggleRecordModal(){
			this.triggerEvent(
				"tapSendAudio",
				null,
				{
					bubbles: true,
					composed: true
				}
			);
		},

		onMakeVideoCall(){
	  		this.triggerEvent('makeVideoCall', 'single')
	  	},
    reTurn(){
      this.setData({

        isRuleTrue: false

      })
    },
    showRule(){
      this.setData({

        isRuleTrue: true

      });
      var wholelist=wx.getStorageSync("wholelist");
      console.log(wholelist);
      this.setData({
        wholelist:wholelist,
      });
     

    },
    send_dingdan(e){
      let me = this;
      console.log(e);
      var id=Number(e.currentTarget.id);
      var myName = wx.getStorageSync("myUsername");
     console.log("myname=",myName);
      var wholelist = wx.getStorageSync("wholelist");
      var object = wholelist[id];
      var dingdanid=object.id;
      var bossid=object.bossid;
      var toposi1=object.toposi1;
      var toposi2 = object.toposi2;
      var lastname=object.lastna;
      var userima=object.userima;
      var writeda=object.writeda;
      var finishnum=object.finishnum;
      var on_num=object.on_num;
      var price=object.price;
      var fromposi1=object.fromposi1;
      var fromposi2 = object.fromposi2;
      var transporttime=object.transporttime;
      var typetransport=object.type;
      var time = WebIM.time();
      function randomString(len, charSet) {
        charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var randomString = '';
        for (var i = 0; i < len; i++) {
          var randomPoz = Math.floor(Math.random() * charSet.length);
          randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
      };
      var suijichuan = randomString(10, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789');
      var renderableMsg={
        info:{from:myName,
        to:"18701076790"},
        username: "18701076790",
        yourname:myName,
        msg:{
          type:"dingdan",
          data:{
            bossid:bossid,
            toposi1:toposi1,
            toposi2:toposi2,
            price:price,
            fromposi1:fromposi1,
            fromposi2:fromposi2,
            lastna:lastname,
            finishnum:finishnum,
            transporttime:transporttime,
            type:typetransport,
            id:dingdanid,
            on_num:on_num,
            userima:userima,
            writeda:writeda
          }
        },
        style:"self",
        time:time,
        mid:"dingdanWEBIM_"+suijichuan,
        chatType:"singleChat"
      };
     
      var sessionKey ="rendered_18701076790"+wx.getStorageSync('myUsername');
	let chatMsg = wx.getStorageSync(sessionKey) || [];
      chatMsg.push(renderableMsg);
      console.log("ChatMsg=", chatMsg);
      save();
     
      function save() {
        
        wx.setStorage({
          key: sessionKey,
          data: chatMsg,
          success(){
            console.log("success");
          }
        })
      };
     
    },
	  	onMakeAudioCall(){
	  		this.triggerEvent('makeAudioCall', 'single')
		},

		// sendVideo(){
		// 	this.data.__comps__.video.sendVideo();
		// },

		openCamera(){
			this.data.__comps__.image.openCamera();
		},

		openEmoji(){
			this.data.__comps__.emoji.openEmoji();
		},

		cancelEmoji(){
			this.data.__comps__.emoji.cancelEmoji();
		},

		sendImage(){
			this.data.__comps__.image.sendImage();
		},

		sendLocation(){
			// this.data.__comps__.location.sendLocation();
		},

		emojiAction(evt){
			this.data.__comps__.main.emojiAction(evt.detail.msg);
		},

		callVideo(){
			console.log('this.data.__comps__.ptopcall', this.data.__comps__.ptopcall)
			this.data.__comps__.ptopcall.show()
		}
	},

	// lifetimes
	created(){},
	attached(){},
	moved(){},
	detached(){},
	ready(){
		this.setData({
			isIPX: getApp().globalData.isIPX
		})
		let comps = this.data.__comps__;
		comps.main = this.selectComponent("#chat-suit-main");
		comps.emoji = this.selectComponent("#chat-suit-emoji");
		comps.image = this.selectComponent("#chat-suit-image");
		comps.ptopcall = this.selectComponent("#chat-suit-ptopcall")
		// comps.location = this.selectComponent("#chat-suit-location");
		//comps.video = this.selectComponent("#chat-suit-video");
	}
});
